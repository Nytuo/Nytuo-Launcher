# Nytuo-Launcher

[![Build/release](https://github.com/Nytuo/Nytuo-Launcher/actions/workflows/build.yml/badge.svg)](https://github.com/Nytuo/Nytuo-Launcher/actions/workflows/build.yml)
[![Prettier](https://github.com/Nytuo/Nytuo-Launcher/actions/workflows/prettier.yml/badge.svg)](https://github.com/Nytuo/Nytuo-Launcher/actions/workflows/prettier.yml)
[![CodeQL](https://github.com/Nytuo/Nytuo-Launcher/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Nytuo/Nytuo-Launcher/actions/workflows/codeql-analysis.yml)

## Warning:
For the moment, the Nytuo-Launcher have a .deb and .appimage version for Linux but they are not ready for the moment, in fact, the updater is not set on those release. You can use it but you will not be able to download the update for your file version and will have the snap file.

## Introduction

The Nytuo Launcher is a software for download, update, play, delete my games with some features added each update.
It's free, you just have to create a Nytuo account on my website (https://nytuo.fr) or directly in the launcher.
I made it very simply for use (I think it is).
I made it open source because it's a small project and I want to be transparent with the people who play my games.

## License

The Nytuo Launcher is Licensed to GNU GPL v3 License, search for it on the internet or directly in the source code.

## Availability

The Nytuo Launcher is available for Windows and Linux and only in 64 bits. (No Mac version, but few games are compatible and all are available on Itch.io and gamejolt.com)
All the games may not be downloaded or played on Linux (cause I don't have build some games for it).

## Installation ?

The Nytuo Launcher is available for Windows and Linux:

### For Windows

- A .exe file for windows (it's a OneClick NSIS Installer (That is used for update as well),(installed as a user program in `Users\AppData\Local\Programs\Nytuo-Launcher`))
- A .zip file for windows to use it as a portable app (require to modify a file in the `resources\app\portable.txt` from `'false'` to `'true'` and vice-versa). You cannot use the .zip version if you have not set it portable.

### For Linux

- (Recommended) A .snap file, you have to install it manually, just follow the steps:
Download the .snap file, then open a terminal on the folder where the file is located or `cd` to it. And run the following command (where `<nytuo_launcher_file>` is the name of the file) :
```
snap install <nytuo_launcher_file> --dangerous --classic
```
For example :
```
snap install nytuo-launcher_2021.01.13_amd64.snap --dangerous --classic
```

- A .zip file with the same purpose of the windows version with the same requirement. In order to use it you must check set in the permission the case `allow execute this file as a program` of the `nytuo-launcher` file and open it.
- A .deb file, you have to open it and click on the 'install' button on the page that open (like a normal deb install).
- A .AppImage, in order to use it you must check set in the permission the case 'allow execute this file as a program' of the 'nytuo-launcher' file and open it.

## Update

### Windows

For windows, the update is automatically downloaded for the .exe version. The .zip one inform you but you have to download the new version yourself.

### Linux

For Linux, it's depend of the file you have downloaded the first time.
- If you have the .snap version, the update is downloaded automatically but you have to run some commands to update it (where `<nytuo_launcher_file>` is the name of the file and you are in the same folder of the file (downloaded in the 'Downloads' folder)):
```
snap remove nytuo-launcher
snap install <nytuo_launcher_file> --dangerous --classic
```

- If you have the .deb version the file will be downloaded in the `Downloads` folder and you have to launch it manually and install it.
- If you have the .appimage version, the file will be downloaded in the `Downloads` folder and you have to delete the other .appimage and replace it with the newly downloaded one.
- If you have the .zip version just inform you that an update is available but not download it for you.

## LogOut

### Windows

For windows, a Batch file (CMD) will appears and clean all cookies and StoredCache/data automatically after the NytuoLauncher is closed.
If this not work try uninstall the Launcher, restart and delete the nytuo-launcher in the AppData Folder in Users one. 

### Linux

For Linux, it is a little more complicated:
- For the .snap version you will be prompted to open a terminal and type the 2 following commands in the right order after the Launcher close off:
```
cd ~/snap/nytuo-launcher/x1/.config
rm -rf Nytuo-Launcher
```

- For the .deb / .appimage / .zip version, you have to delete the `Nytuo-Launcher` folder under `Home/.config/`.
With that done, normally the cookies, storageCache/Data will be cleaned. Note that if you uninstall the Nytuo-Launcher of your system, cookies are automatically deleted.

## Problems, issues, feedback, help, guides, more

If you encounter a problem please tell me in the issues section of GitHub.
I publish new updates frequently like for example bugs correction, new features and new look.
Please refers to https://www.nytuo.fr/help for informations, guides and more.

## Got an idea of something could be added or enhanced ?

If you have an idea of something I could add to my launcher, well tell me by opening an issues and I will think about add it to the Launcher.

## Note

I upload the code after the release of the Launcher so, the source code in the "release" section is not the correct code for the version.You can view the changes in the commit section.
