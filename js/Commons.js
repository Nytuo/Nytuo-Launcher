//Open the emplacement of games
function OpenEmpl(emplacement) {
    console.log(emplacement);
    shell.openPath(emplacement)
}
//restart the launcher
function redm() {
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
        Toastifycation(currentLanguage[48])
    }
    if (folder2delete === gamelocation + "/Games/SFO") {
        Toastifycation(currentLanguage[49]);
    }
    if (folder2delete === gamelocation + "/Games/SF") {
        Toastifycation(currentLanguage[50]);
    }
    if (folder2delete === gamelocation + "/Games/LA") {
        Toastifycation(currentLanguage[51]);
    }
    if (folder2delete === gamelocation + "/Games/AE") {
        Toastifycation(currentLanguage[52]);
    }
    if (folder2delete === gamelocation + "/Games/SNRE") {
        Toastifycation(currentLanguage[53]);
    }
    if (folder2delete === gamelocation + "/Games/SGB") {
        Toastifycation(currentLanguage[54])

    }
    if (folder2delete === gamelocation + "/Games/TTD") {
        Toastifycation(currentLanguage[55])

    }
    if (folder2delete === gamelocation + "/Games/TB") {
        Toastifycation(currentLanguage[56])
    }
    if (folder2delete === gamelocation + "/Games/FWD") {
        Toastifycation(currentLanguage[57])
    }
    if (folder2delete === gamelocation + "/Games/VITF") {
        Toastifycation(curentLanguage[58])
    }
    if (folder2delete === gamelocation + "/Games/WR") {
        Toastifycation(currentLanguage[59])
    }
    if (portable == true) {
        if (process.platform == 'linux') {
            LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
            window.location.href = "https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase()

        }
        else if (process.platform == 'win32') {
            LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
            window.location.href = "https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase()
        }
    } else {
        if (process.platform == 'linux') {
            LID = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/LID.txt").toString()
            window.location.href = "https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase()
        }
        else if (process.platform == 'win32') {
            LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
            window.location.href = "https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase()
        }
    }
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

        Toastifycation(currentLanguage[60])
        refresh();
    }, 5000);
}
//calcul the size of the download
function CalculSize(url, gamename, type) {
    get_filesize(url, function (size) {
        var sizetotaltemp = bytesToSize(size);
        document.getElementById('resultofcalculsize').innerHTML = currentLanguage[0] + type + " : " + gamename + " (" + sizetotaltemp + ")";
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
//refresh page
function refresh() {
    window.location.reload()

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
//write username from account to access in game
function gameUsername(username) {
    fs.writeFileSync(gamelocation + "/Games/Username.txt", username)
}
//write password for remember me
function passwordtxt(password) {
    fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/Password.txt", password)
}
function LaunchGame(gameid) {



    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const path = require('path');
    let launching = new BrowserWindow({
        backgroundColor: 212121,
        width: 520,
        height: 280,
        frame: false,
        resizable: false,
        alwaysOnTop: false,

        icon: path.join(__dirname, 'Ressources/logoexp.png'),
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true
        },


    })
    if (process.platform == "linux") {
        launching.loadURL("file://" + __dirname + '/Gamelaunch.html?' + gameid)

    } else {
        launching.loadURL(__dirname + '/Gamelaunch.html?' + gameid)

    }


}
function Toastifycation(message) {
    mat.toast({ html: message })
}
function DetectTheCancel() {
    if (document.getElementById("pgrs").style.display == "block") {
        return gohome()
    }

}