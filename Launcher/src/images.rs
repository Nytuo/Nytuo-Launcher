//! On-disk cache for remote images. GPUI ships no HTTP client of its own, so images are
//! downloaded in the background into the cache dir and then rendered from disk.

use crate::config;
use std::collections::HashSet;
use std::hash::{Hash, Hasher};
use std::path::PathBuf;
use std::sync::{Arc, Mutex};

#[derive(Clone)]
pub struct ImageCache {
    dir: PathBuf,
    in_flight: Arc<Mutex<HashSet<String>>>,
}

impl ImageCache {
    pub fn new() -> Self {
        let dir = config::cache_dir().join("images");
        let _ = std::fs::create_dir_all(&dir);
        Self { dir, in_flight: Arc::default() }
    }

    fn path_for(&self, url: &str) -> PathBuf {
        let mut h = std::collections::hash_map::DefaultHasher::new();
        url.hash(&mut h);
        let ext = url
            .split(['?', '#'])
            .next()
            .and_then(|u| u.rsplit('.').next())
            .filter(|e| matches!(e.to_lowercase().as_str(), "png" | "jpg" | "jpeg" | "webp" | "gif" | "svg"))
            .unwrap_or("img")
            .to_lowercase();
        self.dir.join(format!("{:016x}.{ext}", h.finish()))
    }

    /// The cached file, if it has been downloaded already.
    pub fn get(&self, url: &str) -> Option<PathBuf> {
        let p = self.path_for(url);
        p.exists().then_some(p)
    }

    /// Downloads every missing url on worker threads; `on_ready` fires after each one lands.
    pub fn prefetch<I>(&self, urls: I, on_ready: impl Fn() + Send + Sync + 'static)
    where
        I: IntoIterator<Item = String>,
    {
        let on_ready = Arc::new(on_ready);
        let todo: Vec<String> = urls
            .into_iter()
            .filter(|u| u.starts_with("http") && self.get(u).is_none())
            .filter(|u| self.in_flight.lock().unwrap().insert(u.clone()))
            .collect();
        if todo.is_empty() {
            return;
        }
        // A few workers pulling from a shared queue keeps the server happy.
        let queue = Arc::new(Mutex::new(todo));
        for _ in 0..4 {
            let (queue, this, on_ready) = (queue.clone(), self.clone(), on_ready.clone());
            std::thread::spawn(move || {
                loop {
                    let Some(url) = queue.lock().unwrap().pop() else { break };
                    let dest = this.path_for(&url);
                    let ok = ureq::get(&url)
                        .call()
                        .ok()
                        .and_then(|r| {
                            let tmp = dest.with_extension("part");
                            let mut f = std::fs::File::create(&tmp).ok()?;
                            std::io::copy(&mut r.into_reader(), &mut f).ok()?;
                            std::fs::rename(&tmp, &dest).ok()
                        })
                        .is_some();
                    this.in_flight.lock().unwrap().remove(&url);
                    if ok {
                        on_ready();
                    }
                }
            });
        }
    }
}
