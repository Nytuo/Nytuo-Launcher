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
var parentfolder1 = require('path').dirname(__dirname);
var parentfolder2 = require('path').dirname(parentfolder1);
var parentfolder3 = require('path').dirname(parentfolder2);
var gamelocation = gameloc();
const { execSync } = require('child_process');
const { spawn } = require('child_process');
function gameloc() {
    if (process.platform == "linux") {

        if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
            if (fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                return fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt");
            } else {
                alert("Error01");
                return app.getPath("documents");

            }

        } else {
            alert("Error02");
            return app.getPath("documents");
        }
    } else {
        if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
            if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") !== "") {
                return fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt");
            } else {
                alert("Error01");
                return parentfolder3;

            }

        } else {
            alert("Error02");
            return parentfolder3;
        }
    }

}
function changegameloc() {
    if (process.platform == "linux") {
        fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt", "");
        app.relaunch();
        app.quit();
    } else {
        fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", "");
        app.relaunch();
        app.quit();
    }

}
function gamelocsettings() {
    if (process.platform == "linux") {
        document.getElementById("gameloc").innerHTML = " Games folder location: " + fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt")
    } else {
        document.getElementById("gameloc").innerHTML = " Games folder location: " + fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt")
    }

}
function achivement() {

    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const path = require('path');
    let display = remote.screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;
    const ach = new BrowserWindow({
        frame: false,
        resizable: false,
        height: 100,
        width: 350,
        alwaysOnTop: true,
        skipTaskbar: true,
        focusable: false,
        icon: path.join(__dirname, 'Ressources/logoexp.png'),
        x: width - 380,
        y: height - 150,
        webPreferences: {
            nodeIntegration: true
        },
    });

    ach.loadFile("./achivement.html");
    ach.setAlwaysOnTop(true, "floating", 1);
    ach.setVisibleOnAllWorkspaces(true);
}

function Open(dossierdujeu, filename) {
    shell.openItem(gamelocation + "/Games/" + dossierdujeu + "/" + filename);
}
function OpenforLinux(gameloc, dossierdujeu, filename) {
    execSync("cd " + gameloc + "/Games/" + dossierdujeu + ";" + " chmod a+x ./" + filename + ";" + " ./" + filename)

}

function DownlaodFile(file_url, targetPath, dossierdujeu) {
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
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes);
    });
    req.on('end', function () {
        extractzipgame(targetPath, dossierdujeu);
    });
}

function DownlaodFileUpdate(file_url, targetPath, dossierdujeu) {
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
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes);
    });
    req.on('end', function () {
        turnonOverlay();
        setTimeout(function () {
            if (process.platform == "linux") {
                fs.rename(targetPath, app.getPath("desktop") + "/Nytuo-Launcher-linux.appimage", (err) => {
                    if (err) throw err;
                    console.log('Rename complete!');
                    shell.openItem(app.getPath("desktop") + "/Nytuo-Launcher-linux.appimage")
                    app.exit();
                    turnoffOverlay();
                });
            } else {
                shell.openItem(targetPath)
                app.exit();
                turnoffOverlay();
            }

        }, 1000);

    });
}

function showProgress(received, total) {
    var percentage = (received * 100) / total;
    var elem = document.getElementById("myBar");
    var width = 0;
    width++;
    elem.style.width = percentage + "%";
    elem.innerHTML = percentage.toFixed() + "%";
    console.log(percentage.toFixed() + "% | " + received.toFixed() + " bytes out of " + total.toFixed() + " bytes.");
}

function DL(url, dossierdujeu, nomdufichier) {
    DownlaodFile(url, gamelocation + "/Games/" + dossierdujeu + "/" + nomdufichier, gamelocation + "/Games/" + dossierdujeu)
}

function extractzipgame(zippath, destpath) {
    console.log(zippath, { dir: destpath });
    turnonOverlay()
    extract(zippath, { dir: destpath }, function (err) {
        deletefile(zippath)
    })
}

function deletefile(file2delete) {
    var filepath = file2delete;
    console.log(filepath)
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {

            if (err) {
                if (process.platform == "linux") {
                    fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Error : " + err.message + " \nLogoexp.png");
                } else {
                    fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Error : " + err.message + " \nLogoexp.png");
                }

                achivement();
                console.log(err);
                return;

            }
        });

    } else {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Error when attemping to wipe the cache \nLogoexp.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Error when attemping to wipe the cache \nLogoexp.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/LAATIM/LA_IM.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Legend Adventure and the Infernal Maze is now playable \nLogoLAATIM.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Legend Adventure and the Infernal Maze is now playable \nLogoLAATIM.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/SF/SF.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "ShootFighter is now playable \nLogoSF.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "ShootFighter is now playable \nLogoSF.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/LA/LA.zip") {
        if (process.platform == 'linux') {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Lutin Adventure is now playable \nLogoLA.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Lutin Adventure is now playable \nLogoLA.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/AE/AE.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "AstéroidEscape is now playable \nLogoAE.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "AstéroidEscape is now playable \nLogoAE.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/SNRE/SNRE.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "SansNom Réédition is now playable \nLogoSN.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "SansNom Réédition is now playable \nLogoSN.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/SGB/SGB.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Super Geoffrey Bros is now playable \nSGB1.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Super Geoffrey Bros is now playable \nSGB1.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/TTD/TTD.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "The Tardis Defender is now playable \nLogoTTD.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "The Tardis Defender is now playable \nLogoTTD.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/TB/TB.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "TanksBattle is now playable \nLogoTB.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "TanksBattle is now playable \nLogoTB.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/FWD/FWD.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "FireWall Defender is now playable \nLogoFWD.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "FireWall Defender is now playable \nLogoFWD.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/VITF/VITF.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Vincent In The Forest is now playable \nLogoVITF.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Vincent In The Forest is now playable \nLogoVITF.png");
        }

        achivement();
    }
    if (file2delete === gamelocation + "/Games/WR/WR.zip") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "WinRun is now playable \nLogoWR.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "WinRun is now playable \nLogoWR.png");
        }

        achivement();
    }

    setTimeout(function () {
        if (isUp2date === true) {
            turnoffOverlay()
            refresh();
        } else {
            turnoffOverlay()
            window.location.href = "./index.html"
        }
    }, 2000);

}

function OpenEmpl(emplacement) {
    console.log(emplacement);
    shell.openItem(emplacement)
}

function redm() {
    app.relaunch()
    app.exit()
}

function deletefolder(folder2delete) {
    turnonOverlay();
    rimraf(folder2delete, function () { console.log("done"); });

    if (folder2delete === gamelocation + "/Games/LAATIM") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Legend Adventure and the Infernal Maze is now delete \nLogoLAATIM.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Legend Adventure and the Infernal Maze is now delete \nLogoLAATIM.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/SF") {
        if (process.platform == 'linux') {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Shootfighter is now delete \nLogoSF.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Shootfighter is now delete \nLogoSF.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/LA") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Lutin Adventure is now delete \nLogoLA.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Lutin Adventure is now delete \nLogoLA.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/AE") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "AstéroidEscape is now delete \nLogoAE.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "AstéroidEscape is now delete \nLogoAE.png");
        }
        achivement();
    }
    if (folder2delete === gamelocation + "/Games/SNRE") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "SansNom Réédition is now delete \nLogoSN.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "SansNom Réédition is now delete \nLogoSN.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/SGB") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Super Geoffrey Bros is now delete \nSGB1.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Super Geoffrey Bros is now delete \nSGB1.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/TTD") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "The Tardis Defender is now delete \nLogoTTD.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "The Tardis Defender is now delete \nLogoTTD.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/TB") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "TanksBattle is now delete \nLogoTB.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "TanksBattle is now delete \nLogoTB.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/FWD") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "FireWall Defender is now delete \nLogoFWD.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "FireWall Defender is now delete \nLogoFWD.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/VITF") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "Vincent In The Forest is now delete \nLogoVITF.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "Vincent In The Forest is now delete \nLogoVITF.png");
        }

        achivement();
    }
    if (folder2delete === gamelocation + "/Games/WR") {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "WinRun is now delete \nLogoWR.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "WinRun is now delete \nLogoWR.png");
        }

        achivement();
    }
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

        turnoffOverlay()
        refresh();
    }, 5000);
}

function deleteall() {
    turnonOverlay();
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

        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + "nytuolauncher_data/Ach_Notif_TXT.txt", "All games are now delete \nLogoexp.png");
        } else {
            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "All games are now delete \nLogoexp.png");
        }

        achivement();
        turnoffOverlay()
        refresh();
    }, 5000);
}

function createlink(path, path2link) {
    turnonOverlay();
    ws.create(path2link, path);
    setTimeout(function () {

        turnoffOverlay()
    }, 1000);


}

function CalculSize(url, gamename, type) {
    get_filesize(url, function (size) {
        var sizetotaltemp = bytesToSize(size);
        document.getElementById('resultofcalculsize').innerHTML = "You are about to " + type + " : " + gamename + " (" + sizetotaltemp + ")";
    });
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

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

function detectforWin(dossierdujeu, versiontxt, versionlcl, gamename, txtVID, url) {
    if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === false) {
        if (process.platform === "win32") {
            document.getElementById(dossierdujeu + "button1").innerHTML = "Install";
            CalculSize(url, gamename, 'Download');

            document.getElementById(txtVID).innerHTML = "Version : ?";
            if (!!document.getElementById(dossierdujeu + "button2") === true) {
                document.getElementById(dossierdujeu + "button2").onclick = 0;
                document.getElementById(dossierdujeu + "button2").innerHTML = "";
            }

            document.getElementById(dossierdujeu + "button3").onclick = 0;
            document.getElementById(dossierdujeu + "button3").innerHTML = "";
        }
        if (process.platform !== "win32") {
            document.getElementById(dossierdujeu + "button1").innerHTML = "Unavailable";
            document.getElementById(txtVID).innerHTML = "This game is not available for your platform";
            if (!!document.getElementById(dossierdujeu + "button2") === true) {
                document.getElementById(dossierdujeu + "button2").onclick = 0;
                document.getElementById(dossierdujeu + "button2").innerHTML = "";
            }
            document.getElementById(dossierdujeu + "button1").onclick = 0;
            document.getElementById(dossierdujeu + "button3").onclick = 0;
            document.getElementById(dossierdujeu + "button1").innerHTML = "";
            document.getElementById(dossierdujeu + "button3").innerHTML = "";

        }
    } else {
        if (process.platform === "win32") {
            if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                document.getElementById(dossierdujeu + "button1").innerHTML = "Play";
                document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
            } else {
                document.getElementById(dossierdujeu + "button1").innerHTML = "Update";
                CalculSize(url, gamename, 'Update');
                document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + " (Update available)";
                var logo;
                if (gamename === "Lutin Adventure") {
                    logo = "LogoLA"
                }
                if (gamename === "ShootFighter") {
                    logo = "LogoSF"
                }
                if (gamename === "Super Geoffrey Bros") {
                    logo = "SGB1"
                }
                if (gamename === "Legend Adventure and the Infernal Maze") {
                    logo = "LogoLAATIM"
                }
                if (gamename === "Vincent In The Forest") {
                    logo = "LogoVITF"
                }
                if (gamename === "The Tardis Defender") {
                    logo = "LogoTTD"
                }
                if (gamename === "FireWall Defender") {
                    logo = "LogoFWD"
                }
                if (gamename === "TanksBattle") {
                    logo = "LogoTB"
                }
                if (gamename === "WinRun") {
                    logo = "LogoWR"
                }
                if (gamename === "AsteroidEscape") {
                    logo = "LogoAE"
                }
                if (gamename === "SansNom Réédition") {
                    logo = "LogoSN"
                }
                fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An Update for " + gamename + " is available ! \n" + logo + ".png");
                achivement();
            }
        }
        if (process.platform !== "win32") {
            document.getElementById(txtVID).innerHTML = "This game is not available for your platform.";
            if (!!document.getElementById(dossierdujeu + "button2") == true) {
                document.getElementById(dossierdujeu + "button2").onclick = 0;
                document.getElementById(dossierdujeu + "button2").innerHTML = "";
            }
            document.getElementById(dossierdujeu + "button1").onclick = 0;
            document.getElementById(dossierdujeu + "button3").onclick = 0;
            document.getElementById(dossierdujeu + "button1").innerHTML = "";
            document.getElementById(dossierdujeu + "button3").innerHTML = "";

        }
    }
}

function detect(dossierdujeu, versiontxt, versionlcl, gamename, txtVID, url) {
    console.log(parentfolder3)
    if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === false) {
        if (process.platform === "win32" || process.platform === "linux") {
            document.getElementById(dossierdujeu + "button1").innerHTML = "Install";
            CalculSize(url, gamename, 'Download');
            document.getElementById(txtVID).innerHTML = "Version : ?";
            if (!!document.getElementById(dossierdujeu + "button2") === true) {
                document.getElementById(dossierdujeu + "button2").onclick = 0;
                document.getElementById(dossierdujeu + "button2").innerHTML = "";
            }

            document.getElementById(dossierdujeu + "button3").onclick = 0;

            document.getElementById(dossierdujeu + "button3").innerHTML = "";
        } else {
            document.getElementById(txtVID).innerHTML = "This Game is not available for this platform.";
            if (!!document.getElementById(dossierdujeu + "button2") === true) {
                document.getElementById(dossierdujeu + "button2").onclick = 0;
                document.getElementById(dossierdujeu + "button2").innerHTML = "";
            }
            document.getElementById(dossierdujeu + "button1").onclick = 0;
            document.getElementById(dossierdujeu + "button3").onclick = 0;
            document.getElementById(dossierdujeu + "button1").innerHTML = "";
            document.getElementById(dossierdujeu + "button3").innerHTML = "";
        }
    } else {
        if (process.platform === "win32" || process.platform === "linux") {
            if (process.platform == "linux") {
                if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/' + versionlcl).toString()) {
                    document.getElementById(dossierdujeu + "button1").innerHTML = "Play";
                    document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                    document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                } else {
                    document.getElementById(dossierdujeu + "button1").innerHTML = "Update";
                    CalculSize(url, gamename, 'Update');
                    document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + " (Update available)";
                    var logo;
                    if (gamename === "Lutin Adventure") {
                        logo = "LogoLA"
                    }
                    if (gamename === "ShootFighter") {
                        logo = "LogoSF"
                    }
                    if (gamename === "Super Geoffrey Bros") {
                        logo = "SGB1"
                    }
                    if (gamename === "Legend Adventure and the Infernal Maze") {
                        logo = "LogoLAATIM"
                    }
                    if (gamename === "Vincent In The Forest") {
                        logo = "LogoVITF"
                    }
                    if (gamename === "The Tardis Defender") {
                        logo = "LogoTTD"
                    }
                    if (gamename === "FireWall Defender") {
                        logo = "LogoFWD"
                    }
                    if (gamename === "TanksBattle") {
                        logo = "LogoTB"
                    }
                    if (gamename === "WinRun") {
                        logo = "LogoWR"
                    }
                    if (gamename === "AsteroidEscape") {
                        logo = "LogoAE"
                    }
                    if (gamename === "SansNom Réédition") {
                        logo = "LogoSN"
                    }
                    fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An Update for " + gamename + " is available \n" + logo + ".png");
                    achivement();
                }
            } else {
                if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                    document.getElementById(dossierdujeu + "button1").innerHTML = "Play";
                    document.getElementById('resultofcalculsize').innerHTML = "You are about to Play : " + gamename;
                    document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                } else {
                    document.getElementById(dossierdujeu + "button1").innerHTML = "Update";
                    CalculSize(url, gamename, 'Update');
                    document.getElementById(txtVID).innerHTML = "Version : " + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + " (Update available)";
                    var logo;
                    if (gamename === "Lutin Adventure") {
                        logo = "LogoLA"
                    }
                    if (gamename === "ShootFighter") {
                        logo = "LogoSF"
                    }
                    if (gamename === "Super Geoffrey Bros") {
                        logo = "SGB1"
                    }
                    if (gamename === "Legend Adventure and the Infernal Maze") {
                        logo = "LogoLAATIM"
                    }
                    if (gamename === "Vincent In The Forest") {
                        logo = "LogoVITF"
                    }
                    if (gamename === "The Tardis Defender") {
                        logo = "LogoTTD"
                    }
                    if (gamename === "FireWall Defender") {
                        logo = "LogoFWD"
                    }
                    if (gamename === "TanksBattle") {
                        logo = "LogoTB"
                    }
                    if (gamename === "WinRun") {
                        logo = "LogoWR"
                    }
                    if (gamename === "AsteroidEscape") {
                        logo = "LogoAE"
                    }
                    if (gamename === "SansNom Réédition") {
                        logo = "LogoSN"
                    }
                    fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An Update for " + gamename + " is available \n" + logo + ".png");
                    achivement();
                }
            }

        } else {
            document.getElementById(txtVID).innerHTML = "This game is not available for this platform";
            if (!!document.getElementById(dossierdujeu + "button2") === true) {
                document.getElementById(dossierdujeu + "button2").onclick = 0;
                document.getElementById(dossierdujeu + "button2").innerHTML = "";
            }
            document.getElementById(dossierdujeu + "button1").onclick = 0;
            document.getElementById(dossierdujeu + "button3").onclick = 0;
            document.getElementById(dossierdujeu + "button1").innerHTML = "";
            document.getElementById(dossierdujeu + "button3").innerHTML = "";
        }
    }
}

var only_one = false

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



function choose() {
    let random = Math.floor(Math.random() * (10 - 0 + 1) + 0);
    if (random === 0) {
        document.getElementById("loadertxt").innerHTML = "Connecting to the TARDIS's database..."
    }
    if (random === 1) {
        document.getElementById("loadertxt").innerHTML = "Toss a coin to your Programmer..."
    }
    if (random === 2) {
        document.getElementById("loadertxt").innerHTML = "To Be or not to Be, why not Be a Launcher ?"
    }
    if (random === 3) {
        document.getElementById("loadertxt").innerHTML = "Nothing is true, everything is permitted !"
    }
    if (random === 4) {
        document.getElementById("loadertxt").innerHTML = "Darth Vader is Immortal !"
    }
    if (random === 5) {
        document.getElementById("loadertxt").innerHTML = "Thanos kill half of univers population..."
    }
    if (random === 6) {
        document.getElementById("loadertxt").innerHTML = "Checking for upgrade..."
    }
    if (random === 7) {
        document.getElementById("loadertxt").innerHTML = "Loading..."
    }
    if (random === 8) {
        document.getElementById("loadertxt").innerHTML = "Avengers Assemble ! "
    }
    if (random === 9) {
        document.getElementById("loadertxt").innerHTML = "The Nytuo Launcher is loading..."
    }
    if (random === 10) {
        document.getElementById("loadertxt").innerHTML = "I turn myself into a Launcher, Morty ! I'm Launcher Riiiick !!"
    }


}

function DLVersions() {
    if (process.platform == "linux") {
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
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IImCSAtlZSG31pPg?e=92fd99", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt');
        DownlaodVersion("https://1drv.ws/u/s!AkkqGntQc7Y5hJpf7fm6Vp75nfiuYQ?e=PM7c0S", app.getPath("documents") + '/nytuolauncher_data/news.html');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJp0was2tokc6t75-w?e=jrD2Nu", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJxjY60QkNyIaREMlg?e=jn3ykh", app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt');
        DownlaodVersion('https://1drv.ws/t/s!AkkqGntQc7Y5hqcLm1H1sr4O3eXsfw?e=vR0qax', app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/b_Beta.txt')
        if (fs.readFileSync(app.getPath("documents") + 'nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt') === "1") {
            document.getElementById("updatetext1").innerHTML = "Manual Update required : visit the website for more informations"
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
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IImCSAtlZSG31pPg?e=92fd99", __dirname + '/VersionsFiles/LauncherVersion.txt');
        DownlaodVersion("https://1drv.ws/u/s!AkkqGntQc7Y5hJpf7fm6Vp75nfiuYQ?e=PM7c0S", __dirname + '/news.html');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJp0was2tokc6t75-w?e=jrD2Nu", __dirname + '/VersionsFiles/LauncherUpdateType.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJxjY60QkNyIaREMlg?e=jn3ykh", __dirname + '/VersionsFiles/LauncherBetaVersion.txt');
        DownlaodVersion('https://1drv.ws/t/s!AkkqGntQc7Y5hqcLm1H1sr4O3eXsfw?e=vR0qax', __dirname + '/VersionsFiles/b_Beta.txt')
        if (fs.readFileSync(__dirname + '/VersionsFiles/LauncherUpdateType.txt') === "1") {
            document.getElementById("updatetext1").innerHTML = "Manual Update required : visit the website for more informations"
        }
    }


}

function DoforWin(dossierdujeu, versiontxt, URL, zipname, versionlcl, nomexe, gamename) {

    if (process.platform === "win32") {
        if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) === false) {
            DL(URL, dossierdujeu, zipname);
        } else {
            if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                turnonOverlay();
                Open(dossierdujeu, nomexe);
                setTimeout(function () {
                    turnoffOverlay();
                }, 1000);


            } else {
                deletefolderforrepair(gamelocation + '/Games/' + dossierdujeu);
                setTimeout(function () {
                    DL(URL, dossierdujeu, zipname);
                }, 5000);

            }
        }
    }
    if (process.platform !== "win32") {
        alert(gamename + " is not available for your operating system")
    }
}

function Do(dossierdujeu, versiontxt, URLwin, zipname, versionlcl, nomexe, gamename, linuxexe, macosexe, URLinux, URLmac) {
    if (process.platform === "win32") {
        if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) === false) {
            DL(URLwin, dossierdujeu, zipname);
        } else {
            if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                turnonOverlay();
                Open(dossierdujeu, nomexe);
                setTimeout(function () {
                    turnoffOverlay()
                }, 1000)

            } else {
                deletefolderforrepair(gamelocation + '/Games/' + dossierdujeu);
                setTimeout(function () {
                    DL(URLwin, dossierdujeu, zipname);
                }, 5000);

            }
        }
    }
    if (process.platform === "linux") {
        if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) === false) {
            DL(URLinux, dossierdujeu, zipname);
        } else {
            if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt).toString() === fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/' + versionlcl).toString()) {
                turnonOverlay();
                OpenforLinux(gamelocation, dossierdujeu, linuxexe);
                setTimeout(function () {
                    turnoffOverlay()
                }, 1000)
            } else {
                deletefolderforrepair(gamelocation + '/Games/' + dossierdujeu);
                setTimeout(function () {
                    DL(URLinux, dossierdujeu, zipname);
                }, 5000);

            }
        }
    }
    if (process.platform != "linux" && process.platform != "win32") {
        alert("Your platform is not compatible with the game (You're not supposed to view this message, if you do please report the error with code #0220)")
    }
}

function achivementtxt() {
    if (process.platform == 'linux'){
        var txt = require('fs').readFileSync(app.getPath("documents") + '/nytuolauncher_data/Ach_Notif_TXT.txt', 'utf-8')
        .split('\n');
    }else{
        var txt = require('fs').readFileSync(__dirname + '/Ach_Notif_TXT.txt', 'utf-8')
        .split('\n');
    }
    
    var AchTxtTemp = txt[0];
    var img = txt[1];
    document.getElementById("ach-txt").innerHTML = AchTxtTemp;
    document.getElementById("ach-img").src = __dirname + "/Ressources/" + img
}
function refresh() {
    document.location.reload(true);
}

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

function deletefolderforrepair(folder2delete) {
    turnonOverlay();
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
        turnoffOverlay()
    }, 500);
}


function RunWithoutInstall(url, gamejolt) {
    turnonOverlay();

    setTimeout(function () {
        turnoffOverlay()
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
var isUp2date = true;
var update = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            setTimeout(function () {
                executed = true;
                console.log(window.require('electron').remote.app.getVersion().toString());
                if (process.platform == "linux") {
                    var launcherversion = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt");
                    var launcherversionbeta = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt");
                } else {
                    var launcherversion = fs.readFileSync(__dirname + "/VersionsFiles/LauncherVersion.txt");
                    var launcherversionbeta = fs.readFileSync(__dirname + "/VersionsFiles/LauncherBetaVersion.txt");
                }

                console.log(parentfolder2);
                console.log(fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString());
                if (process.platform == 'win32' && fs.existsSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt') == true && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt') == 'True' && fs.readFileSync(__dirname + '/VersionsFiles/b_Beta.txt') == 'True') {


                    if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(__dirname + '/VersionsFiles/LauncherBetaVersion.txt').toString()) {
                        fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for the Nytuo Launcher Beta is available \nLogoexp.png");
                        achivement();
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
                    if (isUp2date === false) {
                        if (!!document.getElementById('updateview') === true) {
                            document.getElementById('updateview').style.display = "block";
                        }
                        DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversionbeta + '/Nytuo-Launcher-win64.exe', parentfolder3 + "/nytuolauncher_data/win64UpdateBeta.exe");
                    }
                } else {
                    if (process.platform == "linux") {
                        if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for the Nytuo Launcher is available \nLogoexp.png");
                            achivement();
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
                        if (isUp2date === false) {
                            //DL bonne version
                            //Lance le programme
                            //Ferme celui là
                            if (!!document.getElementById('updateview') === true) {
                                document.getElementById('updateview').style.display = "block";
                            }
                            DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-linux.appimage', app.getPath("documents") + "/nytuolauncher_data/linuxUpdate.appimage");


                        }
                    } else {
                        if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for the Nytuo Launcher is available \nLogoexp.png");
                            achivement();
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
                        if (isUp2date === false) {
                            //DL bonne version
                            //Lance le programme
                            //Ferme celui là
                            if (!!document.getElementById('updateview') === true) {
                                document.getElementById('updateview').style.display = "block";
                            }
                            if (process.platform == 'win32') {

                                DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-win64.exe', parentfolder3 + "/nytuolauncher_data/win64Update.exe");
                            }

                        }
                    }


                }


            }, 5000)
        }
    }
})();

function verif_gameVersionLoading() {

    if (window.require('electron').remote.app.getVersion().toString() >= fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {


        setTimeout(function () {
            if (fs.existsSync(gamelocation + '/Games/LAATIM/LAIM_Version.txt').toString === true) {
                if (process.platform == "linux") {
                    if (fs.readFileSync(gamelocation + '/Games/LAATIM/LAIM_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LAIM_Version.txt').toString()) {
                        fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for Legend Adventure and the Infernal Maze is available \nLogoLAATIM.png");
                    }
                } else {
                    if (fs.readFileSync(gamelocation + '/Games/LAATIM/LAIM_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/LAIM_Version.txt').toString()) {
                        fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for Legend Adventure and the Infernal Maze is available \nLogoLAATIM.png");
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/SF/VersionSF.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SF/VersionSF.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SF_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for ShootFighter is available \nLogoSF.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SF/VersionSF.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SF_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for ShootFighter is available \nLogoSF.png");
                        }
                    }
                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/LA/VersionLA.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/LA/VersionLA.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LA_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for Lutin Adventure is available \nLogoLA.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/LA/VersionLA.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/LA_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for Lutin Adventure is available \nLogoLA.png");
                        }
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/AE/VersionAE.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/AE/VersionAE.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/AE_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for Astéroid Escape is available\nLogoAE.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/AE/VersionAE.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/AE_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for Astéroid Escape is available\nLogoAE.png");
                        }
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/SNRE/SNRE_Version.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SNRE/SNRE_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SNRE_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "nytuolauncher_data/Ach_Notif_TXT.txt", "An update for SansNom Réédition is available\nLogoSN.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SNRE/SNRE_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SNRE_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for SansNom Réédition is available\nLogoSN.png");
                        }
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/SGB/SGB_Version.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/SGB/SGB_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/SGB_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for Super Geoffrey Bros is available\nSGB1.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/SGB/SGB_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/SGB_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for Super Geoffrey Bros is available\nSGB1.png");
                        }
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/TTD/TTD_Version.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/TTD/TTD_Version.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/TTD_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for The Tardis Defender is available\nLogoTTD.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/TTD/TTD_Version.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/TTD_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for The Tardis Defender is available\nLogoTTD.png");
                        }
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/TB/VersionTB.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/TB/VersionTB.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/TB_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for TanksBattle is available\nLogoTB.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/TB/VersionTB.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/TB_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for TanksBattle is available\nLogoTB.png");
                        }
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/FWD/VersionFWD.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/FWD/VersionFWD.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/FWD_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for FireWall Defender is available\nLogoFWD.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/FWD/VersionFWD.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/FWD_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for FireWall Defender is available\nLogoFWD.png");
                        }
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/VITF/VersionVITF.txt').toString === true) {
                    if (process.platform == "linux") {
                        if (fs.readFileSync(gamelocation + '/Games/VITF/VersionVITF.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/VITF_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for Vincent In The Forest is available\nLogoVITF.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/VITF/VersionVITF.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/VITF_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for Vincent In The Forest is available\nLogoVITF.png");
                        }
                    }

                    achivement();

                }
                if (fs.existsSync(gamelocation + '/Games/WR/VersionWR.txt').toString === true) {
                    if (process.platform == 'linux') {
                        if (fs.readFileSync(gamelocation + '/Games/WR/VersionWR.txt').toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/WR_Version.txt').toString()) {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/Ach_Notif_TXT.txt", "An update for WinRun is available \nLogoWR.png");
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/WR/VersionWR.txt').toString() < fs.readFileSync(__dirname + '/VersionsFiles/WR_Version.txt').toString()) {
                            fs.writeFileSync(__dirname + "/Ach_Notif_TXT.txt", "An update for WinRun is available \nLogoWR.png");
                        }
                    }

                    achivement();

                }
            }

            window.location.href = "./index.html"
        }, 4000);
    }
}

function compare(array1, array2) {
    var temp = [];
    array1 = array1.toString().split(',').map(String);
    array2 = array2.toString().split(',').map(String);

    for (var i in array1) {
        if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    return temp.sort((a) => a);
}

function LoadAchivements() {
    console.log(homedir)
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page === "SGBAch.html" || page === "index.html" || page === "sgb.html") {
        var AchlistSGB = require('fs').readFileSync(__dirname + '/Achievements/SGB/AllAchievements.txt', 'utf-8').split('\n');
        let AchListSGBDone2 = require('fs').readFileSync(app.getPath("documents") + "/Nytuo/Achievements/SGB/AchDone.txt", 'utf-8').split('\n');
        console.log(AchListSGBDone2);
        let temp = AchListSGBDone2.sort();
        let AchListSGBDone = Array.from(new Set(temp));
        console.log(AchListSGBDone);
        var percentage = ((AchListSGBDone.length - 2) * 100) / (AchlistSGB.length - 1);
        if (percentage < "0") {
            percentage = 0
        }
        console.log(percentage);
        var elem = document.getElementById("BarAchSGB");
        var width = 0;
        elem.style.width = percentage + "%";
        elem.innerHTML = percentage.toFixed() + "%";
        var AchListSGBTab = AchListSGBDone.slice(1, (AchListSGBDone.length));
        var AchListSGBTXT = AchListSGBTab.toString().split(",").join("<br/>");
        if (page === "SGBAch.html" || page === "sgb.html") {
            document.getElementById('SGBachDone').innerHTML = AchListSGBTXT.toString();
            var SGBLock = compare(AchlistSGB, AchListSGBDone);

            if (percentage <= "0") {
                document.getElementById('SGBachDone').innerHTML = "No achievements are unlocked for this game"
            }
            if (percentage != "100") {
                document.getElementById('SGBach').innerHTML = SGBLock.toString().split(",").join('<br/>');
            } else {
                document.getElementById('SGBach').innerHTML = "All Achievements are Unlocked"
            }
        }
    }
    if (page === "LAATIMAch.html" || page === "index.html" || page === "laatim.html") {
        var AchlistLAATIM = require('fs').readFileSync(__dirname + '/Achievements/LAATIM/AllAchievements.txt', 'utf-8').split('\n');
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
        var elem = document.getElementById("BarAchLAATIM");
        var width = 0;
        elem.style.width = percentage + "%";
        elem.innerHTML = percentage.toFixed() + "%";
        var AchListLAATIMTab = AchListLAATIMDone.slice(1, (AchListLAATIMDone.length));
        var AchListLAATIMTXT = AchListLAATIMTab.toString().split(",").join("<br/>");
        if (page === "LAATIMAch.html" || page === "laatim.html") {
            document.getElementById('LAATIMachDone').innerHTML = AchListLAATIMTXT.toString();
            var LAATIMLock = compare(AchlistLAATIM, AchListLAATIMDone);

            if (percentage <= "0") {
                document.getElementById('LAATIMachDone').innerHTML = "No achievements are unlocked for this game"
            }
            if (percentage != "100") {
                document.getElementById('LAATIMach').innerHTML = LAATIMLock.toString().split(",").join('<br/>');
            } else {
                document.getElementById('LAATIMach').innerHTML = "All Achievements are Unlocked"
            }
        }
    }
    if (page === "SNREAch.html" || page === "index.html" || page === "sn.html") {
        var AchlistSNRE = require('fs').readFileSync(__dirname + '/Achievements/SNRE/AllAchievements.txt', 'utf-8').split('\n');
        let AchListSNREDone2 = require('fs').readFileSync(app.getPath("documents") + "/Nytuo/Achievements/SNRE/AchDone.txt", 'utf-8').split('\n');
        console.log(AchListSNREDone2);
        let temp = AchListSNREDone2.sort();
        let AchListSNREDone = Array.from(new Set(temp));
        console.log(AchListSNREDone);
        var percentage = ((AchListSNREDone.length - 2) * 100) / (AchlistSNRE.length - 1);
        if (percentage < "0") {
            percentage = 0
        }
        console.log(percentage);
        var elem = document.getElementById("BarAchSNRE");
        var width = 0;
        elem.style.width = percentage + "%";
        elem.innerHTML = percentage.toFixed() + "%";
        var AchListSNRETab = AchListSNREDone.slice(1, (AchListSNREDone.length));
        var AchListSNRETXT = AchListSNRETab.toString().split(",").join("<br/>");
        if (page === "SNREAch.html" || page === "sn.html") {
            document.getElementById('SNREachDone').innerHTML = AchListSNRETXT.toString();
            var SNRELock = compare(AchlistSNRE, AchListSNREDone);

            if (percentage <= "0") {
                document.getElementById('SNREachDone').innerHTML = "No achievements are unlocked for this game"
            }
            if (percentage != "100") {
                document.getElementById('SNREach').innerHTML = SNRELock.toString().split(",").join('<br/>');
            } else {
                document.getElementById('SNREach').innerHTML = "All Achievements are Unlocked"
            }
        }
    }
}

function validate() {
    if (process.platform == "linux") {
        alert("Your Platform is not supported for beta program, sorry...")
        beta('no');
    } else {
        if (fs.readFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt') == 'True') {
            alert("You are no more in the beta program of the Nytuo Launcher ! (if you are on a beta version, please wait until stable update or do a manual update or launch manually the updater.)");
            beta('no');
        } else {

            alert("You are in the beta program of the Nytuo Launcher ! (The beta version (if available) will be downloaded when you open again the launcher.)");
            beta('yes');
        }
    }



}

function beta(entry) {
    if (entry === 'no') {
        if (process.platform == "linux") {
            fs.writeFileSync(app.getPath("documents") + '/nytuolauncher_data/BetaAccess.txt', 'False');
        } else {
            fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
        }

    } else {
        if (process.platform == "linux") {
            alert("Your platform is not supported for the beta program, sorry")
        } else {
            fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'True');
        }

    }

}

function turnonOverlay() {
    document.getElementById("overlay").style.display = "block";
}

function turnoffOverlay() {
    document.getElementById("overlay").style.display = "none";
}