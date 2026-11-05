//! Embeds the Windows icon + version info so the exe, the taskbar and Alt-Tab show
//! "Nytuo Launcher" with the logo instead of the cargo binary name.

fn main() {
    #[cfg(windows)]
    {
        let mut res = winresource::WindowsResource::new();
        res.set_icon("assets/icon.ico");
        res.set("ProductName", "Nytuo Launcher");
        res.set("FileDescription", "Nytuo Launcher");
        res.set("CompanyName", "Nytuo");
        res.set("OriginalFilename", "nytuo-launcher.exe");
        if let Err(e) = res.compile() {
            println!("cargo:warning=could not embed the Windows icon: {e}");
        }
    }
    println!("cargo:rerun-if-changed=assets/icon.ico");
    println!("cargo:rerun-if-changed=build.rs");
}
