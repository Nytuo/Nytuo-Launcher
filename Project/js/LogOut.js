/*
License (GNU GPL V3 you can find it on the internet or on the root of the source code (if you are on the compiled app : root/resources/app/)):
Copyright (C) 2021  Nytuo (Arnaud BEUX)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.*/

function LogOut() {
  if (process.platform == "linux" || process.platform == "darwin") {
    alert(
      "In order to complete the logout, please open a terminal and type the 2 following commands (press OK for see the next command):"
    );
    alert(
      "cd ~/snap/nytuo-launcher/x1/.config\n(press OK for see the next command)"
    );
    alert("rm -rf Nytuo-Launcher\n(press OK to finish)");

    /*const remote = require("electron").remote;
      const BrowserWindow = remote.BrowserWindow;
      const path = require("path");
      let win = new BrowserWindow({
        backgroundColor: 212121,
        minWidth: 500,
        minHeight: 720,
        width: 500,
        height: 720,
        icon: path.join(__dirname, "Resources/logoexp.png"),
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
        },
      });
      win.removeMenu();*/
    fs.writeFileSync(
      app.getPath("documents") + "/nytuolauncher_data/LoginSecu.txt",
      "false"
    );
    require("fs").rmdirSync(
      app.getPath("documents") + "/nytuolauncher_data/currentUser",
      { recursive: true }
    );
    require("fs").mkdirSync(
      app.getPath("documents") + "/nytuolauncher_data/currentUser"
    );    
    setTimeout(() => {
      app.exit();
    }, 5000);
    /*win.loadURL("https://launcher.nytuo.fr/connexion.html?out");*/
  } else {
    shell.openPath(__dirname + "/batch_sh_files/deleteCookies.bat");

    /*const remote = require("electron").remote;
      const BrowserWindow = remote.BrowserWindow;
      const path = require("path");
      let win = new BrowserWindow({
        backgroundColor: 212121,
        minWidth: 500,
        minHeight: 720,
        width: 500,
        height: 720,
        icon: path.join(__dirname, "Resources/favicon.ico"),
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
        },
      });*/
    fs.writeFileSync(
      parentfolder3 + "/nytuolauncher_data/LoginSecu.txt",
      "false"
    );

    require("fs").rmdirSync(parentfolder3 + "/nytuolauncher_data/currentUser", {
      recursive: true,
    });
    require("fs").mkdirSync(parentfolder3 + "/nytuolauncher_data/currentUser");    
    setTimeout(() => {
      app.exit();
    }, 5000);
    /*win.loadURL("https://launcher.nytuo.fr/connexion.html?out");*/
  } /*
    close();*/
}
