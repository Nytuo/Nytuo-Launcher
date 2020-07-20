const { app, BrowserWindow, ipcMain, ipcRenderer, webContents, dialog, session } = require('electron')
const { download } = require('electron-dl')
const path = require('path')
var fs = require('fs')
var request = require('request')
var parentfolder1 = require('path').dirname(__dirname);
var parentfolder2 = require('path').dirname(parentfolder1);
var parentfolder3 = require('path').dirname(parentfolder2);
var portable = portable_check();

function portable_check() {
    if (fs.existsSync(__dirname + "/portable.txt")) {
        if (fs.readFileSync(__dirname + "/portable.txt") == "true") {
            return true;
        } else {
            return false;
        }
    }
}
//exit if platform not supported
if (process.platform !== "linux" && process.platform !== "win32") {
    app.exit();
}

//create the main window
function createWindow() {
    if (process.platform == "linux") {
        let win = new BrowserWindow({

            backgroundColor: 212121,
            minWidth: 1280,
            minHeight: 720,
            width: 1280,
            height: 720,
            icon: path.join(__dirname, 'Ressources/logoexp.png'),
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                enableRemoteModule: true
            },


        })
        //load the loading page
        win.loadFile('Loading.html');
    } else if (process.platform == "win32") {
        let win = new BrowserWindow({

            backgroundColor: 212121,
            minWidth: 1280,
            minHeight: 720,
            width: 1280,
            height: 720,
            icon: path.join(__dirname, 'Ressources/favicon.ico'),
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                enableRemoteModule: true
            },


        })
        //load the loading page
        win.loadFile('Loading.html');
    }




    if (portable == true) {
        console.log(app.getPath("documents"));
        //linux folder tree creation
        if (process.platform == "linux") {
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
        if (process.platform == "linux") {
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

    //detect or create the games folder location
    var gamelocation;
    if (portable == true) {
        fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", parentfolder3 + "/nytuolauncher_games");
        gamelocation = parentfolder3 + "/nytuolauncher_games";
    } else {
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
    }



    //detect internet conenction
    const dns = require("dns");


    dns.resolve("www.google.com", function (err, addr) {
        if (portable == true) {
            if (err) {
                if (process.platform == 'linux') {
                    fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/connected.txt', 'false');
                } else {
                    fs.writeFileSync(__dirname + '/connected.txt', 'false');
                }

            } else {
                if (process.platform == 'linux') {
                    fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/connected.txt', 'true');
                } else {
                    fs.writeFileSync(__dirname + '/connected.txt', 'true');
                }

            }
        } else {
            if (err) {
                if (process.platform == 'linux') {
                    fs.writeFileSync(app.getPath('documents') + '/nytuolauncher_data/connected.txt', 'false');
                } else {
                    fs.writeFileSync(__dirname + '/connected.txt', 'false');
                }

            } else {
                if (process.platform == 'linux') {
                    fs.writeFileSync(app.getPath('documents') + '/nytuolauncher_data/connected.txt', 'true');
                } else {
                    fs.writeFileSync(__dirname + '/connected.txt', 'true');
                }

            }
        }

    });
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
    if (portable == true) {
        if (process.platform == 'linux') {
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
        if (portable == true) {
            if (process.platform == 'linux') {
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
            if (process.platform == 'linux') {
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

    }





}
function ACH_SAVER(achpath) {
    //savegarde les achievements dans le nytuolauncher_data
    if (portable == true) {
        if (process.platform == "linux") {
            fs.copyFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt")
            fs.copyFileSync(gamelocation + "/Games/SNRE/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt")
            fs.copyFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt")
        } else {
            fs.copyFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt")
            fs.copyFileSync(gamelocation + "/Games/SNRE/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt")
            fs.copyFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt")
        }
    } else {
        if (process.platform == "linux") {
            fs.copyFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt")
            fs.copyFileSync(gamelocation + "/Games/SNRE/Achievements/AchDone.txt", app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt")
            fs.copyFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt")
        } else {
            fs.copyFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt")
            fs.copyFileSync(gamelocation + "/Games/SNRE/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt")
            fs.copyFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt")
        }
    }


}
//console the version
app.on('ready', createWindow, function () {
    ACH_SAVER();
    console.log(app.getVersion())

})
//the the launcher as default nytuo reference for browser
app.setAsDefaultProtocolClient('nytuo', process.execPath)
//correcly close the launcher
app.on('before-quit', () => { 
    ACH_SAVER();
    ipcRenderer.removeAllListeners('close'); });
