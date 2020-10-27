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
var gamelocation = gameloc();
const { execSync } = require('child_process');
const { start } = require('repl');
var dirnamew = __dirname.replace(/\\/g, "/")

var connectedtointernet = connectest();
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
                    alert("Linux gameloc error, default path used (Documents), cause : check file empty");
                    return parentfolder3;

                }

            } else {
                alert("Linux Gameloc error, default path used (Documents), cause : check file don't exist");
                return parentfolder3;
            }
        }else if (process.platform == "darwin") {

            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert("MacOS gameloc error, default path used (Documents), cause : check file empty");
                    return parentfolder3;

                }

            } else {
                alert("MacOS Gameloc error, default path used (Documents), cause : check file don't exist");
                return parentfolder3;
            }
        } else {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert("Windows gameloc error, default path used (same as nytuolauncher_data, before the launcher main folder), cause : check file empty");
                    return parentfolder3;

                }

            } else {
                alert("Windows gameloc error, default path used (same as nytuolauncher_data, before the launcher main folder), cause : check file don't exist");
                return parentfolder3;
            }
        }
    } else {
        if (process.platform == "linux") {

            if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert("Linux gameloc error, default path used (Documents), cause : check file empty");
                    return app.getPath("documents");

                }

            } else {
                alert("Linux Gameloc error, default path used (Documents), cause : check file don't exist");
                return app.getPath("documents");
            }
        }else if (process.platform == "darwin") {

            if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert("MacOS gameloc error, default path used (Documents), cause : check file empty");
                    return app.getPath("documents");

                }

            } else {
                alert("MacOS Gameloc error, default path used (Documents), cause : check file don't exist");
                return app.getPath("documents");
            }
        } else {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                    return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert("Windows gameloc error, default path used (same as nytuolauncher_data, before the launcher main folder), cause : check file empty");
                    return parentfolder3;

                }

            } else {
                alert("Windows gameloc error, default path used (same as nytuolauncher_data, before the launcher main folder), cause : check file don't exist");
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
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGSFO2.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching ShootFighter Origins";
            document.getElementById("IMGLOAD").src = "Ressources/LogoSFO2.png";
            document.getElementById("IMGLOAD").style.width = '35%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?LAATIM") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGLAATIM.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching Legend Adventure and the Infernal Maze";
            document.getElementById("IMGLOAD").src = "Ressources/LogoLAATIM.png";
            document.getElementById("IMGLOAD").style.width = '20%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SGB") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/SGB2.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching Super Geoffrey Bros";
            document.getElementById("IMGLOAD").src = "Ressources/SGB1.png";
            document.getElementById("IMGLOAD").style.width = '40%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SF") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGSF.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching ShootFighter";
            document.getElementById("IMGLOAD").src = "Ressources/LogoSF.png";
            document.getElementById("IMGLOAD").style.width = '20%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?LA") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGLA.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching Lutin Adventure";
            document.getElementById("IMGLOAD").src = "Ressources/LogoLA.png";
            document.getElementById("IMGLOAD").style.width = '35%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?VITF") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGVITF.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching Vincent In The Forest";
            document.getElementById("IMGLOAD").src = "Ressources/LogoVITF.png";
            document.getElementById("IMGLOAD").style.width = '50%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TTD") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGTTD.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching The Tardis Defender";
            document.getElementById("IMGLOAD").src = "Ressources/LogoTTD.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?FWD") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGFWD.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching FireWall Defender";
            document.getElementById("IMGLOAD").src = "Ressources/LogoFWD.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TB") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGTB.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching TanksBattle";
            document.getElementById("IMGLOAD").src = "Ressources/LogoTB.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?WR") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGWR.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching WinRun";
            document.getElementById("IMGLOAD").src = "Ressources/LogoWR.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?AE") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGAE.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching AsteroidEscape";
            document.getElementById("IMGLOAD").src = "Ressources/LogoAE.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SNRE") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGSN.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching SansNom Réédition";
            document.getElementById("IMGLOAD").src = "Ressources/LogoSN.png";
            document.getElementById("IMGLOAD").style.width = '17%';
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SFO") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGSFO2.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching ShootFighter Origins";
            document.getElementById("IMGLOAD").src = "Ressources/LogoSFO2.png";
            document.getElementById("IMGLOAD").style.width = '35%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LAATIM") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGLAATIM.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching Legend Adventure and the Infernal Maze";
            document.getElementById("IMGLOAD").src = "Ressources/LogoLAATIM.png";
            document.getElementById("IMGLOAD").style.width = '20%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SGB") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/SGB2.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching Super Geoffrey Bros";
            document.getElementById("IMGLOAD").src = "Ressources/SGB1.png";
            document.getElementById("IMGLOAD").style.width = '40%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SF") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGSF.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching ShootFighter";
            document.getElementById("IMGLOAD").src = "Ressources/LogoSF.png";
            document.getElementById("IMGLOAD").style.width = '20%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LA") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGLA.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching Lutin Adventure";
            document.getElementById("IMGLOAD").src = "Ressources/LogoLA.png";
            document.getElementById("IMGLOAD").style.width = '35%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?VITF") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGVITF.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching Vincent In The Forest";
            document.getElementById("IMGLOAD").src = "Ressources/LogoVITF.png";
            document.getElementById("IMGLOAD").style.width = '50%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TTD") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGTTD.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching The Tardis Defender";
            document.getElementById("IMGLOAD").src = "Ressources/LogoTTD.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?FWD") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGFWD.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching FireWall Defender";
            document.getElementById("IMGLOAD").src = "Ressources/LogoFWD.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TB") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGTB.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching TanksBattle";
            document.getElementById("IMGLOAD").src = "Ressources/LogoTB.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?WR") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGWR.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching WinRun";
            document.getElementById("IMGLOAD").src = "Ressources/LogoWR.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?AE") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGAE.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching AsteroidEscape";
            document.getElementById("IMGLOAD").src = "Ressources/LogoAE.png";
            document.getElementById("IMGLOAD").style.width = '25%';
        }
        if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SNRE") {
            document.getElementById("BG").style.backgroundImage = "url(Ressources/IMGSN.png)";
            document.getElementById("TXTLOAD").innerHTML = "Launching SansNom Réédition";
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