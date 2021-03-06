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

var connectedtointernet = connectest();

function connectest() {
    if (portable == true) {
        if (process.platform == "linux" || process.platform == "darwin") {
            return CryptoJS.enc.Latin1.stringify(CryptoJS.AES.decrypt(fs.readFileSync(parentfolder3 + "/nytuolauncher_data/connected.txt").toString(), "connection system"))
        } else {
            return CryptoJS.enc.Latin1.stringify(CryptoJS.AES.decrypt(fs.readFileSync(__dirname + "/connected.txt").toString(), "connection system"))
        }
    } else {
        if (process.platform == "linux" || process.platform == "darwin") {
            return CryptoJS.enc.Latin1.stringify(CryptoJS.AES.decrypt(fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/connected.txt").toString(), "connection system"))
        } else {
            return CryptoJS.enc.Latin1.stringify(CryptoJS.AES.decrypt(fs.readFileSync(__dirname + "/connected.txt").toString(), "connection system"))

        }
    }


}

function LogOut() {
    if (connectedtointernet == 'true') {
        if (process.platform == 'linux' || process.platform == "darwin") {
            const remote = require('electron').remote;
            const BrowserWindow = remote.BrowserWindow;
            const path = require('path');
            let win = new BrowserWindow({

                backgroundColor: 212121,
                minWidth: 500,
                minHeight: 720,
                width: 500,
                height: 720,
                frame: false,
                icon: path.join(__dirname, 'Resources/logoexp.png'),
                webPreferences: {
                    webSecurity: false,
                    nodeIntegration: true,
                    enableRemoteModule: true
                },


            })
            win.removeMenu();
            win.loadURL("https://launcher.nytuo.yo.fr/logout.php")


        } else {
            const remote = require('electron').remote;
            const BrowserWindow = remote.BrowserWindow;
            const path = require('path');
            let win = new BrowserWindow({

                backgroundColor: 212121,
                minWidth: 500,
                minHeight: 720,
                width: 500,
                height: 720,
                frame: false,
                icon: path.join(__dirname, 'Resources/favicon.ico'),
                webPreferences: {
                    webSecurity: false,
                    nodeIntegration: true,
                    enableRemoteModule: true
                },


            })
            win.loadURL("https://launcher.nytuo.yo.fr/logout.php")

        }
        close()
    }
}