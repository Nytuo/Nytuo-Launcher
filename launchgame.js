//Variables et constantes
const { shell, webContents, dialog } = require('electron');
const { ipcRenderer } = require('electron');
const rimraf = require("rimraf");
const extract = require('extract-zip');
var request = require('request');
var fs = require('fs');
const os = require('os');
var homedir = os.homedir();
const app = require('electron').remote.app;
const ws = require('windows-shortcuts');
var updatedownloaded = false;
const path = require('path');
var isInUpdate = false;
var parentfolder1 = require('path').dirname(__dirname);
var parentfolder2 = require('path').dirname(parentfolder1);
var parentfolder3 = require('path').dirname(parentfolder2);
var portable = portable_check();
const currentLanguage =language()

var gamelocation = gameloc();
const { execSync } = require('child_process');
const { start } = require('repl');
var dirnamew = __dirname.replace(/\\/g, "/")

var connectedtointernet = connectest();

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

//portable switch of launcher
function portable_check() {
    if (fs.existsSync(__dirname + "/portable.txt")) {
        if (fs.readFileSync(__dirname + "/portable.txt") == "true") {
            return true;
        } else {
            return false;
        }
    }
}
//location of games folder per OS
function gameloc() {
    if (portable == true) {
        if (process.platform == "linux") {

            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert(currentLanguage[26]);
                    return parentfolder3;

                }

            } else {
                alert(currentLanguage[27]);
                return parentfolder3;
            }
        } else {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert(currentLanguage[26]);
                    return parentfolder3;

                }

            } else {
                alert(currentLanguage[27]);
                return parentfolder3;
            }
        }
    } else {
        if (process.platform == "linux") {

            if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert(currentLanguage[24]);
                    return app.getPath("documents");

                }

            } else {
                alert(currentLanguage[25]);
                return app.getPath("documents");
            }
        }
        else {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert(currentLanguage[26]);
                    return parentfolder3;

                }

            } else {
                alert(currentLanguage[27]);
                return parentfolder3;
            }
        }
    }


}
//Internet connexion test
function connectest() {
    if (portable == true) {
        if (process.platform == "linux" || process.platform == "darwin") {
            return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/connected.txt");
        } else {
            return fs.readFileSync(__dirname + "/connected.txt");
        }
    } else {
        if (process.platform == "linux" || process.platform == "darwin") {
            return fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/connected.txt");
        } else {
            return fs.readFileSync(__dirname + "/connected.txt");
        }
    }


}
//Open any type of file or folder 
function Open(dossierdujeu, filename) {
    shell.openPath(gamelocation + "/Games/" + dossierdujeu + "/" + filename);
}
//Open games in LINUX OS
function OpenforLinux(gameloc, dossierdujeu, filename) {
    execSync("cd " + gameloc + "/Games/" + dossierdujeu + ";" + " chmod a+x ./" + filename + ";" + " ./" + filename)

}


function detectgamepage() {
    if (process.platform == 'linux' || process.platform == "darwin") {
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SFO") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[110];
            document.getElementById("IMGLOAD").src = "Ressources/LogoSFO2.png";
            document.getElementById("IMGLOAD").style.width = '35%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?LAATIM") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[111];
            document.getElementById("IMGLOAD").src = "Ressources/LogoLAATIM.png";
            document.getElementById("IMGLOAD").style.width = '20%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SGB") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[112];
            document.getElementById("IMGLOAD").src = "Ressources/SGB1.png";
            document.getElementById("IMGLOAD").style.width = '40%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SF") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[113];
            document.getElementById("IMGLOAD").src = "Ressources/LogoSF.png";
            document.getElementById("IMGLOAD").style.width = '20%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?LA") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[114];
            document.getElementById("IMGLOAD").src = "Ressources/LogoLA.png";
            document.getElementById("IMGLOAD").style.width = '35%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?VITF") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[115];
            document.getElementById("IMGLOAD").src = "Ressources/LogoVITF.png";
            document.getElementById("IMGLOAD").style.width = '50%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TTD") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[116];
            document.getElementById("IMGLOAD").src = "Ressources/LogoTTD.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?FWD") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[117];
            document.getElementById("IMGLOAD").src = "Ressources/LogoFWD.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TB") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[118];
            document.getElementById("IMGLOAD").src = "Ressources/LogoTB.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?WR") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[119];
            document.getElementById("IMGLOAD").src = "Ressources/LogoWR.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?AE") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[120];
            document.getElementById("IMGLOAD").src = "Ressources/LogoAE.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SNRE") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[121];
            document.getElementById("IMGLOAD").src = "Ressources/LogoSN.png";
            document.getElementById("IMGLOAD").style.width = '17%';
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SFO") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[110];
            document.getElementById("IMGLOAD").src = "Ressources/LogoSFO2.png";
            document.getElementById("IMGLOAD").style.width = '35%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LAATIM") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[111];
            document.getElementById("IMGLOAD").src = "Ressources/LogoLAATIM.png";
            document.getElementById("IMGLOAD").style.width = '20%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SGB") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[112];
            document.getElementById("IMGLOAD").src = "Ressources/SGB1.png";
            document.getElementById("IMGLOAD").style.width = '40%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SF") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[113];
            document.getElementById("IMGLOAD").src = "Ressources/LogoSF.png";
            document.getElementById("IMGLOAD").style.width = '20%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LA") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[114];
            document.getElementById("IMGLOAD").src = "Ressources/LogoLA.png";
            document.getElementById("IMGLOAD").style.width = '35%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?VITF") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[115];
            document.getElementById("IMGLOAD").src = "Ressources/LogoVITF.png";
            document.getElementById("IMGLOAD").style.width = '50%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TTD") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[116];
            document.getElementById("IMGLOAD").src = "Ressources/LogoTTD.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?FWD") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[117];
            document.getElementById("IMGLOAD").src = "Ressources/LogoFWD.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TB") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[118];
            document.getElementById("IMGLOAD").src = "Ressources/LogoTB.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?WR") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[119];
            document.getElementById("IMGLOAD").src = "Ressources/LogoWR.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?AE") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[120];
            document.getElementById("IMGLOAD").src = "Ressources/LogoAE.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SNRE") {
            document.getElementById("TXTLOAD").innerHTML = currentLanguage[121];
            document.getElementById("IMGLOAD").src = "Ressources/LogoSN.png";
            document.getElementById("IMGLOAD").style.width = '17%';
        }
    }
    LAUNCH()
}

//execute by games actions
//modify to add games
function LAUNCH() {
    if (process.platform == "linux") {
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SFO") {
            setTimeout(() => {
                OpenforLinux(gamelocation, 'SFO', 'nw')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?LAATIM") {
            alert("Game not available on Linux")
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SGB") {
            setTimeout(() => {
                OpenforLinux(gamelocation, 'SGB', 'nw')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SF") {
            alert('Game not available on Linux')
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?LA") {
            alert('Game not available on Linux')
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?VITF") {
            alert('Game not available on Linux')
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TTD") {
            setTimeout(() => {
                OpenforLinux(gamelocation, 'TTD', 'nw')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SNRE") {
            setTimeout(() => {
                OpenforLinux(gamelocation, 'SNRE', 'nw')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?FWD") {
            setTimeout(() => {
                OpenforLinux(gamelocation, 'FWD', 'nw')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TB") {
            setTimeout(() => {
                OpenforLinux(gamelocation, 'TB', 'nw')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?WR") {
            setTimeout(() => {
                OpenforLinux(gamelocation, 'WR', 'nw')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?AE") {
            alert('Game not available on Linux')
        }
    } else if (process.platform == "win32"){
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SFO") {

            setTimeout(() => {
                Open('SFO', 'nw.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);

        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LAATIM") {

            setTimeout(() => {
                Open('LAATIM', 'LA_IM.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);

        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SGB") {
            setTimeout(() => {
                Open('SGB', 'nw.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SF") {
            setTimeout(() => {
                Open('SF', 'ShootFighter.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LA") {
            setTimeout(() => {
                Open('LA', 'Lutin_Adventure.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?VITF") {
            setTimeout(() => {
                Open('VITF', 'VincentInTheForest.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TTD") {
            setTimeout(() => {
                Open('TTD', 'nw.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SNRE") {
            setTimeout(() => {
                Open('SNRE', 'nw.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?FWD") {
            setTimeout(() => {
                Open('FWD', 'nw.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TB") {
            setTimeout(() => {
                Open('TB', 'nw.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?WR") {
            setTimeout(() => {
                Open('WR', 'nw.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?AE") {
            setTimeout(() => {
                Open('AE', 'AsteroidEscapeWinV1FinalPatch1.exe')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }


    }else{
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SFO") {

            setTimeout(() => {
                Open('SFO', 'shootfighterorigins.app')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);

        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LAATIM") {

            alert('Game not supported on this platform')

        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SGB") {
            setTimeout(() => {
                Open('SuperGeoffreyBros', 'supergeoffreybros.app')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SF") {
            alert('Game not supported on this platform')
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LA") {
            alert('Game not supported on this platform')
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?VITF") {
            alert('Game not supported on this platform')
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TTD") {
            setTimeout(() => {
                Open('TTD', 'thetardisdefender.app')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SNRE") {
            setTimeout(() => {
                Open('SNRE', 'sansnomreedition.app')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?FWD") {
            setTimeout(() => {
                Open('FWD', 'firewalldefender.app')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TB") {
            setTimeout(() => {
                Open('TB', 'tanksbattle.app')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?WR") {
            setTimeout(() => {
                Open('WR', 'winrun.app')
                setTimeout(() => {
                    app.quit()
                }, 500);

            }, 2000);
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?AE") {
            alert('Game not supported on this platform')
        }
    }
}