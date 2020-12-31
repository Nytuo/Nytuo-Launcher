const { app, BrowserWindow, ipcMain, ipcRenderer, webContents, dialog, session, Menu } = require('electron')
const path = require('path')
var fs = require('fs')
var request = require('request')
var parentfolder1 = require('path').dirname(__dirname);
var parentfolder2 = require('path').dirname(parentfolder1);
var parentfolder3 = require('path').dirname(parentfolder2);
var portable = portable_check();
const currentLanguage = language()

var gamelocation = gameloc();

function portable_check() {
    if (fs.existsSync(__dirname + "/portable.txt")) {
        if (fs.readFileSync(__dirname + "/portable.txt") == "true") {
            return true;
        } else {
            return false;
        }
    }
}
function language() {
    if (portable == true) {
        if (process.platform == 'linux') {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt")) {

                LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()

                if (fs.existsSync(__dirname + '/Languages') == true) {

                    if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {

                        let t = require('fs').readFileSync(__dirname + "/Languages/LID_" + LID + ".txt", 'utf-8').split('\n');
                        let t1 = Array.from(new Set(t));
                        return t1
                    }
                    else {
                        return [];
                    }
                }
                else {
                    return []
                }
            }
            else {
                return []
            }

        }
        else if (process.platform == 'win32') {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt")) {

                LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()

                if (fs.existsSync(__dirname + '/Languages') == true) {

                    if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {

                        let t = require('fs').readFileSync(__dirname + "/Languages/LID_" + LID + ".txt", 'utf-8').split('\n');
                        let t1 = Array.from(new Set(t));
                        return t1
                    }
                    else {
                        return [];
                    }
                }
                else {
                    return []
                }
            }
            else {
                return []
            }
        }
    } else {
        if (process.platform == 'linux') {
            if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/LID.txt")) {

                LID = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/LID.txt").toString()

                if (fs.existsSync(__dirname + '/Languages') == true) {

                    if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {

                        let t = require('fs').readFileSync(__dirname + "/Languages/LID_" + LID + ".txt", 'utf-8').split('\n');
                        let t1 = Array.from(new Set(t));
                        return t1
                    }
                    else {
                        return [];
                    }
                }
                else {
                    return []
                }
            }
            else {
                return []
            }
        }
        else if (process.platform == 'win32') {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt")) {

                LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()

                if (fs.existsSync(__dirname + '/Languages') == true) {

                    if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {

                        let t = require('fs').readFileSync(__dirname + "/Languages/LID_" + LID + ".txt", 'utf-8').split('\n');
                        let t1 = Array.from(new Set(t));
                        return t1
                    }
                    else {
                        return [];
                    }
                }
                else {
                    return []
                }
            }
            else {
                return []
            }
        }
    }


}
function gameloc() {
    if (portable == true) {
        if (process.platform == "linux") {

            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") != "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    return parentfolder3;

                }

            } else {
                return parentfolder3;
            }
        } else {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") != "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    return parentfolder3;

                }

            } else {
                return parentfolder3;
            }
        }
    } else {
        if (process.platform == "linux") {

            if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") != "") {
                    return fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    return app.getPath("documents");

                }

            } else {
                return app.getPath("documents");
            }
        }
        else {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") != "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    return parentfolder3;

                }

            } else {
                return parentfolder3;
            }
        }
    }


}
//exit if platform not supported
if (process.platform !== "linux" && process.platform !== "win32") {
    app.exit();
}
//the the launcher as default nytuo reference for browser
app.setAsDefaultProtocolClient('nytuo', process.execPath)

if (portable == true) {
    console.log(app.getPath("documents"));
    //linux folder tree creation
    if (process.platform == "linux" || process.platform == 'darwin') {
        if (fs.existsSync(parentfolder3 + "/nytuolauncher_data") === false) {
            fs.mkdirSync(parentfolder3 + "/nytuolauncher_data");
        }
    }
    //windows folder creation
    else {
        if (fs.existsSync(parentfolder3 + "/nytuolauncher_data") === false) {
            fs.mkdirSync(parentfolder3 + "/nytuolauncher_data");
        }
    }
} else {
    console.log(app.getPath("documents"));
    //linux folder tree creation
    if (process.platform == "linux" || process.platform == 'darwin') {
        if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data") === false) {
            fs.mkdirSync(app.getPath("documents") + "/nytuolauncher_data");
        }
    }
    //windows folder creation
    else {
        if (fs.existsSync(parentfolder3 + "/nytuolauncher_data") === false) {
            fs.mkdirSync(parentfolder3 + "/nytuolauncher_data");
        }
    }
}
//create games folder tree
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
if (!fs.existsSync(gamelocation + '/Games/SFO')) fs.mkdirSync(gamelocation + '/Games/SFO', { recursive: true });
if (portable == true) {
    if (process.platform == 'linux' || process.platform == 'darwin') {
        //create linux beta files
        if (!fs.existsSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles')) fs.mkdirSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles', { recursive: true });
        if (!fs.existsSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt')) {
            fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
        }

    }
    //create windows beta files
    else {
        if (!fs.existsSync(__dirname + '/VersionsFiles')) fs.mkdirSync(__dirname + '/VersionsFiles', { recursive: true });
        if (!fs.existsSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt')) {
            fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
        }

    }
} else {
    if (process.platform == 'linux' || process.platform == 'darwin') {
        //create linux beta files
        if (!fs.existsSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles')) fs.mkdirSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles', { recursive: true });
        if (!fs.existsSync(app.getPath("documents") + '/nytuolauncher_data/BetaAccess.txt')) {
            fs.writeFileSync(app.getPath("documents") + '/nytuolauncher_data/BetaAccess.txt', 'False');
        }

    }
    //create windows beta files
    else {
        if (!fs.existsSync(__dirname + '/VersionsFiles')) fs.mkdirSync(__dirname + '/VersionsFiles', { recursive: true });
        if (!fs.existsSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt')) {
            fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
        }

    }


}

//detect internet conenction
const dns = require("dns");


dns.resolve("www.google.com", function (err, addr) {
    if (portable == true) {
        if (err) {
            if (process.platform == 'linux' || process.platform == 'darwin') {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/connected.txt', 'false');
            } else {
                fs.writeFileSync(__dirname + '/connected.txt', 'false');
            }


        } else {
            if (process.platform == 'linux' || process.platform == 'darwin') {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/connected.txt', 'true');
            } else {
                fs.writeFileSync(__dirname + '/connected.txt', 'true');
            }

        }
    } else {
        if (err) {
            if (process.platform == 'linux' || process.platform == 'darwin') {
                fs.writeFileSync(app.getPath('documents') + '/nytuolauncher_data/connected.txt', 'false');
            } else {
                fs.writeFileSync(__dirname + '/connected.txt', 'false');
            }

        } else {
            if (process.platform == 'linux' || process.platform == 'darwin') {
                fs.writeFileSync(app.getPath('documents') + '/nytuolauncher_data/connected.txt', 'true');
            } else {
                fs.writeFileSync(__dirname + '/connected.txt', 'true');
            }

        }
    }

});
//create the main window
function createWindow() {
    if (process.platform == "linux" || process.platform == 'darwin') {
        let win = new BrowserWindow({

            backgroundColor: 212121,
            resizable: false,
            alwaysOnTop: false,
            frame: false,
            width: 520,
            height: 280,

            icon: path.join(__dirname, 'Ressources/logoexp.png'),
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                enableRemoteModule: true
            },


        })
        var linkbrowser = process.argv[1];

        if (linkbrowser != null) {

            if (linkbrowser == "nytuo://launchid/sgb") {
                win.loadURL(__dirname + '/Loading.html?sgb')
            } else if (linkbrowser == "nytuo://launchid/laatim") {
                win.loadURL(__dirname + '/Loading.html?laatim')
            } else if (linkbrowser == "nytuo://launchid/sf") {
                win.loadURL(__dirname + '/Loading.html?sf')
            } else if (linkbrowser == "nytuo://launchid/la") {
                win.loadURL(__dirname + '/Loading.html?la')
            } else if (linkbrowser == "nytuo://launchid/vitf") {
                win.loadURL(__dirname + '/Loading.html?vitf')
            } else if (linkbrowser == "nytuo://launchid/ttd") {
                win.loadURL(__dirname + '/Loading.html?ttd')
            } else if (linkbrowser == "nytuo://launchid/fwd") {
                win.loadURL(__dirname + '/Loading.html?fwd')
            } else if (linkbrowser == "nytuo://launchid/tb") {
                win.loadURL(__dirname + '/Loading.html?tb')
            } else if (linkbrowser == "nytuo://launchid/wr") {
                win.loadURL(__dirname + '/Loading.html?wr')
            } else if (linkbrowser == "nytuo://launchid/sn") {
                win.loadURL(__dirname + '/Loading.html?sn')
            } else if (linkbrowser == "nytuo://launchid/sfo") {
                win.loadURL(__dirname + '/Loading.html?sfo')
            } else if (linkbrowser == "nytuo://launchid/ae") {
                win.loadURL(__dirname + '/Loading.html?ae')
            } else {
                win.loadFile('Loading.html');
            }


        } else {
            win.loadFile('Loading.html');
        }
    } else if (process.platform == "win32") {
        let win = new BrowserWindow({

            backgroundColor: 212121,
            resizable: false,
            alwaysOnTop: false,
            frame: false,
            width: 520,
            height: 280,
            icon: path.join(__dirname, 'Ressources/favicon.ico'),
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                enableRemoteModule: true
            },


        })
        var linkbrowser = process.argv[1];

        if (linkbrowser != null) {
            if (linkbrowser == "nytuo://launchid/sgb") {
                win.loadURL(__dirname + '/Loading.html?sgb')
            } else if (linkbrowser == "nytuo://launchid/laatim") {
                win.loadURL(__dirname + '/Loading.html?laatim')
            } else if (linkbrowser == "nytuo://launchid/sf") {
                win.loadURL(__dirname + '/Loading.html?sf')
            } else if (linkbrowser == "nytuo://launchid/la") {
                win.loadURL(__dirname + '/Loading.html?la')
            } else if (linkbrowser == "nytuo://launchid/vitf") {
                win.loadURL(__dirname + '/Loading.html?vitf')
            } else if (linkbrowser == "nytuo://launchid/ttd") {
                win.loadURL(__dirname + '/Loading.html?ttd')
            } else if (linkbrowser == "nytuo://launchid/fwd") {
                win.loadURL(__dirname + '/Loading.html?fwd')
            } else if (linkbrowser == "nytuo://launchid/tb") {
                win.loadURL(__dirname + '/Loading.html?tb')
            } else if (linkbrowser == "nytuo://launchid/wr") {
                win.loadURL(__dirname + '/Loading.html?wr')
            } else if (linkbrowser == "nytuo://launchid/sn") {
                win.loadURL(__dirname + '/Loading.html?sn')
            } else if (linkbrowser == "nytuo://launchid/sfo") {
                win.loadURL(__dirname + '/Loading.html?sfo')
            } else if (linkbrowser == "nytuo://launchid/ae") {
                win.loadURL(__dirname + '/Loading.html?ae')
            } else {
                win.loadFile('Loading.html');
            }


        } else {
            win.loadFile('Loading.html');

        }

    }
}


//console the version and save the achievements
app.on('ready', createWindow, function () {
    ACH_SAVER();
    console.log(app.getVersion())

})

//correcly close the launcher
app.on('before-quit', () => {
    if (portable == true) {
        if (process.platform == 'linux') {
            fs.unlinkSync(parentfolder3 + "/nytuolauncher_data/LID_ONLINE.txt")

        } else if (process.platform == 'win32') {
            fs.unlinkSync(parentfolder3 + "/nytuolauncher_data/LID_ONLINE.txt")

        }
    } else {
        if (process.platform == 'linux') {
            fs.unlinkSync(app.getPath("documents") + "/nytuolauncher_data/LID_ONLINE.txt")

        } else if (process.platform == 'win32') {
            fs.unlinkSync(parentfolder3 + "/nytuolauncher_data/LID_ONLINE.txt")

        }
    }

    ACH_SAVER();
    ipcRenderer.removeAllListeners('close');

});