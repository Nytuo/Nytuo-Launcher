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
                    document.getElementById('achDone').innerHTML = currentLanguage[22]
                }
                if (percentage != "100") {
                    document.getElementById('ach').innerHTML = SFOLock.toString().split(",").join('<br/>');
                } else {
                    document.getElementById('ach').innerHTML = currentLanguage[23]
                }
            }
        } else {
            document.getElementById('achDone').innerHTML = currentLanguage[22]
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
                    document.getElementById('achDone').innerHTML = currentLanguage[22]
                }
                if (percentage != "100") {
                    document.getElementById('ach').innerHTML = SGBLock.toString().split(",").join('<br/>');
                } else {
                    document.getElementById('ach').innerHTML = currentLanguage[23]
                }
            }
        } else {
            document.getElementById('achDone').innerHTML = currentLanguage[22]
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
                    document.getElementById('achDone').innerHTML = currentLanguage[22]
                }
                if (percentage != "100") {
                    document.getElementById('ach').innerHTML = LAATIMLock.toString().split(",").join('<br/>');
                } else {
                    document.getElementById('ach').innerHTML = currentLanguage[23]
                }
            }
        } else {
            document.getElementById('achDone').innerHTML = currentLanguage[22]
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
                    document.getElementById('achDone').innerHTML = currentLanguage[22]
                }
                if (percentage != "100") {
                    document.getElementById('ach').innerHTML = SNRELock.toString().split(",").join('<br/>');
                } else {
                    document.getElementById('ach').innerHTML = currentLanguage[23]
                }
            }
        } else {
            document.getElementById('achDone').innerHTML = currentLanguage[22]
            document.getElementById('ach').innerHTML = AchlistSNRE.toString().split(",").join('<br/>');
        }

    }
}