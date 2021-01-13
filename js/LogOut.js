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