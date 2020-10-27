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
var LAATIMU = true;
var SGBU = true;
var SFU = true;
var SNU = true;
var AEU = true;
var FWDU = true;
var TTDU = true;
var WRU = true;
var TBU = true;
var VITFU = true;
var LAU = true;
var SFOU = true;
var ProgressBar = require('progressbar.js');
const { options } = require('request');
const { platform } = require('process');
const mat = require("materialize-css")


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
        }
        else if (process.platform == "darwin") {

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
        }
        else if (process.platform == "darwin") {

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
//Change the location of the games folder
function changegameloc() {
    if (portable == true) {
        if (process.platform == "linux" || process.platform == "darwin") {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", "");
            app.relaunch();
            app.quit();
        } else {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", "");
            app.relaunch();
            app.quit();
        }
    } else {
        if (process.platform == "linux" || process.platform == "darwin") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt", "");
            app.relaunch();
            app.quit();
        } else {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", "");
            app.relaunch();
            app.quit();
        }
    }


}
//actual location of the games folder
function gamelocsettings() {
    if (portable == true) {
        if (process.platform == "linux") {
            document.getElementById("gameloc").innerHTML = " Games folder location: " + fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt")
        } else {
            document.getElementById("gameloc").innerHTML = " Games folder location: " + fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt")
        }
    } else {
        if (process.platform == "linux" || process.platform == "darwin") {
            document.getElementById("gameloc").innerHTML = " Games folder location: " + fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt")
        } else {
            document.getElementById("gameloc").innerHTML = " Games folder location: " + fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt")
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
//Download part
function DownlaodFile(file_url, targetPath, dossierdujeu) {
    console.log("DL phase 2")
    var received_bytes = 0;
    var total_bytes = 0;
    var req = request({
        method: 'GET',
        uri: file_url
    });
    var out = fs.createWriteStream(targetPath);
    var starte = new Date().getTime();
    console.log("DL phase 3")
    req.pipe(out);
    req.on('response', function (data) {
        total_bytes = parseInt(data.headers['content-length']);

    });
    req.on('data', function (chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes, starte);//show progress in progress-bar
    });
    req.on('end', function () {
        var elem = document.getElementById("myBar");
        elem.style.width = 0;
        elem.className = "indeterminate"
        document.getElementById('downloadbtn2').classList.add("disabled")
        document.getElementById("DLTEXT").innerHTML = "Extraction..."
        document.getElementById("resultofcalculsize").innerHTML = "We are extracting the game, that may take a couple of minutes"
        extractzipgame(targetPath, dossierdujeu);// extract the downloaded file
    });
}
//download Update for Launcher 
function DownlaodFileUpdate(file_url, targetPath, dossierdujeu) {

    console.log("DL phase 2")
    var received_bytes = 0;
    var total_bytes = 0;
    var req = request({
        method: 'GET',
        uri: file_url
    });
    var out = fs.createWriteStream(targetPath);
    var starte = new Date().getTime();
    console.log("DL phase 3")
    req.pipe(out);
    req.on('response', function (data) {
        total_bytes = parseInt(data.headers['content-length']);

    });
    req.on('data', function (chunk) {
        // Update the received bytes
        received_bytes += chunk.length;


        showProgressUpdate(received_bytes, total_bytes, starte);
    });
    req.on('end', function () {


        if (process.platform == "linux") {
            fs.rename(targetPath, app.getPath("desktop") + "/Nytuo-Launcher-linux.appimage", (err) => {
                if (err) throw err;
                console.log('Rename complete!');
                shell.openExternal(app.getPath("desktop") + "/Nytuo-Launcher-linux.appimage")
                setTimeout(() => {
                    app.exit();
                }, 1000);


            });
        } else {
            shell.openExternal(targetPath)
            console.log(targetPath)

            setTimeout(() => {
                app.exit();
            }, 1000);
        }

    });
}

//Show the progress of download
function showProgress(received, total, starttime) {



    var percentage = (received * 100) / total;
    var elem = document.getElementById("myBar");
    elem.className = "determinate"
    document.getElementById("DLTEXT").innerHTML = "Downloading..."
    document.getElementById("resultofcalculsize").innerHTML = "We are downloading the game, please wait..."

    var width = 0;
    var end = new Date().getTime();
    var duration = (end - starttime) / 1000;
    var bps = received.toFixed() / duration;
    var kps = bps / 1024;
    kps = Math.floor(kps);
    var time = (total - received) / bps;
    var seconds = time % 60;
    var minutes = time / 60;
    seconds = Math.floor(seconds);
    minutes = Math.floor(minutes);
    width++;
    elem.style.width = percentage + "%";

    document.getElementById("MyBartxt").innerHTML = bytesToSize(bps) + "/s -- " + minutes + " minutes and " + seconds + " Seconds remaining..." + " (" + bytesToSize(received) + "/" + bytesToSize(total) + ")";
    console.log(percentage.toFixed() + "% | " + received.toFixed() + " bytes out of " + total.toFixed() + " bytes.");


}
function showProgressUpdate(received, total, starttime) {



    var percentage = (received * 100) / total;


    var end = new Date().getTime();
    var duration = (end - starttime) / 1000;
    var bps = received.toFixed() / duration;
    var kps = bps / 1024;
    kps = Math.floor(kps);
    var time = (total - received) / bps;
    var seconds = time % 60;
    var minutes = time / 60;
    seconds = Math.floor(seconds);
    minutes = Math.floor(minutes);



    /*var elem = document.getElementById("myBar");
    var width = 0;
    width++;
    elem.style.width = percentage + "%";
    elem.innerHTML = percentage.toFixed() + "%";*/

    document.getElementById("MyBartxt").innerHTML = percentage.toFixed() + "% -- " + bytesToSize(bps) + "/s -- " + bytesToSize(received) + "/" + bytesToSize(total);
    console.log(percentage.toFixed() + "% | " + received.toFixed() + " bytes out of " + total.toFixed() + " bytes.");


}
//Download redirect
function DL(url, dossierdujeu, nomdufichier) {
    console.log("DL phase 1")
    DownlaodFile(url, gamelocation + "/Games/" + dossierdujeu + "/" + nomdufichier, gamelocation + "/Games/" + dossierdujeu)
}
//extract zip
function extractzipgame(zippath, destpath) {
    console.log(zippath, { dir: destpath });
    extract(zippath, { dir: destpath }, function (err) {
        deletefile(zippath)
    })
}

//delete a file
//modify to add games
function deletefile(file2delete) {
    var filepath = file2delete;
    console.log(filepath)
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {

            if (err) {
                Toastifycation(err.message)
                console.log(err);
                return;

            }
        });

    } else {
        Toastifycation("Error when attemping to wipe the cache")
    }
    if (file2delete === gamelocation + "/Games/SFO/SFO.zip") {
        Toastifycation("ShootFighter Origins is now playable !")
    }
    if (file2delete === gamelocation + "/Games/LAATIM/LA_IM.zip") {
        Toastifycation("Legend Adventure and the Infernal Maze is now playable !")
    }
    if (file2delete === gamelocation + "/Games/SF/SF.zip") {
        Toastifycation("ShootFighter is now playable !")
    }
    if (file2delete === gamelocation + "/Games/LA/LA.zip") {
        Toastifycation("Lutin Adventure is now playable !")
    }
    if (file2delete === gamelocation + "/Games/AE/AE.zip") {
        Toastifycation("AsteroidEscape is now playable !")
    }
    if (file2delete === gamelocation + "/Games/SNRE/SNRE.zip") {
        Toastifycation("SansNom Réédition is now playable !")
    }
    if (file2delete === gamelocation + "/Games/SGB/SGB.zip") {

        Toastifycation("Super Geoffrey Bros is now playable !")
    }
    if (file2delete === gamelocation + "/Games/TTD/TTD.zip") {
        Toastifycation("The TARDIS Defender is now playable !")
    }
    if (file2delete === gamelocation + "/Games/TB/TB.zip") {
        Toastifycation("TanksBattle is now playable !")
    }
    if (file2delete === gamelocation + "/Games/FWD/FWD.zip") {
        Toastifycation("Firewall Defender is now playable !")
    }
    if (file2delete === gamelocation + "/Games/VITF/VITF.zip") {
        Toastifycation("Vincent In The Forest is now playable !")
    }
    if (file2delete === gamelocation + "/Games/WR/WR.zip") {
        Toastifycation("WinRun is now playable !")
    }

    setTimeout(function () {
        if (isUp2date === true) {
            refresh();
        } else {
            if (navigator.onLine == true) {
                window.location.href = "https://launcher.nytuo.yo.fr/profile.php"
            } else {
                window.location.href = "index.html"
            }

        }
    }, 2000);
    ACH_RECUP();
}
//Open the emplacement of games
function OpenEmpl(emplacement) {
    console.log(emplacement);
    shell.openPath(emplacement)
}
//restart the launcher
function redm() {
    app.relaunch()
    app.exit()
}
function rebuildGameFolderTree() {
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

}
//delete folder of a game
//modify to add games
function deletefolder(folder2delete) {
    ACH_SAVER()
    rimraf(folder2delete, function () { console.log("done"); });
    setTimeout(function () {
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


    }, 5000);
    if (folder2delete === gamelocation + "/Games/LAATIM") {
        Toastifycation("Legend Adventure and the Infernal Maze has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/SFO") {
        Toastifycation("ShootFighter Origins has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/SF") {
        Toastifycation("ShootFighter has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/LA") {
        Toastifycation("Lutin Adventure has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/AE") {
        Toastifycation("AsteroidEscape has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/SNRE") {
        Toastifycation("SansNom Réédition has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/SGB") {
        Toastifycation("Super Geoffrey Bros has been deleted")

    }
    if (folder2delete === gamelocation + "/Games/TTD") {
        Toastifycation("The TARDIS Defender has been deleted")

    }
    if (folder2delete === gamelocation + "/Games/TB") {
        Toastifycation("TanksBattle has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/FWD") {
        Toastifycation("Firewall Defender has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/VITF") {
        Toastifycation("Vincent In The Forest has been deleted")
    }
    if (folder2delete === gamelocation + "/Games/WR") {
        Toastifycation("WinRun has been deleted")
    }

    window.location.href = "https://launcher.nytuo.yo.fr/profile.php"
}
//delete all games
function deleteall() {
    ACH_SAVER()
    rimraf(gamelocation + "/Games", function () { console.log("done"); });

    setTimeout(function () {
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

        Toastifycation("All Games have been deleted")
        refresh();
    }, 5000);
}
//create shortcut
function createlink(gameid, path2link, desc, iconpath) {

    ws.create(path2link, {
        target: 'nytuo://launchid/' + gameid.toString().toLowerCase(),
        icon: iconpath,
        desc: desc
    });


}
//calcul the size of the download
function CalculSize(url, gamename, type) {
    get_filesize(url, function (size) {
        var sizetotaltemp = bytesToSize(size);
        document.getElementById('resultofcalculsize').innerHTML = "You are about to " + type + " : " + gamename + " (" + sizetotaltemp + ")";
    });
}
//converter of size
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}
//recup file size
function get_filesize(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
    //  to get only the header
    xhr.onreadystatechange = function () {
        if (this.readyState == this.DONE) {
            callback(parseInt(xhr.getResponseHeader("Content-Length")));
        }
    };
    xhr.send();
}
//Detection for windows games only
//modify to add games
function detectforWin(dossierdujeu, versiontxt, versionlcl, gamename, txtVID, url) {
    rebuildGameFolderTree()
    if (connectedtointernet == 'true') {
        if (process.platform === "win32") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === false) {
                document.getElementById("button1").innerHTML = "Install";

                CalculSize(url, gamename, 'Download');

                document.getElementById(txtVID).innerHTML = "Version : ?";
                if (!!document.getElementById("button2") === true) {
                    document.getElementById("button2").onclick = 0;
                    document.getElementById("button2").innerHTML = "";
                }

                document.getElementById("button3").onclick = 0;
                document.getElementById("button3").innerHTML = "";
            } else {
                if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                    document.getElementById("button1").innerHTML = "Play";
                    document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                    document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                } else {
                    document.getElementById("button1").innerHTML = "Update";

                    CalculSize(url, gamename, 'Update');
                    document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + " (Update available)";
                    Toastifycation("An Update for " + gamename + " is available !")
                }
            }
        } else {
            if (process.platform !== "win32") {
                document.getElementById(txtVID).innerHTML = "This game is not available for your platform";
                if (!!document.getElementById("button2") === true) {
                    document.getElementById("button2").onclick = 0;
                    document.getElementById("button2").innerHTML = "";
                }
                document.getElementById("button1").onclick = 0;
                document.getElementById("button1").href = "#";

                document.getElementById("button3").onclick = 0;
                document.getElementById("button1").innerHTML = "Unavailable";
                document.getElementById("button3").innerHTML = "";

            }
        }
    } else {
        if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) === true) {
            document.getElementById("button1").innerHTML = "Play";
            document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
            document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
        } else {
            Toastifycation('Download the game when you are online to play it when you are offline!')
        }
    }
}
//detect games
//modify to add games
function detect(dossierdujeu, versiontxt, versionlcl, gamename, txtVID, url) {
    rebuildGameFolderTree()
    console.log(parentfolder3)
    if (connectedtointernet == "true") {
        if (process.platform === "win32" || process.platform === "linux" || process.platform == 'darwin') {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === false) {
                document.getElementById("button1").innerHTML = "Install";
                CalculSize(url, gamename, 'Download');
                document.getElementById(txtVID).innerHTML = "Version : ?";
                if (!!document.getElementById("button2") === true) {
                    document.getElementById("button2").onclick = 0;
                    document.getElementById("button2").innerHTML = "";
                }

                document.getElementById("button3").onclick = 0;

                document.getElementById("button3").innerHTML = "";
            } else {
                if (process.platform == "linux") {
                    if (portable == true) {
                        if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/' + versionlcl).toString()) {
                            document.getElementById("button1").innerHTML = "Play";
                            document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                            document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                        } else {
                            document.getElementById("button1").innerHTML = "Update";
                            CalculSize(url, gamename, 'Update');
                            document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + " (Update available)";
                            Toastifycation("An Update for " + gamename + " is available !")
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/' + versionlcl).toString()) {
                            document.getElementById("button1").innerHTML = "Play";
                            document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                            document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                        } else {
                            document.getElementById("button1").innerHTML = "Update";
                            CalculSize(url, gamename, 'Update');
                            document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + " (Update available)";
                            Toastifycation("An Update for " + gamename + " is available !")
                        }
                    }

                } else {
                    if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                        document.getElementById("button1").innerHTML = "Play";
                        document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                        document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                    } else {
                        document.getElementById("button1").innerHTML = "Update";
   
                        CalculSize(url, gamename, 'Update');
                        document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + " (Update available)";
                        Toastifycation("An Update for " + gamename + " is available!")
                    }
                }


            }

        } else {
            document.getElementById(txtVID).innerHTML = "This game is not available for this platform";
            if (!!document.getElementById("button2") === true) {
                document.getElementById("button2").onclick = 0;
                document.getElementById("button2").innerHTML = "";
            }
            document.getElementById("button1").onclick = 0;
            document.getElementById("button1").href = "#";

            document.getElementById("button3").onclick = 0;
            document.getElementById("button1").innerHTML = "Unavailable";
            document.getElementById("button3").innerHTML = "";
        }
    }
    else {
        if (process.platform = "linux") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) == true) {
                document.getElementById("button1").innerHTML = "Play";
                document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
            }
        } else if (process.platform = "win32") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) == true) {
                document.getElementById("button1").innerHTML = "Play";
                document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
            }
        } else {
            Toastifycation("This platform is not supported by the Nytuo Launcher or by the game.")
        }
    }
}

var only_one = false
//download versions_files
function DownlaodVersion(file_url, targetPath) {

    only_one = true
    var received_bytes = 0;
    var total_bytes = 0;
    var req = request({
        method: 'GET',
        uri: file_url
    });
    var out = fs.createWriteStream(targetPath);
    req.pipe(out);
    req.on('response', function (data) {
        total_bytes = parseInt(data.headers['content-length']);
    });
    req.on('data', function (chunk) {
        received_bytes += chunk.length;
    });
}
function VerifyVersionSizeAndContent(empl) {
    if (fs.statSync(empl.toString()).size == 0 || fs.readFileSync(empl.toString()) == "") {
        redm()
    }
}
function VersionVerif() {
    if (portable == true) {
        if (process.platform == 'linux' || process.platform == "darwin") {
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/SNRE_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/AE_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/FWD_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LAIM_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LA_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/SF_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/SGB_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/TB_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/TTD_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/VITF_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/WR_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/SFO_Version.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt')
            VerifyVersionSizeAndContent(parentfolder3 + '/nytuolauncher_data/VersionsFiles/b_Beta.txt')



        } else {
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/SNRE_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/AE_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/FWD_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LAIM_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LA_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/SF_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/SGB_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/TB_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/TTD_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/VITF_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/WR_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/SFO_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LauncherVersion.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LauncherUpdateType.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LauncherBetaVersion.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/b_Beta.txt')


        }
    } else {
        if (process.platform == 'linux' || process.platform == "darwin") {
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SNRE_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/AE_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/FWD_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LAIM_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LA_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SF_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SGB_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/TB_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/TTD_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/VITF_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/WR_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SFO_Version.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt')
            VerifyVersionSizeAndContent(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/b_Beta.txt')

        } else {
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/SNRE_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/AE_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/FWD_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LAIM_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LA_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/SF_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/SGB_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/TB_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/TTD_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/VITF_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/WR_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/SFO_Version.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LauncherVersion.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LauncherUpdateType.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/LauncherBetaVersion.txt')
            VerifyVersionSizeAndContent(__dirname + '/VersionsFiles/b_Beta.txt')


        }
    }
}
//download of the version files
function DLVersions() {
    if (portable == true) {
        if (process.platform == "linux" || process.platform == "darwin") {
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJolpeqR1khuFIbpjA?e=wTgArs", parentfolder3 + '/nytuolauncher_data/VersionsFiles/SNRE_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JUXbjPwj1mBzrOuA?e=wVHkGU", parentfolder3 + '/nytuolauncher_data/VersionsFiles/AE_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JT9OzEaq3ZoNfmnA?e=tR3RtZ", parentfolder3 + '/nytuolauncher_data/VersionsFiles/FWD_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJJHH7sOlvHBfzY_GQ?e=bvxWKA", parentfolder3 + '/nytuolauncher_data/VersionsFiles/LAIM_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IJkzYhtpbSxdBvQw?e=yFnUcs", parentfolder3 + '/nytuolauncher_data/VersionsFiles/LA_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_EtKOdpt4-X1izIug?e=8L7yzS", parentfolder3 + '/nytuolauncher_data/VersionsFiles/SF_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hIVslFrM3BD9n8EIVg?e=rUpNyY", parentfolder3 + '/nytuolauncher_data/VersionsFiles/SGB_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JQY-iX8XEyRi1fKg?e=JjUTjN", parentfolder3 + '/nytuolauncher_data/VersionsFiles/TB_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JS2t-rHXsxRfeY0Q?e=0bzJAo", parentfolder3 + '/nytuolauncher_data/VersionsFiles/TTD_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IKXku5lt0MD19anw?e=r7XGjI", parentfolder3 + '/nytuolauncher_data/VersionsFiles/VITF_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JRLYRM7lR1-I5-4A?e=o4fHof", parentfolder3 + '/nytuolauncher_data/VersionsFiles/WR_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5lPIIxnL-WXmVcbSa-A?e=L1N2vy", parentfolder3 + '/nytuolauncher_data/VersionsFiles/SFO_Version.txt');

            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IImCSAtlZSG31pPg?e=92fd99", parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJp0was2tokc6t75-w?e=jrD2Nu", parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJxjY60QkNyIaREMlg?e=jn3ykh", parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt');
            DownlaodVersion('https://1drv.ws/t/s!AkkqGntQc7Y5hqcLm1H1sr4O3eXsfw?e=vR0qax', parentfolder3 + '/nytuolauncher_data/VersionsFiles/b_Beta.txt')
            if (fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt') === "1") {
                document.getElementById("MyBartxt").innerHTML = "Manual Update required : visit the website for more informations"
            }

        } else {
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJolpeqR1khuFIbpjA?e=wTgArs", __dirname + '/VersionsFiles/SNRE_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JUXbjPwj1mBzrOuA?e=wVHkGU", __dirname + '/VersionsFiles/AE_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JT9OzEaq3ZoNfmnA?e=tR3RtZ", __dirname + '/VersionsFiles/FWD_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJJHH7sOlvHBfzY_GQ?e=bvxWKA", __dirname + '/VersionsFiles/LAIM_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IJkzYhtpbSxdBvQw?e=yFnUcs", __dirname + '/VersionsFiles/LA_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_EtKOdpt4-X1izIug?e=8L7yzS", __dirname + '/VersionsFiles/SF_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hIVslFrM3BD9n8EIVg?e=rUpNyY", __dirname + '/VersionsFiles/SGB_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JQY-iX8XEyRi1fKg?e=JjUTjN", __dirname + '/VersionsFiles/TB_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JS2t-rHXsxRfeY0Q?e=0bzJAo", __dirname + '/VersionsFiles/TTD_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IKXku5lt0MD19anw?e=r7XGjI", __dirname + '/VersionsFiles/VITF_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JRLYRM7lR1-I5-4A?e=o4fHof", __dirname + '/VersionsFiles/WR_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5lPIIxnL-WXmVcbSa-A?e=L1N2vy", __dirname + '/VersionsFiles/SFO_Version.txt');

            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IImCSAtlZSG31pPg?e=92fd99", __dirname + '/VersionsFiles/LauncherVersion.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJp0was2tokc6t75-w?e=jrD2Nu", __dirname + '/VersionsFiles/LauncherUpdateType.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJxjY60QkNyIaREMlg?e=jn3ykh", __dirname + '/VersionsFiles/LauncherBetaVersion.txt');
            DownlaodVersion('https://1drv.ws/t/s!AkkqGntQc7Y5hqcLm1H1sr4O3eXsfw?e=vR0qax', __dirname + '/VersionsFiles/b_Beta.txt')
            if (fs.readFileSync(__dirname + '/VersionsFiles/LauncherUpdateType.txt') === "1") {
                document.getElementById("MyBartxt").innerHTML = "Manual Update required : visit the website for more informations"
            }
        }
    } else {
        if (process.platform == "linux" || process.platform == "darwin") {
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJolpeqR1khuFIbpjA?e=wTgArs", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SNRE_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JUXbjPwj1mBzrOuA?e=wVHkGU", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/AE_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JT9OzEaq3ZoNfmnA?e=tR3RtZ", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/FWD_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJJHH7sOlvHBfzY_GQ?e=bvxWKA", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LAIM_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IJkzYhtpbSxdBvQw?e=yFnUcs", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LA_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_EtKOdpt4-X1izIug?e=8L7yzS", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SF_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hIVslFrM3BD9n8EIVg?e=rUpNyY", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SGB_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JQY-iX8XEyRi1fKg?e=JjUTjN", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/TB_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JS2t-rHXsxRfeY0Q?e=0bzJAo", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/TTD_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IKXku5lt0MD19anw?e=r7XGjI", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/VITF_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JRLYRM7lR1-I5-4A?e=o4fHof", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/WR_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5lPIIxnL-WXmVcbSa-A?e=L1N2vy", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SFO_Version.txt');

            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IImCSAtlZSG31pPg?e=92fd99", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJp0was2tokc6t75-w?e=jrD2Nu", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJxjY60QkNyIaREMlg?e=jn3ykh", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt');
            DownlaodVersion('https://1drv.ws/t/s!AkkqGntQc7Y5hqcLm1H1sr4O3eXsfw?e=vR0qax', app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/b_Beta.txt')
            if (fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt') === "1") {
                document.getElementById("MyBartxt").innerHTML = "Manual Update required : visit the website for more informations"
            }
        } else {
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJolpeqR1khuFIbpjA?e=wTgArs", __dirname + '/VersionsFiles/SNRE_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JUXbjPwj1mBzrOuA?e=wVHkGU", __dirname + '/VersionsFiles/AE_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JT9OzEaq3ZoNfmnA?e=tR3RtZ", __dirname + '/VersionsFiles/FWD_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJJHH7sOlvHBfzY_GQ?e=bvxWKA", __dirname + '/VersionsFiles/LAIM_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IJkzYhtpbSxdBvQw?e=yFnUcs", __dirname + '/VersionsFiles/LA_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_EtKOdpt4-X1izIug?e=8L7yzS", __dirname + '/VersionsFiles/SF_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hIVslFrM3BD9n8EIVg?e=rUpNyY", __dirname + '/VersionsFiles/SGB_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JQY-iX8XEyRi1fKg?e=JjUTjN", __dirname + '/VersionsFiles/TB_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JS2t-rHXsxRfeY0Q?e=0bzJAo", __dirname + '/VersionsFiles/TTD_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IKXku5lt0MD19anw?e=r7XGjI", __dirname + '/VersionsFiles/VITF_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JRLYRM7lR1-I5-4A?e=o4fHof", __dirname + '/VersionsFiles/WR_Version.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5lPIIxnL-WXmVcbSa-A?e=L1N2vy", __dirname + '/VersionsFiles/SFO_Version.txt');

            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IImCSAtlZSG31pPg?e=92fd99", __dirname + '/VersionsFiles/LauncherVersion.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJp0was2tokc6t75-w?e=jrD2Nu", __dirname + '/VersionsFiles/LauncherUpdateType.txt');
            DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJxjY60QkNyIaREMlg?e=jn3ykh", __dirname + '/VersionsFiles/LauncherBetaVersion.txt');
            DownlaodVersion('https://1drv.ws/t/s!AkkqGntQc7Y5hqcLm1H1sr4O3eXsfw?e=vR0qax', __dirname + '/VersionsFiles/b_Beta.txt')
            if (fs.readFileSync(__dirname + '/VersionsFiles/LauncherUpdateType.txt') === "1") {
                document.getElementById("MyBartxt").innerHTML = "Manual Update required : visit the website for more informations"
            }
        }
    }
    setTimeout(() => {
        VersionVerif()

    }, 3000);

}
//Execute action for windows game only
function DoforWin(dossierdujeu, versiontxt, URL, zipname, versionlcl, nomexe, gamename) {

    if (process.platform === "win32") {
        if (connectedtointernet == "true") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) === false) {
                console.log("DL init.")
                DL(URL, dossierdujeu, zipname);
            } else {
                if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                    LaunchGame(dossierdujeu)
                    //turnonOverlay();
                    //Open(dossierdujeu, nomexe);
                    //setTimeout(function () {
                    //  turnoffOverlay();
                    //}, 1000);


                } else {
                    isInUpdate = true;
                    deletefolderforrepair(gamelocation + '/Games/' + dossierdujeu);
                    setTimeout(function () {
                        DL(URL, dossierdujeu, zipname);
                    }, 5000);

                }
            }
        } else if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === true) {
            //turnonOverlay();
            //Open(dossierdujeu, nomexe);
            //setTimeout(function () {
            //   turnoffOverlay();
            //}, 1000);
            LaunchGame(dossierdujeu)

        } else {
            Toastifycation("You\'re not connected to the internet, please restart the launcher with an internet connection")
        }

    }
    if (process.platform !== "win32") {
        Toastifycation(gamename + " is not available for your operating system")
    }
    ACH_SAVER();
}
//execute action for games
function Do(dossierdujeu, versiontxt, URLwin, zipname, versionlcl, nomexe, gamename, linuxexe, macosexe, URLinux, URLmac) {
    if (process.platform === "win32") {
        if (connectedtointernet == "true") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) === false) {
                DL(URLwin, dossierdujeu, zipname);
            } else {
                if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                    //turnonOverlay();
                    //Open(dossierdujeu, nomexe);
                    //setTimeout(function () {
                    //turnoffOverlay()
                    //}, 1000)
                    LaunchGame(dossierdujeu)
                } else {
                    isInUpdate = true;
                    deletefolderforrepair(gamelocation + '/Games/' + dossierdujeu);
                    setTimeout(function () {
                        DL(URLwin, dossierdujeu, zipname);
                    }, 5000);

                }
            }
        } else if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === true) {
            //turnonOverlay();
            //Open(dossierdujeu, nomexe);
            //setTimeout(function () {
            //   turnoffOverlay()
            //}, 1000)
            LaunchGame(dossierdujeu)
        } else {
            Toastifycation('You\'re not connected to the internet, please restart the launcher with an internet connection')
        }

    }
    if (process.platform === "linux") {
        if (connectedtointernet == "true") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) === false) {
                DL(URLinux, dossierdujeu, zipname);
            } else {
                if (portable == true) {
                    if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt).toString() === fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/' + versionlcl).toString()) {
                        LaunchGame(dossierdujeu)


                    } else {
                        isInUpdate = true;
                        deletefolderforrepair(gamelocation + '/Games/' + dossierdujeu);
                        setTimeout(function () {
                            DL(URLinux, dossierdujeu, zipname);
                        }, 5000);

                    }
                } else {
                    if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt).toString() === fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/' + versionlcl).toString()) {
                        LaunchGame(dossierdujeu)

                    } else {
                        isInUpdate = true;
                        deletefolderforrepair(gamelocation + '/Games/' + dossierdujeu);
                        setTimeout(function () {
                            DL(URLinux, dossierdujeu, zipname);
                        }, 5000);

                    }
                }

            }

        } else if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === true) {
            LaunchGame(dossierdujeu)

        } else {
            Toastifycation('You\'re not connected to the internet, please restart the launcher with an internet connection')
        }

    }
    if (process.platform != "linux" && process.platform != "win32") {
        Toastifycation("Your platform is not compatible with the game (You're not supposed to view this message, if you view it please report the error with code #0220)")
    }
    ACH_SAVER();
}
//refresh page
function refresh() {
    window.location.reload()

}
//repair a game
function repair(url, dossier, zip, urlinux, urlmac) {
    console.log(gamelocation + "/Games/" + dossier)
    deletefolderforrepair(gamelocation + "/Games/" + dossier);
    setTimeout(function () {
        if (process.platform === 'win32') {
            DL(url, dossier, zip);
        }
        if (process.platform === 'linux') {
            DL(urlinux, dossier, zip);
        }
        if (process.platform === 'darwin') {
            DL(urlmac, dossier, zip);
        }
    }, 5000);

}
//delete a folder for a repair
function deletefolderforrepair(folder2delete) {
    rimraf(folder2delete, function () { console.log("done"); });

    setTimeout(function () {
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

    }, 500);
}

//run online version of a game
function RunWithoutInstall(url, gamejolt) {

    setTimeout(function () {
    }, 1000)
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const path = require('path')
    const win = new BrowserWindow({
        minHeight: 480,
        minWidth: 720,
        height: 480,
        width: 720,
        icon: path.join(__dirname, 'Ressources/logoexp.png')
    });
    win.loadURL(url);
    if (gamejolt === 'true') {
        setTimeout(function () {
            win.close();
        }, 5000)
    }
}
//the update system
var isUp2date = true;
function update() {
    setTimeout(function () {
        console.log(window.require('electron').remote.app.getVersion().toString());
        if (portable == true) {
            if (process.platform == "linux") {
                var launcherversion = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt");
                var launcherversionbeta = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt");
            } else {
                var launcherversion = fs.readFileSync(__dirname + "/VersionsFiles/LauncherVersion.txt");
                var launcherversionbeta = fs.readFileSync(__dirname + "/VersionsFiles/LauncherBetaVersion.txt");
            }

        } else {
            if (process.platform == "linux") {
                var launcherversion = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt");
                var launcherversionbeta = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt");
            } else {
                var launcherversion = fs.readFileSync(__dirname + "/VersionsFiles/LauncherVersion.txt");
                var launcherversionbeta = fs.readFileSync(__dirname + "/VersionsFiles/LauncherBetaVersion.txt");
            }
        }



        console.log(parentfolder2);
        console.log(fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString());
        if (process.platform == 'win32' && fs.existsSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt') == true && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt') == 'True' && fs.readFileSync(__dirname + '/VersionsFiles/b_Beta.txt') == 'True') {


            if (fs.existsSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "0");
                Toastifycation("Start Downloading")
                console.log("You have to update the launcher !")
                isUp2date = false;
            } else {
                if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(__dirname + '/VersionsFiles/LauncherBetaVersion.txt').toString()) {
                    Toastifycation("A beta Update is available for the Nytuo Launcher")
                    console.log("You have to update the launcher !")
                    isUp2date = false;
                }
                if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(__dirname + '/VersionsFiles/LauncherBetaVersion.txt').toString()) {
                    console.log("Very UpToDate")
                    console.log(app.getAppPath())
                    verif_gameVersionLoading();
                }
                if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(__dirname + '/VersionsFiles/LauncherBetaVersion.txt').toString()) {
                    console.log("UpToDate")
                    verif_gameVersionLoading();
                }

            }
            if (isUp2date === false) {
                if (portable == true) {
                    alert("Update Available but your on a Portable Edition so automatic update doesn't work. Refer to my website (nytuo.yo.fr) in the help page to update the portable version of the launcher")
                } else {
                    if (!!document.getElementById('updateview') === true) {
                        document.getElementById('updateview').style.display = "block";
                    }
                    DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversionbeta + '/Nytuo-Launcher-Setup-' + launcherversionbeta + '.exe', parentfolder3 + "/nytuolauncher_data/win64UpdateBeta.exe");
                }

            }




        } else {
            if (portable == true) {
                if (process.platform == "linux") {
                    if (fs.existsSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                        fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "0");
                        Toastifycation("Start Downloading")
                        console.log("You have to update the launcher !");
                        isUp2date = false;
                    } else {
                        if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                            Toastifycation("An Update for the Nytuo Launcher is available!")

                            console.log("You have to update the launcher !");
                            isUp2date = false;
                        }
                        if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                            console.log("Very UpToDate");
                            console.log(app.getAppPath());
                            verif_gameVersionLoading();
                        }
                        if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                            console.log("UpToDate");
                            verif_gameVersionLoading();
                        }
                    }


                    if (isUp2date === false) {
                        //DL bonne version
                        //Lance le programme
                        //Ferme celui là
                        if (portable == true) {
                            alert("Update Available but your on a Portable Edition so automatic update doesn't work. Refer to my website (nytuo.yo.fr) in the help page to update the portable version of the launcher")
                        } else {
                            if (!!document.getElementById('updateview') === true) {
                                document.getElementById('updateview').style.display = "block";
                            }
                            DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-Setup-' + launcherversion + '.appimage', app.getPath("documents") + "/nytuolauncher_data/linuxUpdate.appimage");
                        }



                    }
                } else {
                    if (fs.existsSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                        fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "0");
                        Toastifycation("Start Downloading")

                        console.log("You have to update the launcher !")
                        isUp2date = false;
                    } else {
                        if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                            Toastifycation("An update for the Nytuo Launcher is available")
                            console.log("You have to update the launcher !")
                            isUp2date = false;
                        }
                        if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                            console.log("Very UpToDate")
                            console.log(app.getAppPath())
                            verif_gameVersionLoading();
                        }
                        if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                            console.log("UpToDate")
                            verif_gameVersionLoading();
                        }
                    }

                    if (isUp2date === false) {
                        //DL bonne version
                        //Lance le programme
                        //Ferme celui là
                        if (portable == true) {
                            alert("Update Available but your on a Portable Edition so automatic update doesn't work. Refer to my website (nytuo.yo.fr) in the help page to update the portable version of the launcher")
                        } else {
                            if (!!document.getElementById('updateview') === true) {
                                document.getElementById('updateview').style.display = "block";
                            }
                            if (process.platform == 'win32') {

                                DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-Setup-' + launcherversion + '.exe', parentfolder3 + "/nytuolauncher_data/win64Update.exe");
                            }
                        }


                    }
                }
            } else {
                if (process.platform == "linux") {
                    if (fs.existsSync(app.getPath("documents") + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                        fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/forceUpdate.txt", "0");
                        Toastifycation("Start Downloading")
                        console.log("You have to update the launcher !");
                        isUp2date = false;
                    } else {
                        if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                            Toastifycation("An Update for the Nytuo Launcher is available")
                            console.log("You have to update the launcher !");
                            isUp2date = false;
                        }
                        if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                            console.log("Very UpToDate");
                            console.log(app.getAppPath());
                            verif_gameVersionLoading();
                        }
                        if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                            console.log("UpToDate");
                            verif_gameVersionLoading();
                        }
                    }

                    if (isUp2date === false) {
                        //DL bonne version
                        //Lance le programme
                        //Ferme celui là
                        if (!!document.getElementById('updateview') === true) {
                            document.getElementById('updateview').style.display = "block";
                        }
                        DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-Setup-' + launcherversion + '.appimage', app.getPath("documents") + "/nytuolauncher_data/linuxUpdate.appimage");


                    }
                } else {
                    if (fs.existsSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                        fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "0");
                        Toastifycation("Start Downloading")
                        console.log("You have to update the launcher !")
                        isUp2date = false;
                    } else {
                        if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                            Toastifycation("An Update is available for the Nytuo Launcher")
                            console.log("You have to update the launcher !")
                            isUp2date = false;
                        }
                        if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                            console.log("Very UpToDate")
                            console.log(app.getAppPath())
                            verif_gameVersionLoading();
                        }
                        if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                            console.log("UpToDate")
                            verif_gameVersionLoading();
                        }
                    }

                    if (isUp2date === false) {
                        //DL bonne version
                        //Lance le programme
                        //Ferme celui là
                        if (!!document.getElementById('updateview') === true) {
                            document.getElementById('updateview').style.display = "block";
                        }
                        if (process.platform == 'win32') {

                            DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-Setup-' + launcherversion + '.exe', parentfolder3 + "/nytuolauncher_data/win64Update.exe");
                        }

                    }
                }
            }



        }


    }, 5000)
}
function forceUpdate() {
    if (process.platform == 'linux' || process.platform == "darwin") {
        fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/forceUpdate.txt", "1");

    } else {
        fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "1");


    }
    redm();
}
//verif games update at launch
//modify to add games
function verif_gameVersionLoading() {

    if (window.require('electron').remote.app.getVersion().toString() >= fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {


        setTimeout(function () {
            if (fs.existsSync(gamelocation + '/Games/LAATIM/LAIM_Version.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/LAATIM/LAIM_Version.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LAIM_Version.txt').toString()) {
                            LAATIMU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/LAATIM/LAIM_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/LAIM_Version.txt').toString()) {
                            LAATIMU = false
                        }
                    }
                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/LAATIM/LAIM_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LAIM_Version.txt').toString()) {
                            LAATIMU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/LAATIM/LAIM_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/LAIM_Version.txt').toString()) {
                            LAATIMU = false
                        }
                    }
                }
                Toastifycation("An update is available for Legend Adventure And The Infernal Maze")
            }

            if (fs.existsSync(gamelocation + '/Games/SF/VersionSF.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SF/VersionSF.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/SF_Version.txt').toString()) {
                            SFU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SF/VersionSF.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SF_Version.txt').toString()) {
                            SFU = false
                        }
                    }
                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SF/VersionSF.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SF_Version.txt').toString()) {
                            SFU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SF/VersionSF.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SF_Version.txt').toString()) {
                            SFU = false
                        }
                    }
                }

                Toastifycation("An update is available for ShootFighter")


            }
            if (fs.existsSync(gamelocation + '/Games/LA/VersionLA.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/LA/VersionLA.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LA_Version.txt').toString()) {
                            LAU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/LA/VersionLA.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/LA_Version.txt').toString()) {
                            LAU = false
                        }
                    }

                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/LA/VersionLA.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LA_Version.txt').toString()) {
                            LAU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/LA/VersionLA.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/LA_Version.txt').toString()) {
                            LAU = false
                        }
                    }

                }
                Toastifycation("An update is available for Lutin Adventure")



            }
            if (fs.existsSync(gamelocation + '/Games/AE/VersionAE.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/AE/VersionAE.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/AE_Version.txt').toString()) {
                            AEU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/AE/VersionAE.txt').toString() < fs.readFileSync(__dirname + '/nytuolauncher_data/VersionsFiles/AE_Version.txt').toString()) {
                            AEU = false
                        }
                    }

                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/AE/VersionAE.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/AE_Version.txt').toString()) {
                            AEU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/AE/VersionAE.txt').toString() < fs.readFileSync(__dirname + '/nytuolauncher_data/VersionsFiles/AE_Version.txt').toString()) {
                            AEU = false
                        }
                    }

                }
                Toastifycation("An update is available for AsteroidEscape")


            }
            if (fs.existsSync(gamelocation + '/Games/SNRE/SNRE_Version.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SNRE/SNRE_Version.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/SNRE_Version.txt').toString()) {
                            SNU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SNRE/SNRE_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SNRE_Version.txt').toString()) {
                            SNU = false
                        }
                    }

                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SNRE/SNRE_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SNRE_Version.txt').toString()) {
                            SNU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SNRE/SNRE_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SNRE_Version.txt').toString()) {
                            SNU = false
                        }
                    }

                }

                Toastifycation("An update is available for SansNom Réédition")


            }
            if (fs.existsSync(gamelocation + '/Games/SGB/SGB_Version.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SGB/SGB_Version.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/SGB_Version.txt').toString()) {
                            SGBU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SGB/SGB_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SGB_Version.txt').toString()) {
                            SGBU = false
                        }
                    }

                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SGB/SGB_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SGB_Version.txt').toString()) {
                            SGBU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SGB/SGB_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SGB_Version.txt').toString()) {
                            SGBU = false
                        }
                    }

                }
                Toastifycation("An update is available for Super Geoffrey Bros")


            }
            if (fs.existsSync(gamelocation + '/Games/TTD/TTD_Version.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/TTD/TTD_Version.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/TTD_Version.txt').toString()) {
                            TTDU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/TTD/TTD_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/TTD_Version.txt').toString()) {
                            TTDU = false
                        }
                    }

                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/TTD/TTD_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/TTD_Version.txt').toString()) {
                            TTDU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/TTD/TTD_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/TTD_Version.txt').toString()) {
                            TTDU = false
                        }
                    }

                }
                Toastifycation("An update is available for The TARDIS Defender")



            }
            if (fs.existsSync(gamelocation + '/Games/TB/VersionTB.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/TB/VersionTB.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/TB_Version.txt').toString()) {
                            TBU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/TB/VersionTB.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/TB_Version.txt').toString()) {
                            TBU = false
                        }
                    }

                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/TB/VersionTB.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/TB_Version.txt').toString()) {
                            TBU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/TB/VersionTB.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/TB_Version.txt').toString()) {
                            TBU = false
                        }
                    }

                }
                Toastifycation("An update is available for TanksBattle")



            }
            if (fs.existsSync(gamelocation + '/Games/FWD/VersionFWD.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/FWD/VersionFWD.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/FWD_Version.txt').toString()) {
                            FWDU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/FWD/VersionFWD.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/FWD_Version.txt').toString()) {
                            FWDU = false
                        }
                    }

                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/FWD/VersionFWD.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/FWD_Version.txt').toString()) {
                            FWDU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/FWD/VersionFWD.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/FWD_Version.txt').toString()) {
                            FWDU = false
                        }
                    }

                }
                Toastifycation("An update is available for Firewall Defender")



            }
            if (fs.existsSync(gamelocation + '/Games/VITF/VersionVITF.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/VITF/VersionVITF.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/VITF_Version.txt').toString()) {
                            VITFU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/VITF/VersionVITF.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/VITF_Version.txt').toString()) {
                            VITFU = false
                        }
                    }

                } else {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/VITF/VersionVITF.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/VITF_Version.txt').toString()) {
                            VITFU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/VITF/VersionVITF.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/VITF_Version.txt').toString()) {
                            VITFU = false
                        }
                    }

                }
                Toastifycation("An update is available for Vincent In The Forest")



            }
            if (fs.existsSync(gamelocation + '/Games/WR/VersionWR.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == 'linux') {
                        if (fs.readFileSync(gamelocation + '/Games/WR/VersionWR.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/WR_Version.txt').toString()) {
                            WRU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/WR/VersionWR.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/WR_Version.txt').toString()) {
                            WRU = false
                        }
                    }

                } else {
                    if (process.platform == 'linux') {
                        if (fs.readFileSync(gamelocation + '/Games/WR/VersionWR.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/WR_Version.txt').toString()) {
                            WRU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/WR/VersionWR.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/WR_Version.txt').toString()) {
                            WRU = false
                        }
                    }

                }
                Toastifycation("An update is available for WinRun")



            }
            if (fs.existsSync(gamelocation + '/Games/SFO/SFO_Version.txt').toString === true) {
                if (portable == true) {
                    if (process.platform == 'linux') {
                        if (fs.readFileSync(gamelocation + '/Games/SFO/SFO_Version.txt').toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/SFO_Version.txt').toString()) {
                            SFOU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SFO/SFO_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SFO_Version.txt').toString()) {
                            SFOU = false
                        }
                    }

                } else {
                    if (process.platform == 'linux') {
                        if (fs.readFileSync(gamelocation + '/Games/SFO/SFO_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SFO_Version.txt').toString()) {
                            SFOU = false
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SFO/SFO_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SFO_Version.txt').toString()) {
                            SFOU = false
                        }
                    }

                }
                Toastifycation("An update is available for ShootFighter Origins")



            }
            LaunchWindowLauncher()
            close()

        }, 4000);




    }
}
//compare achievements
function compare(array1, array2) {
    var temp = [];
    array1 = array1.toString().split(',').map(String);
    array2 = array2.toString().split(',').map(String);

    for (var i in array1) {
        if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    return temp.sort((a) => a);
}
//load achievements
//modify to add games with achievements
function LoadAchivements() {
    console.log(homedir)
    var page = window.location.href;
    if (page === "file:///" + dirnamew + "/Games.html?sfo" || page === "index.html" || page === "profile.php" || page === "/sfo.html") {
        var AchlistSFO = require('fs').readFileSync(__dirname + '/Achievements/SFO/AllAchievements.txt', 'utf-8').split('\n');
        if (fs.existsSync(gamelocation + "/Games/SFO/Achievements/AchDone.txt")) {
            let AchListSFODone2 = require('fs').readFileSync(gamelocation + "/Games/SFO/Achievements/AchDone.txt", 'utf-8').split('\n');
            console.log(AchListSFODone2);
            let temp = AchListSFODone2.sort();
            let AchListSFODone = Array.from(new Set(temp));
            console.log(AchListSFODone);
            var percentage = ((AchListSFODone.length - 2) * 100) / (AchlistSFO.length - 1);
            if (percentage < "0") {
                percentage = 0
            }
            console.log(percentage);
            var elem = document.getElementById("BarAch");
            var width = 0;
            elem.style.width = percentage + "%";
            elem.innerHTML = percentage.toFixed() + "%";
            var AchListSFOTab = AchListSFODone.slice(1, (AchListSFODone.length));
            var AchListSFOTXT = AchListSFOTab.toString().split(",").join("<br/>");
            if (page === "file:///" + dirnamew + "/Games.html?sfo" || page === "sfo.html") {
                document.getElementById('achDone').innerHTML = AchListSFOTXT.toString();
                var SFOLock = compare(AchlistSFO, AchListSFODone);

                if (percentage <= "0") {
                    document.getElementById('achDone').innerHTML = "No achievements are unlocked for this game"
                }
                if (percentage != "100") {
                    document.getElementById('ach').innerHTML = SFOLock.toString().split(",").join('<br/>');
                } else {
                    document.getElementById('ach').innerHTML = "All Achievements are Unlocked"
                }
            }
        } else {
            document.getElementById('achDone').innerHTML = "No achievements are unlocked for this game"
            document.getElementById('ach').innerHTML = AchlistSFO.toString().split(",").join('<br/>');
        }

    }
    if (page === "file:///" + dirnamew + "/Games.html?sgb" || page === "index.html" || page === "profile.php" || page === "/sgb.html") {
        var AchlistSGB = require('fs').readFileSync(__dirname + '/Achievements/SGB/AllAchievements.txt', 'utf-8').split('\n');
        if (fs.existsSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt")) {
            let AchListSGBDone2 = require('fs').readFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", 'utf-8').split('\n');
            console.log(AchListSGBDone2);
            let temp = AchListSGBDone2.sort();
            let AchListSGBDone = Array.from(new Set(temp));
            console.log(AchListSGBDone);
            var percentage = ((AchListSGBDone.length - 2) * 100) / (AchlistSGB.length - 1);
            if (percentage < "0") {
                percentage = 0
            }
            console.log(percentage);
            var elem = document.getElementById("BarAch");
            var width = 0;
            elem.style.width = percentage + "%";
            elem.innerHTML = percentage.toFixed() + "%";
            var AchListSGBTab = AchListSGBDone.slice(1, (AchListSGBDone.length));
            var AchListSGBTXT = AchListSGBTab.toString().split(",").join("<br/>");
            if (page === "file:///" + dirnamew + "/Games.html?sgb" || page === "sgb.html") {
                document.getElementById('achDone').innerHTML = AchListSGBTXT.toString();
                var SGBLock = compare(AchlistSGB, AchListSGBDone);

                if (percentage <= "0") {
                    document.getElementById('achDone').innerHTML = "No achievements are unlocked for this game"
                }
                if (percentage != "100") {
                    document.getElementById('ach').innerHTML = SGBLock.toString().split(",").join('<br/>');
                } else {
                    document.getElementById('ach').innerHTML = "All Achievements are Unlocked"
                }
            }
        } else {
            document.getElementById('achDone').innerHTML = "No achievements are unlocked for this game"
            document.getElementById('ach').innerHTML = AchlistSGB.toString().split(",").join('<br/>');
        }

    }
    if (page === "file:///" + dirnamew + "/Games.html?laatim" || page === "index.html" || page === "profile.php" || page === "laatim.html") {
        var AchlistLAATIM = require('fs').readFileSync(__dirname + '/Achievements/LAATIM/AllAchievements.txt', 'utf-8').split('\n');
        if (fs.existsSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt")) {
            let AchListLAATIMDone2 = require('fs').readFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", 'utf-8').split('\n');
            console.log(AchListLAATIMDone2);
            let temp = AchListLAATIMDone2.sort();
            let AchListLAATIMDone = Array.from(new Set(temp));
            console.log(AchListLAATIMDone);
            var percentage = ((AchListLAATIMDone.length - 2) * 100) / (AchlistLAATIM.length - 1);
            if (percentage < "0") {
                percentage = 0
            }
            console.log(percentage);
            var elem = document.getElementById("BarAch");
            var width = 0;
            elem.style.width = percentage + "%";
            elem.innerHTML = percentage.toFixed() + "%";
            var AchListLAATIMTab = AchListLAATIMDone.slice(1, (AchListLAATIMDone.length));
            var AchListLAATIMTXT = AchListLAATIMTab.toString().split(",").join("<br/>");
            if (page === "file:///" + dirnamew + "/Games.html?laatim" || page === "laatim.html") {
                document.getElementById('achDone').innerHTML = AchListLAATIMTXT.toString();
                var LAATIMLock = compare(AchlistLAATIM, AchListLAATIMDone);

                if (percentage <= "0") {
                    document.getElementById('achDone').innerHTML = "No achievements are unlocked for this game"
                }
                if (percentage != "100") {
                    document.getElementById('ach').innerHTML = LAATIMLock.toString().split(",").join('<br/>');
                } else {
                    document.getElementById('ach').innerHTML = "All Achievements are Unlocked"
                }
            }
        } else {
            document.getElementById('achDone').innerHTML = "No achievements are unlocked for this game"
            document.getElementById('ach').innerHTML = AchlistLAATIM.toString().split(",").join('<br/>');
        }
    }

    if (page === "file:///" + dirnamew + "/Games.html?sn" || page === "profile.php" || page === "index.html" || page === "sn.html") {
        var AchlistSNRE = require('fs').readFileSync(__dirname + '/Achievements/SNRE/AllAchievements.txt', 'utf-8').split('\n');
        if (fs.existsSync(gamelocation + "Games/SNRE/Achievements/AchDone.txt")) {
            let AchListSNREDone2 = require('fs').readFileSync(gamelocation + "Games/SNRE/Achievements/AchDone.txt", 'utf-8').split('\n');
            console.log(AchListSNREDone2);
            let temp = AchListSNREDone2.sort();
            let AchListSNREDone = Array.from(new Set(temp));
            console.log(AchListSNREDone);
            var percentage = ((AchListSNREDone.length - 2) * 100) / (AchlistSNRE.length - 1);
            if (percentage < "0") {
                percentage = 0
            }
            console.log(percentage);
            var elem = document.getElementById("BarAch");
            var width = 0;
            elem.style.width = percentage + "%";
            elem.innerHTML = percentage.toFixed() + "%";
            var AchListSNRETab = AchListSNREDone.slice(1, (AchListSNREDone.length));
            var AchListSNRETXT = AchListSNRETab.toString().split(",").join("<br/>");
            if (page === "file:///" + dirnamew + "/Games.html?sn" || page === "sn.html") {
                document.getElementById('achDone').innerHTML = AchListSNRETXT.toString();
                var SNRELock = compare(AchlistSNRE, AchListSNREDone);

                if (percentage <= "0") {
                    document.getElementById('achDone').innerHTML = "No achievements are unlocked for this game"
                }
                if (percentage != "100") {
                    document.getElementById('ach').innerHTML = SNRELock.toString().split(",").join('<br/>');
                } else {
                    document.getElementById('ach').innerHTML = "All Achievements are Unlocked"
                }
            }
        } else {
            document.getElementById('achDone').innerHTML = "No achievements are unlocked for this game"
            document.getElementById('ach').innerHTML = AchlistSNRE.toString().split(",").join('<br/>');
        }

    }
}
//verif beta access
function validate() {
    if (process.platform == "linux") {
        Toastifycation("Your Platform is not supported for beta program, sorry...")
        beta('no');
    } else {
        if (fs.readFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt') == 'True') {
            Toastifycation("You are no more in the beta program of the Nytuo Launcher ! (if you are on a beta version, please wait until stable update or do a manual update or launch manually the updater.)");
            beta('no');
        } else {

            Toastifycation("You are in the beta program of the Nytuo Launcher ! (The beta version (if available) will be downloaded when you open again the launcher.)");
            beta('yes');
        }
    }



}
//enter beta program
function beta(entry) {
    if (entry === 'no') {
        if (portable == true) {
            if (process.platform == "linux") {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
            } else {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
            }
        } else {
            if (process.platform == "linux") {
                fs.writeFileSync(app.getPath("documents") + '/nytuolauncher_data/BetaAccess.txt', 'False');
            } else {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
            }
        }


    } else {
        if (process.platform == "linux") {
            Toastifycation("Your platform is not supported for the beta program, sorry")
        } else {
            fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'True');
        }

    }

}
/*turn on overlay
function turnonOverlay() {
    document.getElementById("overlay").style.display = "block";
}*/
/*turn off overlay
function turnoffOverlay() {
    document.getElementById("overlay").style.display = "none";
}*/
//write username from account to access in game
function gameUsername(username) {
    fs.writeFileSync(gamelocation + "/Games/Username.txt", username)
}
//write password for remember me
function passwordtxt(password) {
    fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/Password.txt", password)
}
//Games.html page style
//modify to add games
function detectgamepage() {
    if (process.platform == 'linux') {
        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
            document.getElementById("BG").className = "IMGBGSFO";
            document.getElementById("LOGOCARD").src = "Ressources/LogoSFO3.png";

            document.getElementById("NAME").innerHTML = "ShootFighter Origins";
            document.getElementById("NAME2").innerHTML = "ShootFighter Origins";
            document.getElementById("NAME3").innerHTML = "ShootFighter Origins";
            document.getElementById("NAME5").innerHTML = "ShootFighter Origins";
            document.getElementById("NAME4").innerHTML = "ShootFighter Origins";
            document.getElementById("DETECTION").onclick = detect('SFO', 'SFO_Version.txt', 'SFO_Version.txt', 'ShootFighter Origins', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5lPIMkf1DaNj0VMh62Q?e=mnXV9Y');
            //document.getElementById("ONLINEPLAY").onclick = 0;
            //document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "The online version is the same of the downloadable one.But the achievements system doesn't work.";
            document.getElementById("myBar").style.backgroundColor = "##cc3333";
            document.getElementById("BarAch").style.backgroundColor = "##cc3333";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            //  document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
            document.getElementById("BG").className = "IMGBGLAATIM";
            document.getElementById("LOGOCARD").src = "Ressources/LogoLAATIM2.png";

            document.getElementById("NAME").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("NAME2").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("NAME3").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("NAME4").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("NAME5").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("DETECTION").onclick = detectforWin('LAATIM', 'LAIM_Version.txt', 'LAIM_Version.txt', 'Legend Adventure And The Infernal Maze', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJJILZuBLOlDQFoPlg?e=Ufggq4');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#008C3F";
            document.getElementById("BarAch").style.backgroundColor = "#008C3F";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";

            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick= 0;
            //document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            document.getElementById("BG").className = "IMGBGSGB";
            document.getElementById("LOGOCARD").src = "Ressources/SGB3.png";

            document.getElementById("NAME").innerHTML = "Super Geoffrey Bros";
            document.getElementById("NAME2").innerHTML = "Super Geoffrey Bros";
            document.getElementById("NAME3").innerHTML = "Super Geoffrey Bros";
            document.getElementById("NAME5").innerHTML = "Super Geoffrey Bros";
            document.getElementById("NAME4").innerHTML = "Super Geoffrey Bros";
            document.getElementById("DETECTION").onclick = detect('SGB', 'SGB_Version.txt', 'SGB_Version.txt', 'Super Geoffrey Bros', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz');
            //document.getElementById("ONLINEPLAY").onclick = 0;
            //document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "The online version is the same of the downloadable one.But the achievements system doesn't work.";
            document.getElementById("myBar").style.backgroundColor = "#FBCF08";
            document.getElementById("BarAch").style.backgroundColor = "#FBCF08";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            //  document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            document.getElementById("BG").className = "IMGBGSF";
            document.getElementById("LOGOCARD").src = "Ressources/sflogo.png";

            document.getElementById("NAME").innerHTML = "ShootFighter";
            document.getElementById("NAME2").innerHTML = "ShootFighter";
            document.getElementById("NAME3").innerHTML = "ShootFighter";
            document.getElementById("NAME4").innerHTML = "ShootFighter";
            document.getElementById("NAME5").innerHTML = "ShootFighter";
            document.getElementById("DETECTION").onclick = detectforWin('SF', 'VersionSF.txt', 'SF_Version.txt', 'ShootFighter', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_I2LkrpytSs0dZC_g?e=ZLqh0N');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#D40A10";
            document.getElementById("BarAch").style.backgroundColor = "#D40A10";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            document.getElementById("BG").className = "IMGBGLA";
            document.getElementById("LOGOCARD").src = "Ressources/LA_logo.png";

            document.getElementById("NAME").innerHTML = "Lutin Adventure";
            document.getElementById("NAME2").innerHTML = "Lutin Adventure";
            document.getElementById("NAME3").innerHTML = "Lutin Adventure";
            document.getElementById("NAME4").innerHTML = "Lutin Adventure";
            document.getElementById("NAME5").innerHTML = "Lutin Adventure";
            document.getElementById("DETECTION").onclick = detectforWin('LA', 'VersionLA.txt', 'LA_Version.txt', 'Lutin Adventure', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IEdbfA3BO7-w0QVQ?e=EYQ7Ia');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#40C101";
            document.getElementById("BarAch").style.backgroundColor = "#40C101";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            document.getElementById("BG").className = "IMGBGVITF";
            document.getElementById("LOGOCARD").src = "Ressources/VITF_Logo.png";

            document.getElementById("NAME").innerHTML = "Vincent In The Forest";
            document.getElementById("NAME2").innerHTML = "Vincent In The Forest";
            document.getElementById("NAME3").innerHTML = "Vincent In The Forest";
            document.getElementById("NAME4").innerHTML = "Vincent In The Forest";
            document.getElementById("NAME5").innerHTML = "Vincent In The Forest";
            document.getElementById("DETECTION").onclick = detectforWin('VITF', 'VersionVITF.txt', 'VITF_Version.txt', 'Vincent In The Forest', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IFQre1HF__L6w5yg?e=oYcouq');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#05B311";
            document.getElementById("BarAch").style.backgroundColor = "#05B311";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            document.getElementById("BG").className = "IMGBGTTD";
            document.getElementById("LOGOCARD").src = "Ressources/LogoTTD.png";

            document.getElementById("NAME").innerHTML = "The TARDIS Defender";
            document.getElementById("NAME2").innerHTML = "The TARDIS Defender";
            document.getElementById("NAME3").innerHTML = "The TARDIS Defender";
            document.getElementById("NAME4").innerHTML = "The TARDIS Defender";
            document.getElementById("NAME5").innerHTML = "The TARDIS Defender";
            document.getElementById("DETECTION").onclick = detect('TTD', 'VersionTTD.txt', 'TTD_Version.txt', 'The tardis Defender', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IAVV80IqTrwqCkNg?e=xpAgxa');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#436B8C";
            document.getElementById("BarAch").style.backgroundColor = "#436B8C";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            // document.getElementById("SAVES").onclick = 0;
            //document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            document.getElementById("BG").className = "IMGBGFWD";
            document.getElementById("LOGOCARD").src = "Ressources/LogoFWD.png";

            document.getElementById("NAME").innerHTML = "FireWall Defender";
            document.getElementById("NAME5").innerHTML = "FireWall Defender";
            document.getElementById("NAME2").innerHTML = "FireWall Defender";
            document.getElementById("NAME3").innerHTML = "FireWall Defender";
            document.getElementById("NAME4").innerHTML = "FireWall Defender";
            document.getElementById("DETECTION").onclick = detect('FWD', 'VersionFWD.txt', 'FWD_Version.txt', 'FireWall Defender', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IBNSxQ8w8-2XAbHg?e=4R8VIa');
            //document.getElementById("ONLINEPLAY").onclick = 0;
            //document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            //document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#E77817";
            document.getElementById("BarAch").style.backgroundColor = "#E77817";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
            document.getElementById("BG").className = "IMGBGTB";
            document.getElementById("LOGOCARD").src = "Ressources/tbvertLogo.png";

            document.getElementById("NAME").innerHTML = "TanksBattle";
            document.getElementById("NAME2").innerHTML = "TanksBattle";
            document.getElementById("NAME3").innerHTML = "TanksBattle";
            document.getElementById("NAME5").innerHTML = "TanksBattle";
            document.getElementById("NAME4").innerHTML = "TanksBattle";
            document.getElementById("DETECTION").onclick = detect('TB', 'VersionTB.txt', 'TB_Version.txt', 'TanksBattle', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_ICTWGXUK_2YQehdA?e=UPND7O');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#229ACA";
            document.getElementById("BarAch").style.backgroundColor = "#229ACA";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
            document.getElementById("BG").className = "IMGBGWR";
            document.getElementById("LOGOCARD").src = "Ressources/LogoWR.png";

            document.getElementById("NAME").innerHTML = "WinRun";
            document.getElementById("NAME2").innerHTML = "WinRun";
            document.getElementById("NAME3").innerHTML = "WinRun";
            document.getElementById("NAME5").innerHTML = "WinRun";
            document.getElementById("NAME4").innerHTML = "WinRun";
            document.getElementById("DETECTION").onclick = detect('WR', 'VersionWR.txt', 'WR_Version.txt', 'WinRun', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IDSJXSfRyN7MIoTQ?e=AWDWCb');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "rgb(177, 89, 31)";
            document.getElementById("BarAch").style.backgroundColor = "rgb(177, 89, 31)";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
            document.getElementById("BG").className = "IMGBGAE";
            document.getElementById("LOGOCARD").src = "Ressources/AELogo.png";

            document.getElementById("NAME").innerHTML = "Asteroid Escape";
            document.getElementById("NAME2").innerHTML = "Asteroid Escape";
            document.getElementById("NAME3").innerHTML = "Asteroid Escape";
            document.getElementById("NAME4").innerHTML = "Asteroid Escape";
            document.getElementById("NAME5").innerHTML = "Asteroid Escape";
            document.getElementById("DETECTION").onclick = detectforWin('AE', 'VersionAE.txt', 'AE_Version.txt', 'AsteroidEscape', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_F4DvrGjsHHLDrp1Q?e=pPapa9');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#57B3B8";
            document.getElementById("BarAch").style.backgroundColor = "#57B3B8";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            document.getElementById("BG").className = "IMGBGSN";
            document.getElementById("LOGOCARD").src = "Ressources/LogoSNRE.png";

            document.getElementById("NAME").innerHTML = "SansNom Réédition";
            document.getElementById("NAME2").innerHTML = "SansNom Réédition";
            document.getElementById("NAME3").innerHTML = "SansNom Réédition";
            document.getElementById("NAME4").innerHTML = "SansNom Réédition";
            document.getElementById("NAME5").innerHTML = "SansNom Réédition";
            document.getElementById("DETECTION").onclick = detect('SNRE', 'SNRE_Version.txt', 'SNRE_Version.txt', 'Sans Nom Réédition', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpghoWFNZQhB7ByHQ?e=i6gk1D');
            //document.getElementById("ONLINEPLAY").onclick = 0;
            //document.getElementById("ONLINEPLAY").innerHTML = "";
            //document.getElementById("SNCLASSIC").onclick = 0;
            //document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#6FC4A9";
            document.getElementById("BarAch").style.backgroundColor = "#6FC4A9";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //  document.getElementById("SAVES").onclick = 0;
            // document.getElementById("SAVES").innerHTML = "";
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            document.getElementById("BG").className = "IMGBGSFO";
            document.getElementById("LOGOCARD").src = "Ressources/LogoSFO3.png";
            document.getElementById("NAME").innerHTML = "ShootFighter Origins";
            document.getElementById("NAME2").innerHTML = "ShootFighter Origins";
            document.getElementById("NAME3").innerHTML = "ShootFighter Origins";
            document.getElementById("NAME4").innerHTML = "ShootFighter Origins";
            document.getElementById("NAME5").innerHTML = "ShootFighter Origins";
            document.getElementById("DETECTION").onclick = detectforWin('SFO', 'SFO_Version.txt', 'SFO_Version.txt', 'ShootFighter Origins', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5lPIJaHJQw8Hrb2WJGw?e=V2zzhu');
            //document.getElementById("ONLINEPLAY").onclick = 0;
            //document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#cc3333";
            document.getElementById("BarAch").style.backgroundColor = "#cc3333";
            document.getElementById("BarAch").style.color = "black";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick= 0;
            //document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            document.getElementById("BG").className = "IMGBGLAATIM";
            document.getElementById("LOGOCARD").src = "Ressources/LogoLAATIM2.png";
            document.getElementById("NAME").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("NAME2").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("NAME3").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("NAME4").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("NAME5").innerHTML = "Legend Adventure And The Infernal Maze";
            document.getElementById("DETECTION").onclick = detectforWin('LAATIM', 'LAIM_Version.txt', 'LAIM_Version.txt', 'Legend Adventure And The Infernal Maze', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJJILZuBLOlDQFoPlg?e=Ufggq4');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#008C3F";
            document.getElementById("BarAch").style.backgroundColor = "#008C3F";
            document.getElementById("BarAch").style.color = "black";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick= 0;
            //document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            document.getElementById("BG").className = "IMGBGSGB";
            document.getElementById("LOGOCARD").src = "Ressources/SGB3.png";
            document.getElementById("NAME").innerHTML = "Super Geoffrey Bros";
            document.getElementById("NAME2").innerHTML = "Super Geoffrey Bros";
            document.getElementById("NAME3").innerHTML = "Super Geoffrey Bros";
            document.getElementById("NAME5").innerHTML = "Super Geoffrey Bros";
            document.getElementById("NAME4").innerHTML = "Super Geoffrey Bros";
            document.getElementById("DETECTION").onclick = detect('SGB', 'SGB_Version.txt', 'SGB_Version.txt', 'Super Geoffrey Bros', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz');
            //document.getElementById("ONLINEPLAY").onclick = 0;
            //document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "The online version is the same of the downloadable one.But the achievements system doesn't work.";
            document.getElementById("myBar").style.backgroundColor = "#FBCF08";
            document.getElementById("BarAch").style.backgroundColor = "#FBCF08";
            document.getElementById("BarAch").style.color = "black";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //  document.getElementById("SAVES").onclick = 0;
            // document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            document.getElementById("BG").className = "IMGBGSF";
            document.getElementById("LOGOCARD").src = "Ressources/sflogo.png";

            document.getElementById("NAME").innerHTML = "ShootFighter";
            document.getElementById("NAME2").innerHTML = "ShootFighter";
            document.getElementById("NAME3").innerHTML = "ShootFighter";
            document.getElementById("NAME4").innerHTML = "ShootFighter";
            document.getElementById("NAME5").innerHTML = "ShootFighter";
            document.getElementById("DETECTION").onclick = detectforWin('SF', 'VersionSF.txt', 'SF_Version.txt', 'ShootFighter', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_I2LkrpytSs0dZC_g?e=ZLqh0N');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#D40A10";
            document.getElementById("BarAch").style.backgroundColor = "#D40A10";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            document.getElementById("BG").className = "IMGBGLA";
            document.getElementById("LOGOCARD").src = "Ressources/LA_logo.png";

            document.getElementById("NAME").innerHTML = "Lutin Adventure";
            document.getElementById("NAME2").innerHTML = "Lutin Adventure";
            document.getElementById("NAME3").innerHTML = "Lutin Adventure";
            document.getElementById("NAME4").innerHTML = "Lutin Adventure";
            document.getElementById("NAME5").innerHTML = "Lutin Adventure";
            document.getElementById("DETECTION").onclick = detectforWin('LA', 'VersionLA.txt', 'LA_Version.txt', 'Lutin Adventure', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IEdbfA3BO7-w0QVQ?e=EYQ7Ia');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#40C101";
            document.getElementById("BarAch").style.backgroundColor = "#40C101";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            document.getElementById("BG").className = "IMGBGVITF";
            document.getElementById("LOGOCARD").src = "Ressources/VITF_Logo.png";

            document.getElementById("NAME").innerHTML = "Vincent In The Forest";
            document.getElementById("NAME2").innerHTML = "Vincent In The Forest";
            document.getElementById("NAME3").innerHTML = "Vincent In The Forest";
            document.getElementById("NAME4").innerHTML = "Vincent In The Forest";
            document.getElementById("NAME5").innerHTML = "Vincent In The Forest";
            document.getElementById("DETECTION").onclick = detectforWin('VITF', 'VersionVITF.txt', 'VITF_Version.txt', 'Vincent In The Forest', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IFQre1HF__L6w5yg?e=oYcouq');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#05B311";
            document.getElementById("BarAch").style.backgroundColor = "#05B311";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            document.getElementById("BG").className = "IMGBGTTD";
            document.getElementById("LOGOCARD").src = "Ressources/LogoTTD.png";

            document.getElementById("NAME").innerHTML = "The TARDIS Defender";
            document.getElementById("NAME2").innerHTML = "The TARDIS Defender";
            document.getElementById("NAME3").innerHTML = "The TARDIS Defender";
            document.getElementById("NAME4").innerHTML = "The TARDIS Defender";
            document.getElementById("NAME5").innerHTML = "The TARDIS Defender";
            document.getElementById("DETECTION").onclick = detect('TTD', 'VersionTTD.txt', 'TTD_Version.txt', 'The tardis Defender', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IAVV80IqTrwqCkNg?e=xpAgxa');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#436B8C";
            document.getElementById("BarAch").style.backgroundColor = "#436B8C";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            //    document.getElementById("SAVES").onclick = 0;
            //    document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            document.getElementById("BG").className = "IMGBGFWD";
            document.getElementById("LOGOCARD").src = "Ressources/LogoFWD.png";

            document.getElementById("NAME").innerHTML = "FireWall Defender";
            document.getElementById("NAME5").innerHTML = "FireWall Defender";
            document.getElementById("NAME2").innerHTML = "FireWall Defender";
            document.getElementById("NAME3").innerHTML = "FireWall Defender";
            document.getElementById("NAME4").innerHTML = "FireWall Defender";
            document.getElementById("DETECTION").onclick = detect('FWD', 'VersionFWD.txt', 'FWD_Version.txt', 'FireWall Defender', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IBNSxQ8w8-2XAbHg?e=4R8VIa');
            //document.getElementById("ONLINEPLAY").onclick = 0;
            //document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            //document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#E77817";
            document.getElementById("BarAch").style.backgroundColor = "#E77817";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            document.getElementById("BG").className = "IMGBGTB";
            document.getElementById("LOGOCARD").src = "Ressources/tbvertLogo.png";

            document.getElementById("NAME").innerHTML = "TanksBattle";
            document.getElementById("NAME2").innerHTML = "TanksBattle";
            document.getElementById("NAME3").innerHTML = "TanksBattle";
            document.getElementById("NAME5").innerHTML = "TanksBattle";
            document.getElementById("NAME4").innerHTML = "TanksBattle";
            document.getElementById("DETECTION").onclick = detect('TB', 'VersionTB.txt', 'TB_Version.txt', 'TanksBattle', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_ICTWGXUK_2YQehdA?e=UPND7O');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#229ACA";
            document.getElementById("BarAch").style.backgroundColor = "#229ACA";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            document.getElementById("BG").className = "IMGBGWR";
            document.getElementById("LOGOCARD").src = "Ressources/LogoWR.png";

            document.getElementById("NAME").innerHTML = "WinRun";
            document.getElementById("NAME2").innerHTML = "WinRun";
            document.getElementById("NAME3").innerHTML = "WinRun";
            document.getElementById("NAME5").innerHTML = "WinRun";
            document.getElementById("NAME4").innerHTML = "WinRun";
            document.getElementById("DETECTION").onclick = detect('WR', 'VersionWR.txt', 'WR_Version.txt', 'WinRun', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IDSJXSfRyN7MIoTQ?e=AWDWCb');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "rgb(177, 89, 31)";
            document.getElementById("BarAch").style.backgroundColor = "rgb(177, 89, 31)";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            document.getElementById("BG").className = "IMGBGAE";
            document.getElementById("LOGOCARD").src = "Ressources/AELogo.png";

            document.getElementById("NAME").innerHTML = "Asteroid Escape";
            document.getElementById("NAME2").innerHTML = "Asteroid Escape";
            document.getElementById("NAME3").innerHTML = "Asteroid Escape";
            document.getElementById("NAME4").innerHTML = "Asteroid Escape";
            document.getElementById("NAME5").innerHTML = "Asteroid Escape";
            document.getElementById("DETECTION").onclick = detectforWin('AE', 'VersionAE.txt', 'AE_Version.txt', 'AsteroidEscape', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_F4DvrGjsHHLDrp1Q?e=pPapa9');
            document.getElementById("ONLINEPLAY").onclick = 0;
            document.getElementById("ONLINEPLAY").innerHTML = "";
            document.getElementById("SNCLASSIC").onclick = 0;
            document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#57B3B8";
            document.getElementById("BarAch").style.backgroundColor = "#57B3B8";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("button2").onclick = 0;
            document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";

            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            document.getElementById("BG").className = "IMGBGSN";
            document.getElementById("LOGOCARD").src = "Ressources/LogoSNRE.png";

            document.getElementById("NAME").innerHTML = "SansNom Réédition";
            document.getElementById("NAME2").innerHTML = "SansNom Réédition";
            document.getElementById("NAME3").innerHTML = "SansNom Réédition";
            document.getElementById("NAME4").innerHTML = "SansNom Réédition";
            document.getElementById("NAME5").innerHTML = "SansNom Réédition";
            document.getElementById("DETECTION").onclick = detect('SNRE', 'SNRE_Version.txt', 'SNRE_Version.txt', 'Sans Nom Réédition', 'versiontxt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpghoWFNZQhB7ByHQ?e=i6gk1D');
            //document.getElementById("ONLINEPLAY").onclick = 0;
            //document.getElementById("ONLINEPLAY").innerHTML = "";
            //document.getElementById("SNCLASSIC").onclick = 0;
            //document.getElementById("SNCLASSIC").innerHTML = "";
            document.getElementById("GAMEJOLT").innerHTML = "";
            document.getElementById("myBar").style.backgroundColor = "#6FC4A9";
            document.getElementById("BarAch").style.backgroundColor = "#6FC4A9";
            document.getElementById("BarAch").style.color = "black";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //  document.getElementById("SAVES").onclick = 0;
            //  document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
        }
    }

}
//detect witch folder to delete
//modify to add games
function DELETE_DETECT() {
    if (process.platform == 'linux') {
        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
            deletefolder(gamelocation + '/Games/SFO');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
            deletefolder(gamelocation + '/Games/LAATIM');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            deletefolder(gamelocation + '/Games/SGB');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            deletefolder(gamelocation + '/Games/SF');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            deletefolder(gamelocation + '/Games/LA');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            deletefolder(gamelocation + '/Games/VITF');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            deletefolder(gamelocation + '/Games/TTD');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            deletefolder(gamelocation + '/Games/FWD');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
            deletefolder(gamelocation + '/Games/TB');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
            deletefolder(gamelocation + '/Games/WR');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
            deletefolder(gamelocation + '/Games/AE');
        } if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            deletefolder(gamelocation + '/Games/SNRE');
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            deletefolder(gamelocation + '/Games/SFO');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            deletefolder(gamelocation + '/Games/LAATIM');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            deletefolder(gamelocation + '/Games/SGB');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            deletefolder(gamelocation + '/Games/SF');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            deletefolder(gamelocation + '/Games/LA');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            deletefolder(gamelocation + '/Games/VITF');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            deletefolder(gamelocation + '/Games/TTD');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            deletefolder(gamelocation + '/Games/FWD');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            deletefolder(gamelocation + '/Games/TB');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            deletefolder(gamelocation + '/Games/WR');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            deletefolder(gamelocation + '/Games/AE');
        } if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            deletefolder(gamelocation + '/Games/SNRE');
        }
    }

}
//select repair link by games
//modify to add games
function REINSTALL_DETECT() {
    document.getElementById("pgrs").style.display = "block"
    document.getElementById('downloadbtn').classList.add("disabled")
    document.getElementById("DLTEXT").innerHTML = "Deleting..."
    document.getElementById("resultofcalculsize").innerHTML = "We are removing the game..."
    if (process.platform == "linux") {
        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {


            repair('https://1drv.ws/u/s!AkkqGntQc7Y5lPIJaHJQw8Hrb2WJGw?e=V2zzhu', 'SFO', 'SFO.zip', "https://1drv.ws/u/s!AkkqGntQc7Y5lPIMkf1DaNj0VMh62Q?e=mnXV9Y");
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {

            repair('https://1drv.ws/u/s!AkkqGntQc7Y5hJJILZuBLOlDQFoPlg?e=Ufggq4', 'LAATIM', 'LA_IM.zip');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz', 'SGB', 'SGB.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJoopV-SOJfhLYFSvA?e=9JoMti', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJopCrrDVVHteOUoaw?e=pbdjt4');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_I2LkrpytSs0dZC_g?e=ZLqh0N', 'SF', 'SF.zip');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IEdbfA3BO7-w0QVQ?e=EYQ7Ia', 'LA', 'LA.zip');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IFQre1HF__L6w5yg?e=oYcouq', 'VITF', 'VITF.zip');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IAVV80IqTrwqCkNg?e=xpAgxa', 'TTD', 'TTD.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpYqu8b1UTHQ3r2cg?e=F2btID', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpXK3f2XSnNaHCR5g?e=jlmCPJ');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IBNSxQ8w8-2XAbHg?e=4R8VIa', 'FWD', 'FWD.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpa5YZLYYEr6VruMA?e=T43KmO', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpZLNWZwQFfddbrTA?e=P3On9n');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_ICTWGXUK_2YQehdA?e=UPND7O', 'TB', 'TB.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpc_C0cQOMw2-rB5A?e=nYayYu', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpbqpPrgdoUixV9eg?e=0B0D9b');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IDSJXSfRyN7MIoTQ?e=AWDWCb', 'WR', 'WR.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpdvEcr9t-HvCUPxQ?e=b7WMTS', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpedkoCDNmk_dOacQ?e=4rKaDy');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_F4DvrGjsHHLDrp1Q?e=pPapa9', 'AE', 'AE.zip');
        } if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5hJpghoWFNZQhB7ByHQ?e=i6gk1D', 'SNRE', 'SN.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpie9qVRQt7SeDbPA?e=CovaHD', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJphlk_l4IVAusN0Xg?e=aagdu7');
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {

            repair('https://1drv.ws/u/s!AkkqGntQc7Y5hJJILZuBLOlDQFoPlg?e=Ufggq4', 'LAATIM', 'LA_IM.zip');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz', 'SGB', 'SGB.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJoopV-SOJfhLYFSvA?e=9JoMti', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJopCrrDVVHteOUoaw?e=pbdjt4');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5lPIJaHJQw8Hrb2WJGw?e=V2zzhu', 'SFO', 'SFO.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5lPIMkf1DaNj0VMh62Q?e=mnXV9Y');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_I2LkrpytSs0dZC_g?e=ZLqh0N', 'SF', 'SF.zip');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IEdbfA3BO7-w0QVQ?e=EYQ7Ia', 'LA', 'LA.zip');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IFQre1HF__L6w5yg?e=oYcouq', 'VITF', 'VITF.zip');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IAVV80IqTrwqCkNg?e=xpAgxa', 'TTD', 'TTD.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpYqu8b1UTHQ3r2cg?e=F2btID', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpXK3f2XSnNaHCR5g?e=jlmCPJ');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IBNSxQ8w8-2XAbHg?e=4R8VIa', 'FWD', 'FWD.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpa5YZLYYEr6VruMA?e=T43KmO', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpZLNWZwQFfddbrTA?e=P3On9n');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_ICTWGXUK_2YQehdA?e=UPND7O', 'TB', 'TB.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpc_C0cQOMw2-rB5A?e=nYayYu', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpbqpPrgdoUixV9eg?e=0B0D9b');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_IDSJXSfRyN7MIoTQ?e=AWDWCb', 'WR', 'WR.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpdvEcr9t-HvCUPxQ?e=b7WMTS', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpedkoCDNmk_dOacQ?e=4rKaDy');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5g_F4DvrGjsHHLDrp1Q?e=pPapa9', 'AE', 'AE.zip');
        } if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            repair('https://1drv.ws/u/s!AkkqGntQc7Y5hJpghoWFNZQhB7ByHQ?e=i6gk1D', 'SNRE', 'SN.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpie9qVRQt7SeDbPA?e=CovaHD', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJphlk_l4IVAusN0Xg?e=aagdu7');
        }
    }

}
//set online link by games (if available)
//modify to add games who work online
function ONLINE_LINK_DETECT() {
    if (process.platform == "linux") {
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            RunWithoutInstall('https://itch.io/embed-upload/1461064?color=303030')
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            RunWithoutInstall('https://gamejolt.com/games/FirewallDefender/323970');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            RunWithoutInstall('https://itch.io/embed-upload/1889077?color=303030');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
            RunWithoutInstall('https://itch.io/embed-upload/2669133?color=212121');
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            RunWithoutInstall('https://itch.io/embed-upload/1461064?color=303030')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            RunWithoutInstall('https://gamejolt.com/games/FirewallDefender/323970');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            RunWithoutInstall('https://itch.io/embed-upload/1889077?color=303030');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            RunWithoutInstall('https://itch.io/embed-upload/2669133?color=212121');
        }
    }

}
//Open emplacement by games
//modify to add games
function OPEN_GAMELOC_DETECT() {
    if (process.platform == "linux") {
        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
            OpenEmpl(gamelocation + '/Games/SFO/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
            OpenEmpl(gamelocation + '/Games/LAATIM/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            OpenEmpl(gamelocation + '/Games/SGB/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            OpenEmpl(gamelocation + '/Games/SF/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            OpenEmpl(gamelocation + '/Games/LA/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            OpenEmpl(gamelocation + '/Games/VITF/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            OpenEmpl(gamelocation + '/Games/TTD/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            OpenEmpl(gamelocation + '/Games/FWD/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
            OpenEmpl(gamelocation + '/Games/TB/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
            OpenEmpl(gamelocation + '/Games/WR/');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
            OpenEmpl(gamelocation + '/Games/AE/');
        } if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            OpenEmpl(gamelocation + '/Games/SNRE/');
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            OpenEmpl(gamelocation + '/Games/SFO/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            OpenEmpl(gamelocation + '/Games/LAATIM/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            OpenEmpl(gamelocation + '/Games/SGB/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            OpenEmpl(gamelocation + '/Games/SF/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            OpenEmpl(gamelocation + '/Games/LA/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            OpenEmpl(gamelocation + '/Games/VITF/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            OpenEmpl(gamelocation + '/Games/TTD/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            OpenEmpl(gamelocation + '/Games/FWD/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            OpenEmpl(gamelocation + '/Games/TB/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            OpenEmpl(gamelocation + '/Games/WR/');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            OpenEmpl(gamelocation + '/Games/AE/');
        } if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            OpenEmpl(gamelocation + '/Games/SNRE/');
        }
    }

}
//shortcut by games
//modify to add games
function SHORTCUT_DETECT() {
    if (process.platform == "linux") {
        Toastifycation("This is not available for your platform : Linux")
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            createlink('SFO', require('path').join(require('os').homedir(), 'Desktop/ShootFighter Origins.lnk'), "Launch ShootFighter Origins", __dirname + '/Ressources/LogoSFO.ico')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            createlink('LAATIM', require('path').join(require('os').homedir(), 'Desktop/Legend Adventure and the Infernal Maze.lnk'), "Launch Legend Adventure and the Infernal Maze", __dirname + '/Ressources/LAATIM.ico')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            createlink("SGB", require('path').join(require('os').homedir(), 'Desktop/Super Geoffrey Bros.lnk'), "Launch Super Geoffrey Bros", __dirname + "/Ressources/SGB.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            createlink("SF", require('path').join(require('os').homedir(), 'Desktop/Shootfighter.lnk'), "Launch ShootFighter", __dirname + "/Ressources/SF.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            createlink("LA", require('path').join(require('os').homedir(), 'Desktop/Lutin Adventure.lnk'), "Launch Lutin Adventure", __dirname + "/Ressources/LA.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            createlink("VITF", require('path').join(require('os').homedir(), 'Desktop/Vincent In The Forest.lnk'), "Launch Vincent In The Forest", __dirname + "/Ressources/VITF.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            createlink("TTD", require('path').join(require('os').homedir(), 'Desktop/The Tardis Defender.lnk'), "Launch The Tardis Defender", __dirname + "/Ressources/TTD.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            createlink("FWD", require('path').join(require('os').homedir(), 'Desktop/FireWall Defender.lnk'), "Launch FireWall Defender", __dirname + "/Ressources/FWD.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            createlink("TB", require('path').join(require('os').homedir(), 'Desktop/TanksBattle.lnk'), "Launch TanksBattle", __dirname + "/Ressources/TB.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            createlink("WR", require('path').join(require('os').homedir(), 'Desktop/WinRun.lnk'), "Launch WinRun", __dirname + "/Ressources/WR.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            createlink("AE", require('path').join(require('os').homedir(), 'Desktop/Asteroid Escape.lnk'), "Launch AsteroidEscape", __dirname + "/Ressources/AE.ico")
        } if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            createlink("SNRE", require('path').join(require('os').homedir(), 'Desktop/Sans Nom Rééditon.lnk'), "Launch SansNom Réédition", __dirname + "/Ressources/SNRE.ico")
        }
    }


}
//execute by games actions
//modify to add games
function WHATTODO_DETECT() {
    document.getElementById("pgrs").style.display = 'block'
    document.getElementById("downloadbtn").classList.add("disabled");
    if (process.platform == "linux") {

        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
            Do('SFO', 'SFO_Version.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5lPIJaHJQw8Hrb2WJGw?e=V2zzhu', 'SFO.zip', 'SFO_Version.txt', 'nw.exe', 'ShootFighter Origins', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5lPIMkf1DaNj0VMh62Q?e=mnXV9Y');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
            Toastifycation("The game is not available on this platform")
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            Do('SGB', 'SGB_Version.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz', 'SGB.zip', 'SGB_Version.txt', 'nw.exe', 'Super Geoffrey Bros', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJoopV-SOJfhLYFSvA?e=9JoMti', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJopCrrDVVHteOUoaw?e=pbdjt4');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            Toastifycation("The game is not available on this platform")
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            Toastifycation("The game is not available on this platform")
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            Toastifycation("The game is not available on this platform")
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            Do('TTD', 'VersionTTD.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IAVV80IqTrwqCkNg?e=xpAgxa', 'TTD.zip', 'TTD_Version.txt', 'nw.exe', 'The tardis Defender', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpYqu8b1UTHQ3r2cg?e=F2btID', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpXK3f2XSnNaHCR5g?e=jlmCPJ');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            Do('SNRE', 'SNRE_Version.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpghoWFNZQhB7ByHQ?e=i6gk1D', 'SN.zip', 'SNRE_Version.txt', 'nw.exe', 'Sans Nom : Réédition', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpie9qVRQt7SeDbPA?e=CovaHD', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJphlk_l4IVAusN0Xg?e=aagdu7');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            Do('FWD', 'VersionFWD.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IBNSxQ8w8-2XAbHg?e=4R8VIa', 'FWD.zip', 'FWD_Version.txt', 'nw.exe', 'FireWall Defender', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpa5YZLYYEr6VruMA?e=T43KmO', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpZLNWZwQFfddbrTA?e=P3On9n');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
            Do('TB', 'VersionTB.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_ICTWGXUK_2YQehdA?e=UPND7O', 'TB.zip', 'TB_Version.txt', 'nw.exe', 'TanksBattle', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpc_C0cQOMw2-rB5A?e=nYayYu', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpbqpPrgdoUixV9eg?e=0B0D9b');

        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
            Do('WR', 'VersionWR.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IDSJXSfRyN7MIoTQ?e=AWDWCb', 'WR.zip', 'WR_Version.txt', 'nw.exe', 'WinRun', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpdvEcr9t-HvCUPxQ?e=b7WMTS', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpedkoCDNmk_dOacQ?e=4rKaDy');

        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
            Toastifycation("The game is not available on this platform")
        }

    } else {


        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            DoforWin('LAATIM', 'LAIM_Version.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJJILZuBLOlDQFoPlg?e=Ufggq4', 'LA_IM.zip', 'LAIM_Version.txt', 'LA_IM.exe', 'Legend Adventure and the Infernal Maze');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            Do('SFO', 'SFO_Version.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5lPIJaHJQw8Hrb2WJGw?e=V2zzhu', 'SFO.zip', 'SFO_Version.txt', 'nw.exe', 'ShootFighter Origins', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5lPIMkf1DaNj0VMh62Q?e=mnXV9Y');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            Do('SGB', 'SGB_Version.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz', 'SGB.zip', 'SGB_Version.txt', 'nw.exe', 'Super Geoffrey Bros', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJoopV-SOJfhLYFSvA?e=9JoMti', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJopCrrDVVHteOUoaw?e=pbdjt4');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            DoforWin('SF', 'VersionSF.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_I2LkrpytSs0dZC_g?e=ZLqh0N', 'SF.zip', 'SF_Version.txt', 'ShootFighter.exe', 'Shoot Fighter');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            DoforWin('LA', 'VersionLA.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IEdbfA3BO7-w0QVQ?e=EYQ7Ia', 'LA.zip', 'LA_Version.txt', 'Lutin_Adventure.exe', 'Lutin Adventure');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            DoforWin('VITF', 'VersionVITF.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IFQre1HF__L6w5yg?e=oYcouq', 'VITF.zip', 'VITF_Version.txt', 'VincentInTheForest.exe', 'Vincent In The Forest');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            Do('TTD', 'VersionTTD.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IAVV80IqTrwqCkNg?e=xpAgxa', 'TTD.zip', 'TTD_Version.txt', 'nw.exe', 'The tardis Defender', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpYqu8b1UTHQ3r2cg?e=F2btID', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpXK3f2XSnNaHCR5g?e=jlmCPJ');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            Do('SNRE', 'SNRE_Version.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpghoWFNZQhB7ByHQ?e=i6gk1D', 'SN.zip', 'SNRE_Version.txt', 'nw.exe', 'Sans Nom : Réédition', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpie9qVRQt7SeDbPA?e=CovaHD', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJphlk_l4IVAusN0Xg?e=aagdu7');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            Do('FWD', 'VersionFWD.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IBNSxQ8w8-2XAbHg?e=4R8VIa', 'FWD.zip', 'FWD_Version.txt', 'nw.exe', 'FireWall Defender', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpa5YZLYYEr6VruMA?e=T43KmO', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpZLNWZwQFfddbrTA?e=P3On9n');
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            Do('TB', 'VersionTB.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_ICTWGXUK_2YQehdA?e=UPND7O', 'TB.zip', 'TB_Version.txt', 'nw.exe', 'TanksBattle', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpc_C0cQOMw2-rB5A?e=nYayYu', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpbqpPrgdoUixV9eg?e=0B0D9b');

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            Do('WR', 'VersionWR.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_IDSJXSfRyN7MIoTQ?e=AWDWCb', 'WR.zip', 'WR_Version.txt', 'nw.exe', 'WinRun', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpdvEcr9t-HvCUPxQ?e=b7WMTS', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpedkoCDNmk_dOacQ?e=4rKaDy');

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            DoforWin('AE', 'VersionAE.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5g_F4DvrGjsHHLDrp1Q?e=pPapa9', 'AE.zip', 'AE_Version.txt', 'AsteroidEscapeWinV1FinalPatch1.exe', 'AsteroidEscape');
        }
    }

}
//saves by games
//modify to add games
function OPEN_GAMESAVE() {
    if (process.platform == "linux") {
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
            alert("No available on this platform...")
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            OpenEmpl(homedir + '/SuperGeoffreyBros/User Data/')
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
            OpenEmpl(homedir + '/ShootFighterOrigins/User Data/')
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            OpenEmpl(homedir + '/TheTardisDefender/User Data/')
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            OpenEmpl(homedir + '/SansNomReedition/User Data/')
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            OpenEmpl(homedir + '/AppData/Local/LA_IM/Saved/SaveGames/')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            OpenEmpl(homedir + '/AppData/Local/SuperGeoffreyBros/User Data/')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            OpenEmpl(homedir + '/AppData/Local/ShootFighterOrigins/User Data/')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            OpenEmpl(homedir + '/AppData/Local/TheTardisDefender/User Data/')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            OpenEmpl(homedir + '/AppData/Local/SansNomReedition/User Data/')
        }
    }

}
//check manifest by game 
//modify to add games
function REPAIR_DETECT() {
    document.getElementById("pgrs").style.display = "block"
    document.getElementById('downloadbtn').classList.add("disabled")
    document.getElementById("DLTEXT").innerHTML = "Checking..."
    document.getElementById("resultofcalculsize").innerHTML = "We are checking the game files..."
    if (process.platform == "linux") {
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
            MANIFEST("LAATIM", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMLop9BFbFjQhVpNw?e=KU3c67", "");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
            MANIFEST("SFO", "https://1drv.ws/t/s!AkkqGntQc7Y5lPIK_zGx_kfkA8569g?e=5ckcSQ", "https://1drv.ws/t/s!AkkqGntQc7Y5lPILhJmXjvQMG74hng?e=dv0NEE");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            MANIFEST("SGB", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMYBHbsa5ePOgYigw?e=aJKqBp", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMZfv6_Jl3FK5nVAQ?e=wnKQvb");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            MANIFEST("SF", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMUmwvmdb9g2RrMQA?e=mcufGS", "");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            MANIFEST("LA", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMMC8O94dNl4WMRdQ?e=KBsTyb", "");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            MANIFEST("VITF", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMV2s--dp3uhzwj1g?e=rxqmWc", "");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            MANIFEST("TTD", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMWubV37rm19zRPfg?e=MNhglm", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMXODfbhZ1TWXNRhQ?e=tvbccu");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            MANIFEST("SNRE", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMNRM1nqxBQLCV_sA?e=q1iZXG", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMOdDbgYEYHbEe-eQ?e=GVUoOg");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            MANIFEST("FWD", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMJiX8ota-whvycjw?e=kdNK30", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMPVkX9ewA0NMPTWA?e=TN36WT");//check
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
            MANIFEST("TB", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMSB_w7Aw5cycFT8Q?e=ZNS9TZ", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMTWFqo7ym6LB7y-w?e=Zqpmeq");//check

        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
            MANIFEST("WR", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMQjp86jd0g24s8QQ?e=A6erp6", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMRJix-OKppfQQPNg?e=QETro3");//check

        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
            MANIFEST("AE", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMI0WXMA3l57t02DA?e=kchURe", "");//check
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            MANIFEST("LAATIM", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMLop9BFbFjQhVpNw?e=KU3c67", "");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            MANIFEST("SGB", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMYBHbsa5ePOgYigw?e=aJKqBp", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMZfv6_Jl3FK5nVAQ?e=wnKQvb");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            MANIFEST("SFO", "https://1drv.ws/t/s!AkkqGntQc7Y5lPIK_zGx_kfkA8569g?e=5ckcSQ", "https://1drv.ws/t/s!AkkqGntQc7Y5lPILhJmXjvQMG74hng?e=dv0NEE");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            MANIFEST("SF", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMUmwvmdb9g2RrMQA?e=mcufGS", "");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            MANIFEST("LA", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMMC8O94dNl4WMRdQ?e=KBsTyb", "");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            MANIFEST("VITF", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMV2s--dp3uhzwj1g?e=rxqmWc", "");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            MANIFEST("TTD", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMWubV37rm19zRPfg?e=MNhglm", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMXODfbhZ1TWXNRhQ?e=tvbccu");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            MANIFEST("SNRE", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMNRM1nqxBQLCV_sA?e=q1iZXG", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMOdDbgYEYHbEe-eQ?e=GVUoOg");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            MANIFEST("FWD", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMJiX8ota-whvycjw?e=kdNK30", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMPVkX9ewA0NMPTWA?e=TN36WT");//check
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            MANIFEST("TB", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMSB_w7Aw5cycFT8Q?e=ZNS9TZ", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMTWFqo7ym6LB7y-w?e=Zqpmeq");//check

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            MANIFEST("WR", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMQjp86jd0g24s8QQ?e=A6erp6", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMRJix-OKppfQQPNg?e=QETro3");//check

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            MANIFEST("AE", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMI0WXMA3l57t02DA?e=kchURe", "");//check
        }
    }


}
function MANIFEST_GENERATOR(dossiertomanifest) {
    const getAllFiles = function (dirPath, arrayOfFiles) {
        files = fs.readdirSync(dirPath)


        arrayOfFiles = arrayOfFiles || []
        var BlackList = ["AchDone.txt"]

        files.forEach(function (file) {
            if (BlackList.includes(file) == false) {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
                } else {

                    arrayOfFiles.push(file + " " + fs.statSync(dirPath + "/" + file).size)
                }
            } else {
                console.log("The file : " + file + " is in the BlackList and is not write into the manifest!")
                console.log(file + " is in : '" + BlackList.toString() + "'")
            }

        })
        return arrayOfFiles;

    }

    var output = getAllFiles(dossiertomanifest).toString();
    //output = output.replace(/-/g, "")
    //output = output.replace(/\./g, "")
    //output = output.replace(/_/g, "")
    output = output.split(",")

    output = output.sort()
    output = output.toString().replace(/,/g, "")

    if (portable == true) {
        if (process.platform == "linux") {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/Manifest_temp.txt", output, "utf-8");
        } else {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/Manifest_temp.txt", output, "utf-8");
        }
    } else {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Manifest_temp.txt", output, "utf-8");
        } else {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/Manifest_temp.txt", output, "utf-8");
        }
    }


}
//get manifest of the game in onedrive and download it, compare for difference and choose if re-install the game or pass throw.
function MANIFEST(GameName, URLMANIFEST, URLMANIFESTLINUX) {
    MANIFEST_GENERATOR(gamelocation + "/Games/" + GameName)
    if (portable == true) {
        if (process.platform == "linux") {
            DownlaodVersion(URLMANIFESTLINUX, parentfolder3 + '/nytuolauncher_data/VersionsFiles/' + GameName + "_MANIFEST.txt");
        } else {
            DownlaodVersion(URLMANIFEST, __dirname + "/VersionsFiles/" + GameName + "_MANIFEST.txt");
        }
    } else {
        if (process.platform == "linux") {
            DownlaodVersion(URLMANIFESTLINUX, app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/' + GameName + "_MANIFEST.txt");
        } else {
            DownlaodVersion(URLMANIFEST, __dirname + "/VersionsFiles/" + GameName + "_MANIFEST.txt");
        }
    }


    setTimeout(function () {
        if (portable == true) {
            if (process.platform == "linux") {
                var readmanifestlcl = fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/' + GameName + "_MANIFEST.txt", 'utf-8');
                var listoflclmanifest = readmanifestlcl.split(',');
                listoflclmanifest = listoflclmanifest.sort();
                readmanifestlcl = listoflclmanifest.toString().replace(/,/g, "");
                var readmanifest = fs.readFileSync(parentfolder3 + '/nytuolauncher_data/Manifest_temp.txt', 'utf-8');

                console.log(readmanifestlcl)
                console.log(readmanifest)
                if (readmanifestlcl !== readmanifest) {
                    Toastifycation(GameName + " not pass the repair check, it will be re-installed")
                    REINSTALL_DETECT();
                } else {

                    Toastifycation(GameName + " pass the repair check, nothing to change")
                    mat.Modal.getInstance(document.getElementById("modal8")).close()


                }
            } else {
                var readmanifestlcl = fs.readFileSync(__dirname + "/VersionsFiles/" + GameName + "_MANIFEST.txt", 'utf-8');
                var listoflclmanifest = readmanifestlcl.split(',');
                listoflclmanifest = listoflclmanifest.sort();
                readmanifestlcl = listoflclmanifest.toString().replace(/,/g, "");
                var readmanifest = fs.readFileSync(parentfolder3 + '/nytuolauncher_data/Manifest_temp.txt', 'utf-8');

                console.log(readmanifestlcl)
                console.log(readmanifest)
                if (readmanifestlcl !== readmanifest) {
                    Toastifycation(GameName + " not pass the repair check, it will be re-installed")
                    REINSTALL_DETECT();
                } else {

                    Toastifycation(GameName + " pass the repair check, nothing to change")
                    mat.Modal.getInstance(document.getElementById("modal8")).close()

                }
            }
        } else {
            if (process.platform == "linux") {
                var readmanifestlcl = fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/' + GameName + "_MANIFEST.txt", 'utf-8');
                var listoflclmanifest = readmanifestlcl.split(',');
                listoflclmanifest = listoflclmanifest.sort();
                readmanifestlcl = listoflclmanifest.toString().replace(/,/g, "");
                var readmanifest = fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/Manifest_temp.txt', 'utf-8');

                console.log(readmanifestlcl)
                console.log(readmanifest)
                if (readmanifestlcl !== readmanifest) {
                    Toastifycation(GameName + " not pass the repair check, it will be re-installed")
                    REINSTALL_DETECT();
                } else {

                    Toastifycation(GameName + " pass the repair check, nothing to change")
                    mat.Modal.getInstance(document.getElementById("modal8")).close()

                }
            } else {
                var readmanifestlcl = fs.readFileSync(__dirname + "/VersionsFiles/" + GameName + "_MANIFEST.txt", 'utf-8');
                var listoflclmanifest = readmanifestlcl.split(',');
                listoflclmanifest = listoflclmanifest.sort();
                readmanifestlcl = listoflclmanifest.toString().replace(/,/g, "");
                var readmanifest = fs.readFileSync(parentfolder3 + '/nytuolauncher_data/Manifest_temp.txt', 'utf-8');

                console.log(readmanifestlcl)
                console.log(readmanifest)
                if (readmanifestlcl !== readmanifest) {
                    Toastifycation(GameName + " not pass the repair check, it will be re-installed")
                    REINSTALL_DETECT();
                } else {

                    Toastifycation(GameName + " pass the repair check, nothing to change")
                    mat.Modal.getInstance(document.getElementById("modal8")).close()

                }
            }
        }
    }, 5000);
}


function ACH_SAVER() {
    //savegarde les achievements dans le nytuolauncher_data
    if (portable == true) {
        if (process.platform == "linux") {
            try {
                fs.copyFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SNRE/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SFO/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt")
            } catch (error) {
                console.log(error)
            }


        } else {
            try {
                fs.copyFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SNRE/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SFO/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt")
            } catch (error) {
                console.log(error)
            }



        }
    } else {
        if (process.platform == "linux") {
            try {
                fs.copyFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SNRE/Achievements/AchDone.txt", app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SFO/Achievements/AchDone.txt", app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt")
            } catch (error) {
                console.log(error)
            }



        } else {
            try {
                fs.copyFileSync(gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SNRE/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SGB/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt")
            } catch (error) {
                console.log(error)
            }
            try {
                fs.copyFileSync(gamelocation + "/Games/SFO/Achievements/AchDone.txt", parentfolder3 + "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt")
            } catch (error) {
                console.log(error)
            }


        }
    }


}
function ACH_RECUP() {
    if (isInUpdate) {
        if (portable == true) {
            if (process.platform == "linux") {
                try {
                    fs.copyFileSync(parentfolder3 + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt", gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(parentfolder3 + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt", gamelocation + "/Games/SNRE/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(parentfolder3 + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt", gamelocation + "/Games/SGB/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(parentfolder3 + "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt", gamelocation + "/Games/SFO/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }



            }
        } else {
            if (process.platform == "linux") {
                try {
                    fs.copyFileSync(app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt", gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt", gamelocation + "/Games/SNRE/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt", gamelocation + "/Games/SGB/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(app.getPath("documents") + "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt", gamelocation + "/Games/SFO/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }



            } else {
                try {
                    fs.copyFileSync(parentfolder3 + "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt", gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(parentfolder3 + "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt", gamelocation + "/Games/SNRE/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(parentfolder3 + "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt", gamelocation + "/Games/SGB/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }
                try {
                    fs.copyFileSync(parentfolder3 + "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt", gamelocation + "/Games/SFO/Achievements/AchDone.txt")
                } catch (error) {
                    console.log(error)
                }



            }
        }
    }
}
function LaunchGame(gameid) {



    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const path = require('path');
    let launching = new BrowserWindow({
        backgroundColor: 212121,
        width: 480,
        height: 240,
        frame: false,
        resizable: false,
        alwaysOnTop: true,

        icon: path.join(__dirname, 'Ressources/favicon.ico'),
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true
        },


    })
    launching.loadURL(__dirname + '/Gamelaunch.html?' + gameid)


}
function LaunchWindowLauncher() {
    if (process.platform == 'linux' || process.platform == "darwin") {
        const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;
        const path = require('path');
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
        ACH_SAVER();
        win.loadURL("https://launcher.nytuo.yo.fr/profile.php")

    } else {
        const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;
        const path = require('path');
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
        ACH_SAVER();
        if (connectedtointernet == 'true') {
            if (window.location.href == 'file:///' + dirnamew + '/Loading.html?laatim') {
                if (LAATIMU == true) {

                    LaunchGame('LAATIM')

                    win.close()


                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sfo') {
                if (SFOU == true) {

                    LaunchGame('SFO')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sf') {
                if (SFU == true) {

                    LaunchGame('SF')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?la') {
                if (LAU == true) {
                    LaunchGame('LA')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sgb') {
                if (SGBU == true) {
                    LaunchGame('SGB')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?fwd') {
                if (FWDU == true) {
                    LaunchGame('FWD')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?ttd') {
                if (TTDU == true) {
                    LaunchGame('TTD')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?tb') {
                if (TBU == true) {
                    LaunchGame('TB')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?ae') {
                if (AEU == true) {
                    LaunchGame('AE')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?wr') {
                if (WRU == true) {
                    LaunchGame('WR')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sn') {
                if (SNU == true) {
                    LaunchGame('SNRE')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?vitf') {
                if (VITFU == true) {
                    LaunchGame('VITF')
                    win.close()
                } else {
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                    //win.loadFile('index.html')
                }
            } else {
                win.loadURL("https://launcher.nytuo.yo.fr/profile.php")
                //win.loadFile('index.html')
            }

        } else {
            win.loadFile('index.html')
        }
    }


}
/*function GamesAvailable() {

    document.getElementById("sfo").style.display = "none";
    document.getElementById("laatim").style.display = "none";
    document.getElementById("sgb").style.display = "none";
    document.getElementById("sf").style.display = "none";
    document.getElementById("la").style.display = "none";
    document.getElementById("vitf").style.display = "none";
    document.getElementById("ttd").style.display = "none";
    document.getElementById("fwd").style.display = "none";
    document.getElementById("tb").style.display = "none";
    document.getElementById("wr").style.display = "none";
    document.getElementById("ae").style.display = "none";
    document.getElementById("snre").style.display = "none";
    var GA = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/gamesAvailable.txt", "utf-8").split("\n");
    GA = Array.from(new Set(GA));
    GA.forEach(valeur => {
        if (valeur != "") {
            console.log(valeur.toLowerCase())
            document.getElementById(valeur.toLowerCase()).style.display = "block"
        }

    });

}*/
function Toastifycation(message) {
    mat.toast({ html: message })
}