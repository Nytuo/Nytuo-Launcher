var connectedtointernet = connectest();
var portable = portable_check();
var gamelocation = gameloc();

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

function portable_check() {
    if (fs.existsSync(__dirname + "/portable.txt")) {
        if (fs.readFileSync(__dirname + "/portable.txt") == "true") {
            return true;
        } else {
            return false;
        }
    }
}



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

function Toastifycation(message) {
    mat.toast({ html: message })
}

function DownlaodVersion(file_url, targetPath) {

    only_one = true
    var received_bytes = 0;
    var total_bytes = 0;
    var req = request({
        method: 'GET',
        uri: file_url
    });
    var out = fs.createWriteStream(targetPath);
    var starte = new Date().getTime();

    req.pipe(out);
    req.on('response', function(data) {
        total_bytes = parseInt(data.headers['content-length']);
    });
    req.on('data', function(chunk) {
        received_bytes += chunk.length;
        showProgressUpdate(received_bytes, total_bytes, starte, "")
    });
    req.on('end', function() {
        document.getElementById("prgs").className = "indeterminate"
        VerifyVersionSizeAndContent(file_url, targetPath)
    })
}

//the update system
var isUp2date = true;

function update() {
    if (connectedtointernet == 'true') {


        document.getElementById("MyBartxt").innerHTML = currentLanguage[122]

        setTimeout(function() {
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
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[132]
                    Toastifycation(currentLanguage[72])
                    console.log("You have to update the launcher !")
                    isUp2date = false;
                } else {
                    if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(__dirname + '/VersionsFiles/LauncherBetaVersion.txt').toString()) {
                        Toastifycation(currentLanguage[73])
                        console.log("You have to update the launcher !")
                        document.getElementById("MyBartxt").innerHTML = currentLanguage[131]
                        isUp2date = false;
                    }
                    if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(__dirname + '/VersionsFiles/LauncherBetaVersion.txt').toString()) {
                        console.log("Very UpToDate")
                        console.log(app.getAppPath())
                        document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
                        verif_gameVersionLoading();
                    }
                    if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(__dirname + '/VersionsFiles/LauncherBetaVersion.txt').toString()) {
                        console.log("UpToDate")
                        document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
                        verif_gameVersionLoading();
                    }

                }
                if (isUp2date === false) {
                    if (portable == true) {
                        alert(currentLanguage[74])
                        app.exit()
                    } else {
                        if (!!document.getElementById('updateview') === true) {
                            document.getElementById('updateview').style.display = "block";
                        }
                        document.getElementById("MyBartxt").innerHTML = currentLanguage[134]
                        DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversionbeta + '/Nytuo-Launcher-Setup-' + launcherversionbeta + '.exe', parentfolder3 + "/nytuolauncher_data/update.exe");
                    }

                }




            } else {
                if (portable == true) {
                    if (process.platform == "linux") {
                        if (fs.existsSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "0");
                            Toastifycation(currentLanguage[72])
                            document.getElementById("MyBartxt").innerHTML = currentLanguage[133]
                            console.log("You have to update the launcher !");
                            isUp2date = false;
                        } else {
                            if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                                Toastifycation(currentLanguage[75])
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[131]
                                console.log("You have to update the launcher !");
                                isUp2date = false;
                            }
                            if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                                console.log("Very UpToDate");
                                console.log(app.getAppPath());
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
                                verif_gameVersionLoading();
                            }
                            if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(parentfolder3 + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                                console.log("UpToDate");
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
                                verif_gameVersionLoading();
                            }
                        }


                        if (isUp2date === false) {
                            //DL bonne version
                            //Lance le programme
                            //Ferme celui là
                            if (portable == true) {
                                alert(currentLanguage[74])
                                app.exit()
                            } else {
                                if (!!document.getElementById('updateview') === true) {
                                    document.getElementById('updateview').style.display = "block";
                                }
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[129]
                                DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-Setup-' + launcherversion + '.appimage', app.getPath("documents") + "/nytuolauncher_data/update.appimage");
                            }



                        }
                    } else {
                        if (fs.existsSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "0");
                            Toastifycation(currentLanguage[72])
                            document.getElementById("MyBartxt").innerHTML = currentLanguage[132]
                            console.log("You have to update the launcher !")
                            isUp2date = false;
                        } else {
                            if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                                Toastifycation(currentLanguage[75])
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[131]
                                console.log("You have to update the launcher !")
                                isUp2date = false;
                            }
                            if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                                console.log("Very UpToDate")
                                console.log(app.getAppPath())
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
                                verif_gameVersionLoading();
                            }
                            if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                                console.log("UpToDate")
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
                                verif_gameVersionLoading();
                            }
                        }

                        if (isUp2date === false) {
                            //DL bonne version
                            //Lance le programme
                            //Ferme celui là
                            if (portable == true) {
                                alert(currentLanguage[74])
                                app.exit()
                            } else {
                                if (!!document.getElementById('updateview') === true) {
                                    document.getElementById('updateview').style.display = "block";
                                }
                                if (process.platform == 'win32') {
                                    document.getElementById("MyBartxt").innerHTML = currentLanguage[129]
                                    DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-Setup-' + launcherversion + '.exe', parentfolder3 + "/nytuolauncher_data/update.exe");
                                }
                            }


                        }
                    }
                } else {
                    if (process.platform == "linux") {
                        if (fs.existsSync(app.getPath("documents") + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/forceUpdate.txt", "0");
                            Toastifycation(currentLanguage[72])
                            document.getElementById("MyBartxt").innerHTML = currentLanguage[132]
                            console.log("You have to update the launcher !");
                            isUp2date = false;
                        } else {
                            if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                                Toastifycation(currentLanguage[75])
                                console.log("You have to update the launcher !");
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[131]
                                isUp2date = false;
                            }
                            if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                                console.log("Very UpToDate");
                                console.log(app.getAppPath());
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
                                verif_gameVersionLoading();
                            }
                            if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/LauncherVersion.txt').toString()) {
                                console.log("UpToDate");
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
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
                            document.getElementById("MyBartxt").innerHTML = "Downloading Update"
                            DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-Setup-' + launcherversion + '.appimage', app.getPath("documents") + "/nytuolauncher_data/update.appimage");


                        }
                    } else {
                        if (fs.existsSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') && fs.readFileSync(parentfolder3 + '/nytuolauncher_data/forceUpdate.txt') == '1') {
                            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "0");
                            Toastifycation(currentLanguage[72])
                            document.getElementById("MyBartxt").innerHTML = currentLanguage[132]
                            console.log("You have to update the launcher !")
                            isUp2date = false;
                        } else {
                            if (window.require('electron').remote.app.getVersion().toString() < fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                                Toastifycation(currentLanguage[75])
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[131]
                                console.log("You have to update the launcher !")
                                isUp2date = false;
                            }
                            if (window.require('electron').remote.app.getVersion().toString() > fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                                console.log("Very UpToDate")
                                console.log(app.getAppPath())
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
                                verif_gameVersionLoading();
                            }
                            if (window.require('electron').remote.app.getVersion().toString() === fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {
                                console.log("UpToDate")
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[130]
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
                                document.getElementById("MyBartxt").innerHTML = currentLanguage[129]
                                DownlaodFileUpdate('https://github.com/Nytuo/Nytuo-Launcher/releases/download/v' + launcherversion + '/Nytuo-Launcher-Setup-' + launcherversion + '.exe', parentfolder3 + "/nytuolauncher_data/update.exe");
                            }

                        }
                    }
                }



            }


        }, 5000)
    } else {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[167]
        GameAvailableOffline()

        LaunchWindowLauncherOffline()
    }
}

function verif_gameVersionLoading() {
    document.getElementById("MyBartxt").innerHTML = currentLanguage[128]

    if (window.require('electron').remote.app.getVersion().toString() >= fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString()) {


        setTimeout(function() {
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
                Toastifycation(curentLanguage[76])
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

                Toastifycation(currentLanguage[77])


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
                Toastifycation(currentLanguage[78])



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
                Toastifycation(currentLanguage[79])


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

                Toastifycation(currentLanguage[80])


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
                Toastifycation(currentLanguage[81])


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
                Toastifycation(currentLanguage[82])



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
                Toastifycation(currentLanguage[83])



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
                Toastifycation(currentLanguage[84])



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
                Toastifycation(currentLanguage[85])



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
                Toastifycation(currentLanguage[86])



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
                Toastifycation(currentLanguage[87])



            }
            ConnectionForm()

        }, 4000);




    }
}

function ConnectionForm() {
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
        ACH_SAVER();
        LID = fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/LID.txt").toString()
        win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())



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
        ACH_SAVER();
        win.removeMenu();
        if (connectedtointernet == 'true') {

            if (window.location.href == 'file:///' + dirnamew + '/Loading.html?laatim') {
                if (LAATIMU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('LAATIM')

                    win.close()


                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sfo') {
                if (SFOU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('SFO')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sf') {
                if (SFU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('SF')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?la') {
                if (LAU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('LA')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sgb') {
                if (SGBU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('SGB')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?fwd') {
                if (FWDU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('FWD')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?ttd') {
                if (TTDU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('TTD')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?tb') {
                if (TBU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('TB')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?ae') {
                if (AEU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('AE')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?wr') {
                if (WRU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('WR')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sn') {
                if (SNU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('SNRE')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
                }
            } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?vitf') {
                if (VITFU == true) {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                    LaunchGame('VITF')
                    win.close()
                } else {
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                    LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                    win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase()) //win.loadFile('index.html')
                }
            } else {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[126]

                LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()
                win.loadURL("https://launcher.nytuo.yo.fr/profile.php?lang=" + LID.toLowerCase())
            }

        } else {
            document.getElementById("MyBartxt").innerHTML = currentLanguage[125]
            GameAvailableOffline()

            LaunchWindowLauncherOffline()
        }
    }
    win.setProgressBar(-1)
    close()
}

function LaunchWindowLauncherOffline() {
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
            icon: path.join(__dirname, 'Resources/logoexp.png'),
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                enableRemoteModule: true
            },


        })
        ACH_SAVER();
        win.loadFile('index.html')


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
                icon: path.join(__dirname, 'Resources/favicon.ico'),
                webPreferences: {
                    webSecurity: false,
                    nodeIntegration: true,
                    enableRemoteModule: true
                },


            })
            //win.removeMenu()
        ACH_SAVER();
        if (window.location.href == 'file:///' + dirnamew + '/Loading.html?laatim') {
            if (LAATIMU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('LAATIM')

                win.close()


            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sfo') {
            if (SFOU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('SFO')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sf') {
            if (SFU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('SF')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?la') {
            if (LAU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('LA')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sgb') {
            if (SGBU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('SGB')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?fwd') {
            if (FWDU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('FWD')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?ttd') {
            if (TTDU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('TTD')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?tb') {
            if (TBU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('TB')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?ae') {
            if (AEU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('AE')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?wr') {
            if (WRU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('WR')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?sn') {
            if (SNU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('SNRE')
                win.close()
            }
        } else if (window.location.href == 'file:///' + dirnamew + '/Loading.html?vitf') {
            if (VITFU == true) {
                document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

                LaunchGame('VITF')
                win.close()
            }
        } else {
            win.loadFile('index.html')
        }

    }
    win.setProgressBar(-1)
    close()

}

function GameAvailableOffline() {
    if (portable == true) {
        if (process.platform == "linux") {
            if (!fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")) {
                fs.mkdirSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")
            }
            var GamesIDs = ["SFO", "LAATIM", "SGB", "SF", "LA", "VITF", "TTD", "FWD", "TB", "WR", "AE", "SNRE"]
            var t = []
            for (let i = 0; i < GamesIDs.length; i++) {
                if (fs.readdirSync(gamelocation + "/Games/" + GamesIDs[i]).length != 0) {
                    t.push(GamesIDs[i])
                }
            }
            for (let i = 0; i < t.length; i++) {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/CurrentUser/' + t[i] + '.txt', CryptoJS.AES.encrypt('true', "GamesAvailablePass"))
            }
        } else {
            if (!fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")) {
                fs.mkdirSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")
            }
            var GamesIDs = ["SFO", "LAATIM", "SGB", "SF", "LA", "VITF", "TTD", "FWD", "TB", "WR", "AE", "SNRE"]
            var t = []
            for (let i = 0; i < GamesIDs.length; i++) {
                if (fs.readdirSync(gamelocation + "/Games/" + GamesIDs[i]).length != 0) {
                    t.push(GamesIDs[i])
                }
            }
            for (let i = 0; i < t.length; i++) {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/CurrentUser/' + t[i] + '.txt', CryptoJS.AES.encrypt('true', "GamesAvailablePass"))
            }
        }
    } else {
        if (process.platform == "linux") {
            if (!fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/CurrentUser")) {
                fs.mkdirSync(app.getPath("documents") + "/nytuolauncher_data/CurrentUser")
            }
            var GamesIDs = ["SFO", "LAATIM", "SGB", "SF", "LA", "VITF", "TTD", "FWD", "TB", "WR", "AE", "SNRE"]
            var t = []
            for (let i = 0; i < GamesIDs.length; i++) {
                if (fs.readdirSync(gamelocation + "/Games/" + GamesIDs[i]).length != 0) {
                    t.push(GamesIDs[i])
                }
            }
            for (let i = 0; i < t.length; i++) {
                fs.writeFileSync(app.getPath("documents") + '/nytuolauncher_data/CurrentUser/' + t[i] + '.txt', CryptoJS.AES.encrypt('true', "GamesAvailablePass"))
            }
        } else {
            if (!fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")) {
                fs.mkdirSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")
            }
            var GamesIDs = ["SFO", "LAATIM", "SGB", "SF", "LA", "VITF", "TTD", "FWD", "TB", "WR", "AE", "SNRE"]
            var t = []
            for (let i = 0; i < GamesIDs.length; i++) {
                if (fs.readdirSync(gamelocation + "/Games/" + GamesIDs[i]).length != 0) {
                    t.push(GamesIDs[i])
                }
            }
            for (let i = 0; i < t.length; i++) {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/CurrentUser/' + t[i] + '.txt', CryptoJS.AES.encrypt('true', "GamesAvailablePass"))
            }
        }
    }



}
//download of the version files
function DLVersions() {
    if (connectedtointernet == 'true') {


        document.getElementById("MyBartxt").innerHTML = currentLanguage[124]

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
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[69]
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
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[69]
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
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[69]
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
                    document.getElementById("MyBartxt").innerHTML = currentLanguage[69]
                }
            }
        }
    } else {

    }

}

function VerifyVersionSizeAndContent(URL, empl) {
    if (fs.statSync(empl.toString()).size == 0 || fs.readFileSync(empl.toString()) == "") {
        DownlaodVersion(URL, empl)
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
                    } else {
                        return [];
                    }
                } else {
                    return []
                }
            } else {
                return []
            }

        } else if (process.platform == 'win32') {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt")) {

                LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()

                if (fs.existsSync(__dirname + '/Languages') == true) {

                    if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {

                        let t = require('fs').readFileSync(__dirname + "/Languages/LID_" + LID + ".txt", 'utf-8').split('\n');
                        let t1 = Array.from(new Set(t));
                        return t1
                    } else {
                        return [];
                    }
                } else {
                    return []
                }
            } else {
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
                    } else {
                        return [];
                    }
                } else {
                    return []
                }
            } else {
                return []
            }
        } else if (process.platform == 'win32') {
            if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt")) {

                LID = fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt").toString()

                if (fs.existsSync(__dirname + '/Languages') == true) {

                    if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {

                        let t = require('fs').readFileSync(__dirname + "/Languages/LID_" + LID + ".txt", 'utf-8').split('\n');
                        let t1 = Array.from(new Set(t));
                        return t1
                    } else {
                        return [];
                    }
                } else {
                    return []
                }
            } else {
                return []
            }
        }
    }


}

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
    req.on('response', function(data) {
        total_bytes = parseInt(data.headers['content-length']);

    });
    req.on('data', function(chunk) {
        // Update the received bytes
        received_bytes += chunk.length;


        showProgressUpdate(received_bytes, total_bytes, starte, "U");
    });
    req.on('end', function() {

        document.getElementById("prgs").className = "indeterminate"
        if (process.platform == "linux") {
            fs.rename(targetPath, app.getPath("desktop") + "/Nytuo-Launcher-linux-" + fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString() + ".appimage", (err) => {
                if (err) throw err;
            });
            console.log('Rename complete!');
            shell.openExternal(app.getPath("desktop") + "/Nytuo-Launcher-linux-" + fs.readFileSync(__dirname + '/VersionsFiles/LauncherVersion.txt').toString() + ".appimage")
            setTimeout(() => {
                app.exit();
            }, 1000);



        } else {
            shell.openExternal(parentfolder3 + "/nytuolauncher_data/update.exe")

            setTimeout(() => {
                app.exit();
            }, 1000);
        }

    });
}

function showProgressUpdate(received, total, starttime, U) {

    if (U == "U") {
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



        var elem = document.getElementById("prgs");
        elem.className = "determinate"
        elem.style.width = percentage + "%";
        document.getElementById("MyBartxt").innerHTML = percentage.toFixed() + "% -- " + bytesToSize(bps) + "/s -- " + bytesToSize(received) + "/" + bytesToSize(total) + " -- " + minutes + " : " + seconds;
        console.log(percentage.toFixed() + "% | " + received.toFixed() + " bytes out of " + total.toFixed() + " bytes.");
    } else {
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



        var elem = document.getElementById("prgs");
        elem.className = "determinate"
        elem.style.width = percentage + "%";
        document.getElementById("MyBartxt").innerHTML = currentLanguage[124] + " -- " + percentage + "%";
    }
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
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

        icon: path.join(__dirname, 'Resources/logoexp.png'),
        webPreferences: {
            webSecurity: true,
            nodeIntegration: true,
            enableRemoteModule: true
        },


    })
    if (process.platform == "linux") {
        launching.loadURL("file://" + __dirname + '/Gamelaunch.html?' + gameid)

    } else {
        launching.loadURL(__dirname + '/Gamelaunch.html?' + gameid)

    }
    win.setProgressBar(-1)

}