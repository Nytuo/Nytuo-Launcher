# Nytuo-Launcher

## Introduction
 
The Nytuo Launcher is a software for download, update, play, delete my games with some features added each update.
It's free, you just have to create a Nytuo account on my website (https://nytuo.yo.fr) or directly in the launcher.
I made it very simply for use (I think it is).
I made it open source because it's a small project and I want to be transparent with the people who play my games.

## License
The Nytuo Launcher is Licensed to GNU GPL v3 License, search for it on the internet or directly in the source code.

## Availability
The Nytuo Launcher is available for Windows and Linux and only in 64 bits. (No Mac version, but few games are compatible and all are available on Itch.io and gamejolt.com) 
All the games may not be downloaded or played on Linux (cause I don't have build some games for it).

## Which file ?
The Nytuo Launcher can be found as:
### For Windows
- A .exe file for windows (it's a OneClick NSIS Installer (That is used for update as well),(installed as a user program in ```Users\AppData\Local\Programs\Nytuo-Launcher``` (That's mean no UAC (Admin Rights))))
- A .zip file for windows to use it as a portable app (require to modify a file in the ```resources\app\portable.txt``` from ```'false'``` to ```'true'``` and vice-versa)
### For Linux
- You can find the Nytuo Launcher on the SnapStore directly in the app. Or you can do it by using this command on the terminal :
```
snap install nytuo-launcher
```
- A .snap file, It's the SnapStore file you can install it manually, just follow the steps:

Download the .snap file, then open a terminal on the folder where the file is or ```cd``` to it. And run the following command (where ```<nytuo_launcher_file>``` is modified by the name of the file) :

```
snap install <nytuo_launcher_file> --dangerous
```

For example :
```
snap install nytuo-launcher_2021.01.13_amd64.snap --dangerous
```
- A .zip file with the same purpose of the windows version with the same requirement.

## Problems, issues, feedback, help, guides, more
If you encounter a problem please tell me in the issues section of GitHub.
I publish new updates frequently like for example bugs correction, new features and new look.
Please refers to https://nytuo.yo.fr/aide.html for informations, guides and more.

## Note 
I upload the code after the release of the Launcher so, the source code in the "release" section is not the correct code for the version.You can view the changes in the commit section.
