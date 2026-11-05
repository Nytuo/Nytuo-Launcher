<h1 align="center">
  <a href="https://github.com/Nytuo/Nytuo-Launcher">
    <img src="Launcher/public/images/LogoLauncher.png" alt="Logo" width="auto" height="80">
  </a>
</h1>

<div align="center">
  <h2>Nytuo Launcher</h2>
  A simple, open-source software to download, update, play, and manage Nytuo games.
  <br />
  <br />
  <a href="https://github.com/Nytuo/Nytuo-Launcher/issues/new?labels=bug">Report a Bug</a>
  ·
  <a href="https://github.com/Nytuo/Nytuo-Launcher/issues/new?labels=enhancement">Request a Feature</a>
  ·
  <a href="https://nytuo.fr/help">Get Help</a>
</div>

<div align="center">
<br />

[![Build/release](https://github.com/Nytuo/Nytuo-Launcher/actions/workflows/build.yml/badge.svg)](https://github.com/Nytuo/Nytuo-Launcher/actions/workflows/build.yml)
[![Project license](https://img.shields.io/github/license/Nytuo/Nytuo-Launcher.svg?style=flat-square)](LICENSE)

</div>

<details open="open">
  <summary>Table of Contents</summary>

- [About](#about)
  - [Key Features](#key-features)
- [Support](#support)
- [License](#license)
</details>

---

## About

The **Nytuo Launcher** is a dedicated platform for downloading, updating, playing, and deleting my games. It was designed with simplicity in mind and is fully open-source to ensure transparency for the community.

### Key Features

* **Centralized Library:** Manage all your Nytuo games in one place.
* **Open Source:** Full transparency regarding how the launcher interacts with your system.
* **Native & Fast:** Written entirely in Rust with [GPUI](https://www.gpui.rs/) — no WebView, no Electron.
* **Cross-Platform:** Windows, Linux and macOS.

## Building

```bash
cd Launcher
cargo run --release
```

Requires a recent Rust toolchain and CMake. On Windows the Windows SDK is also needed (GPUI compiles its shaders with `fxc`);
on Linux install `libxkbcommon-x11-dev libwayland-dev libvulkan-dev libfontconfig-dev libasound2-dev libx11-xcb-dev clang cmake`.
See [`Launcher/README.md`](Launcher/README.md) for architecture and details.

## Support

If you encounter issues or have ideas for enhancements:
* **Issues:** Open a ticket in the [GitHub Issues](https://github.com/Nytuo/Nytuo-Launcher/issues) section.
* **Guides:** Visit the [Page](https://www.nytuo.fr/software/launcher) for detailed documentation.

---

## License

This project is licensed under the **GNU General Public License v3**. See the `LICENSE` file for more information.
