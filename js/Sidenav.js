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

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});
var parentfolder1 = require('path').dirname(__dirname);
var parentfolder2 = require('path').dirname(parentfolder1);
var parentfolder3 = require('path').dirname(parentfolder2);
var portable = portable_check();
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

function gameloc() {
    if (portable == true) {
        if (process.platform == "linux") {

            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") != "") {
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
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") != "") {
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
                if (fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt") != "") {
                    return fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt");
                } else {
                    alert(currentLanguage[24]);
                    return app.getPath("documents");

                }

            } else {
                alert(currentLanguage[25]);
                return app.getPath("documents");
            }
        } else {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") === true) {
                if (fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt") != "") {
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

    if (process.platform == "linux"){
        if (connectedtointernet == 'true') {
            document.getElementById("PP").src = app.getPath("documents") + "/nytuolauncher_data/CurrentUser/PP.jpg"
            document.getElementById("NameTxt").innerHTML = fs.readFileSync(gamelocation + '/Games/Username.txt')
            document.getElementById("emailtxt").innerHTML = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/CurrentUser/Email.txt")
        } else {
            document.getElementById("PP").src = __dirname + "/Resources/ProfileDefault.gif"
            document.getElementById("NameTxt").innerHTML = fs.readFileSync(gamelocation + '/Games/Username.txt')
            document.getElementById("emailtxt").innerHTML = currentLanguage[167]
        }
    }else{
        if (connectedtointernet == 'true') {
            document.getElementById("PP").src = parentfolder3 + "/nytuolauncher_data/CurrentUser/PP.jpg"
            document.getElementById("NameTxt").innerHTML = fs.readFileSync(gamelocation + '/Games/Username.txt')
            document.getElementById("emailtxt").innerHTML = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/CurrentUser/Email.txt")
        } else {
            document.getElementById("PP").src = __dirname + "/Resources/ProfileDefault.gif"
            document.getElementById("NameTxt").innerHTML = fs.readFileSync(gamelocation + '/Games/Username.txt')
            document.getElementById("emailtxt").innerHTML = currentLanguage[167]
        }
    }

t = ["SFO", "LAATIM", "SGB", "SF", "LA", "VITF", "TTD", "FWD", "TB", "WR", "AE"]
if (process.platform == "linux"){
    for (let i = 0; i < t.length; i++) {
        if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt")) {
            if (CryptoJS.enc.Latin1.stringify(CryptoJS.AES.decrypt(fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt").toString(), "GamesAvailablePass")) != 'true') {
                document.getElementById(t[i].toLowerCase() + 'l').innerHTML = ""
            }

        } else {
            document.getElementById(t[i].toLowerCase() + 'l').innerHTML = ""
        }
    }


    if (fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/CurrentUser/SNRE.txt")) {
        if (CryptoJS.enc.Latin1.stringify(CryptoJS.AES.decrypt(fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/CurrentUser/SNRE.txt").toString(), "GamesAvailablePass")) != 'true') {
            document.getElementById('snl').innerHTML = ""
        }

    } else {
        document.getElementById('snl').innerHTML = ""
    }

}else{
    for (let i = 0; i < t.length; i++) {
        if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt")) {
            if (CryptoJS.enc.Latin1.stringify(CryptoJS.AES.decrypt(fs.readFileSync(parentfolder3 + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt").toString(), "GamesAvailablePass")) != 'true') {
                document.getElementById(t[i].toLowerCase() + 'l').innerHTML = ""
            }

        } else {
            document.getElementById(t[i].toLowerCase() + 'l').innerHTML = ""
        }
    }


    if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser/SNRE.txt")) {
        if (CryptoJS.enc.Latin1.stringify(CryptoJS.AES.decrypt(fs.readFileSync(parentfolder3 + "/nytuolauncher_data/CurrentUser/SNRE.txt").toString(), "GamesAvailablePass")) != 'true') {
            document.getElementById('snl').innerHTML = ""
        }

    } else {
        document.getElementById('snl').innerHTML = ""
    }
}
