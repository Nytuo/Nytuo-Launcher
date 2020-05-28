const { app, BrowserWindow, ipcMain, ipcRenderer, webContents, dialog, session } = require('electron')
const { download } = require('electron-dl')
const path = require('path')
var fs = require('fs')
var request = require('request')
var parentfolder1 = require('path').dirname(__dirname);
var parentfolder2 = require('path').dirname(parentfolder1);
var parentfolder3 = require('path').dirname(parentfolder2);


if (process.platform !== "linux" && process.platform !== "win32") {
    app.exit();
}


function createWindow() {
    let win = new BrowserWindow({

        backgroundColor: 212121,
        minWidth: 1280,
        minHeight: 720,
        width: 1280,
        height: 720,
        icon: path.join(__dirname, 'Ressources/logoexp.png'),
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true
        },

    })
    win.loadFile('Loading.html');
    

    console.log(app.getPath("documents"));
    if (process.platform == "linux") {
        if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data") === false) {
            fs.mkdirSync(app.getPath("documents") + "/nytuolauncher_data");
        }
    } else {
        if (fs.existsSync(parentfolder3 + "/nytuolauncher_data") === false) {
            fs.mkdirSync(parentfolder3 + "/nytuolauncher_data");
        }
    }

    var gamelocation;
    if (process.platform == "linux") {
        if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
            if (fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt").length == 0) {
                let folder = dialog.showOpenDialogSync({

                    properties: ["openDirectory"]

                });

                fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt", folder);
                gamelocation = folder;
            } else {
                gamelocation = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt");
            }
        } else {
            let folder = dialog.showOpenDialogSync({

                properties: ["openDirectory"]

            });

            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt", folder);
            gamelocation = folder;
        }
    } else {
        if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
            if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt").length == 0) {
                let folder = dialog.showOpenDialogSync({

                    properties: ["openDirectory"]

                });

                fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", folder);
                gamelocation = folder;
            } else {
                gamelocation = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
            }
        } else {
            let folder = dialog.showOpenDialogSync({

                properties: ["openDirectory"]

            });

            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", folder);
            gamelocation = folder;
        }
    }



    const dns = require("dns");


    dns.resolve("www.google.com", function (err, addr) {
        if (err) {
            if (process.platform == 'linux'){
                fs.writeFileSync(app.getPath('documents') + '/nytuolauncher_data/connected.txt', 'false');
            }else{
                fs.writeFileSync(__dirname + '/connected.txt', 'false');
            }
            
        } else {
            if (process.platform == 'linux'){
                fs.writeFileSync(app.getPath('documents') + '/nytuolauncher_data/connected.txt', 'true');
            }else{
                fs.writeFileSync(__dirname + '/connected.txt', 'true');
            }
            
        }
    });
    if (!fs.existsSync(gamelocation + '/Games')) fs.mkdirSync(gamelocation + '/Games', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/AE')) fs.mkdirSync(gamelocation + '/Games/AE', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/SNRE')) fs.mkdirSync(gamelocation + '/Games/SNRE', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/LAATIM')) fs.mkdirSync(gamelocation + '/Games/LAATIM', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/LA')) fs.mkdirSync(gamelocation + '/Games/LA', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/SGB')) fs.mkdirSync(gamelocation + '/Games/SGB', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/SF')) fs.mkdirSync(gamelocation + '/Games/SF', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/TTD')) fs.mkdirSync(gamelocation + '/Games/TTD', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/TB')) fs.mkdirSync(gamelocation + '/Games/TB', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/FWD')) fs.mkdirSync(gamelocation + '/Games/FWD', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/VITF')) fs.mkdirSync(gamelocation + '/Games/VITF', { recursive: true });
    if (!fs.existsSync(gamelocation + '/Games/WR')) fs.mkdirSync(gamelocation + '/Games/WR', { recursive: true });
    if (process.platform == 'linux') {

        if (!fs.existsSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles')) fs.mkdirSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles', { recursive: true });
        if (!fs.existsSync(app.getPath("documents") + '/nytuolauncher_data/BetaAccess.txt')) {
            fs.writeFileSync(app.getPath("documents") + '/nytuolauncher_data/BetaAccess.txt', 'False');
        }
    } else {
        if (!fs.existsSync(__dirname + '/VersionsFiles')) fs.mkdirSync(__dirname + '/VersionsFiles', { recursive: true });
        if (!fs.existsSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt')) {
            fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
        }
    }




}

app.on('ready', createWindow, function () {
    console.log(app.getVersion())

})

app.setAsDefaultProtocolClient('nytuo', process.execPath)

app.on('before-quit', () => { ipcRenderer.removeAllListeners('close'); });
