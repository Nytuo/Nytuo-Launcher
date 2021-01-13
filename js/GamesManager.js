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


} //Games.html page style
//modify to add games
function detectgamepage() {

    //Global Trad
    document.getElementById("SETTINGSTXT").innerHTML = currentLanguage[5];
    document.getElementById("downloadbtn").innerHTML = currentLanguage[100];
    document.getElementById("CANCELTXT").innerHTML = currentLanguage[16];
    document.getElementById("CANCELTXT2").innerHTML = currentLanguage[16];
    document.getElementById("CANCELTXT3").innerHTML = currentLanguage[16];
    document.getElementById("CANCELTXT4").innerHTML = currentLanguage[16];
    document.getElementById("CANCELTXT5").innerHTML = currentLanguage[16];
    document.getElementById("downloadbtn2").innerHTML = currentLanguage[16];
    document.getElementById("DLTEXT").innerHTML = currentLanguage[101];
    document.getElementById("ACHTXT").innerHTML = currentLanguage[21];
    document.getElementById("ACHTXTU").innerHTML = currentLanguage[18];
    document.getElementById("ACHTXTL").innerHTML = currentLanguage[19];
    document.getElementById("ACHBACK").innerHTML = currentLanguage[20];
    document.getElementById("AGREEPO").innerHTML = currentLanguage[102];
    document.getElementById("AGREEPO2").innerHTML = currentLanguage[102];
    document.getElementById("ABOUTPLAY").innerHTML = currentLanguage[104];
    document.getElementById("AGREEREPAIR").innerHTML = currentLanguage[105];
    document.getElementById("DATALOSS").innerHTML = currentLanguage[99];
    document.getElementById("DATALOSS2").innerHTML = currentLanguage[99];
    document.getElementById("REPAIRTXT2").innerHTML = currentLanguage[98];
    document.getElementById("AGREEREI").innerHTML = currentLanguage[106];
    document.getElementById("REINSTALLTXT2").innerHTML = currentLanguage[107];
    document.getElementById("CONFIRM").innerHTML = currentLanguage[13];
    document.getElementById("DELETE").innerHTML = currentLanguage[14];
    document.getElementById("ACTIONUNDONE").innerHTML = currentLanguage[15];
    document.getElementById("AGREETXT").innerHTML = currentLanguage[17];

    if (process.platform == 'linux') {
        if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
            document.getElementById("BG").className = "IMGBGSFO";
            document.getElementById("LOGOCARD").src = "Resources/LogoSFO3.png";

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
            document.getElementById("GAMEJOLT").innerHTML = currentLanguage[97]
            document.getElementById("myBar").style.backgroundColor = "##cc3333";
            document.getElementById("BarAch").style.backgroundColor = "##cc3333";
            document.getElementById("BarAch").style.color = "black";
            document.getElementById("shortcuts").onclick = 0;
            document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick = 0;
            //  document.getElementById("SAVES").innerHTML = "";
            document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4]
            document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
            document.getElementById("BG").className = "IMGBGLAATIM";
            document.getElementById("LOGOCARD").src = "Resources/LogoLAATIM2.png";

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
            document.getElementById("SAVES").onclick = 0;
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            document.getElementById("BG").className = "IMGBGSGB";
            document.getElementById("LOGOCARD").src = "Resources/SGB3.png";

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
            document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4]
            document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            document.getElementById("BG").className = "IMGBGSF";
            document.getElementById("LOGOCARD").src = "Resources/sflogo.png";

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
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            document.getElementById("BG").className = "IMGBGLA";
            document.getElementById("LOGOCARD").src = "Resources/LA_logo.png";

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
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            document.getElementById("BG").className = "IMGBGVITF";
            document.getElementById("LOGOCARD").src = "Resources/VITF_Logo.png";

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
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            document.getElementById("BG").className = "IMGBGTTD";
            document.getElementById("LOGOCARD").src = "Resources/LogoTTD.png";

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
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            document.getElementById("BG").className = "IMGBGFWD";
            document.getElementById("LOGOCARD").src = "Resources/LogoFWD.png";

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
            document.getElementById("SAVES").innerHTML = "";
            document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]

        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
            document.getElementById("BG").className = "IMGBGTB";
            document.getElementById("LOGOCARD").src = "Resources/tbvertLogo.png";

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
            document.getElementById("SAVES").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
            document.getElementById("BG").className = "IMGBGWR";
            document.getElementById("LOGOCARD").src = "Resources/LogoWR.png";

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
            document.getElementById("SAVES").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
            document.getElementById("BG").className = "IMGBGAE";
            document.getElementById("LOGOCARD").src = "Resources/AELogo.png";

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
            document.getElementById("SAVES").innerHTML = "";
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            document.getElementById("BG").className = "IMGBGSN";
            document.getElementById("LOGOCARD").src = "Resources/LogoSNRE.png";

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
            document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4]
            document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SNCTXT2").innerHTML = currentLanguage[103]
            document.getElementById("SNCTXT").innerHTML = currentLanguage[108]


        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            document.getElementById("BG").className = "IMGBGSFO";
            document.getElementById("LOGOCARD").src = "Resources/LogoSFO3.png";
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
            document.getElementById("GAMEJOLT").innerHTML = currentLanguage[97];
            document.getElementById("myBar").style.backgroundColor = "#cc3333";
            document.getElementById("BarAch").style.backgroundColor = "#cc3333";
            document.getElementById("BarAch").style.color = "black";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            //document.getElementById("button2").onclick= 0;
            //document.getElementById("button2").innerHTML = "";
            //document.getElementById("SAVES").onclick= 0;
            //document.getElementById("SAVES").innerHTML = "";
            document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4]
            document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]


        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            document.getElementById("BG").className = "IMGBGLAATIM";
            document.getElementById("LOGOCARD").src = "Resources/LogoLAATIM2.png";
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
            document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            document.getElementById("BG").className = "IMGBGSGB";
            document.getElementById("LOGOCARD").src = "Resources/SGB3.png";
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
            document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4]
            document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            document.getElementById("BG").className = "IMGBGSF";
            document.getElementById("LOGOCARD").src = "Resources/sflogo.png";

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
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            document.getElementById("BG").className = "IMGBGLA";
            document.getElementById("LOGOCARD").src = "Resources/LA_logo.png";

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
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            document.getElementById("BG").className = "IMGBGVITF";
            document.getElementById("LOGOCARD").src = "Resources/VITF_Logo.png";

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
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            document.getElementById("BG").className = "IMGBGTTD";
            document.getElementById("LOGOCARD").src = "Resources/LogoTTD.png";

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
            //document.getElementById("SAVES").onclick = 0;
            //document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            document.getElementById("BG").className = "IMGBGFWD";
            document.getElementById("LOGOCARD").src = "Resources/LogoFWD.png";

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
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            document.getElementById("BG").className = "IMGBGTB";
            document.getElementById("LOGOCARD").src = "Resources/tbvertLogo.png";

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
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            document.getElementById("BG").className = "IMGBGWR";
            document.getElementById("LOGOCARD").src = "Resources/LogoWR.png";

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
            document.getElementById("SAVES").innerHTML = "";
            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            document.getElementById("BG").className = "IMGBGAE";
            document.getElementById("LOGOCARD").src = "Resources/AELogo.png";

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
            document.getElementById("SAVES").innerHTML = "";

            //document.getElementById("shortcuts").onclick = 0;
            //document.getElementById("shortcuts").innerHTML = "";
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            document.getElementById("BG").className = "IMGBGSN";
            document.getElementById("LOGOCARD").src = "Resources/LogoSNRE.png";

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
            document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4]
            document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6]
            document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7]
            document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8]
            document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9]
            document.getElementById("OGLTXT").innerHTML = currentLanguage[10]
            document.getElementById("SVTXT").innerHTML = currentLanguage[11]
            document.getElementById("SHORTTXT").innerHTML = currentLanguage[12]
            document.getElementById("SNCTXT2").innerHTML = currentLanguage[103]
            document.getElementById("SNCTXT").innerHTML = currentLanguage[108]

        }
    }

}
//delete folder of a game
//modify to add games
function deletefolder(folder2delete) {
    ACH_SAVER()
    rimraf(folder2delete, function() { console.log("done"); });
    setTimeout(function() {
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
            window.location.href = __dirname + '/index.html'
        } else {
            window.location.href = __dirname + '/index.html'

        }
    } else {
        if (process.platform == "linux") {
            window.location.href = __dirname + '/index.html'

        } else {
            window.location.href = __dirname + '/index.html'

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
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
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
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            deletefolder(gamelocation + '/Games/SNRE');
        }
    }

}
//select repair link by games
//modify to add games
function REINSTALL_DETECT() {
    if (connectedtointernet == 'true') {


        document.getElementById("pgrs").style.display = "block"
        document.getElementById('downloadbtn').classList.add("disabled")
        document.getElementById("DLTEXT").innerHTML = currentLanguage[95]
        document.getElementById("resultofcalculsize").innerHTML = currentLanguage[96]
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
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
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
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
                repair('https://1drv.ws/u/s!AkkqGntQc7Y5hJpghoWFNZQhB7ByHQ?e=i6gk1D', 'SNRE', 'SN.zip', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJpie9qVRQt7SeDbPA?e=CovaHD', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJphlk_l4IVAusN0Xg?e=aagdu7');
            }
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
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
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
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            OpenEmpl(gamelocation + '/Games/SNRE/');
        }
    }

}
//create shortcut
function createlink(gameid, path2link, desc, iconpath) {

    ws.create(path2link, {
        target: 'nytuo://launchid/' + gameid.toString().toLowerCase(),
        icon: iconpath,
        desc: desc
    });


}
//shortcut by games
//modify to add games
function SHORTCUT_DETECT() {
    if (process.platform == "linux") {
        Toastifycation("This is not available for your platform : Linux")
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            createlink('SFO', require('path').join(require('os').homedir(), 'Desktop/ShootFighter Origins.lnk'), "Launch ShootFighter Origins", __dirname + '/Resources/LogoSFO.ico')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            createlink('LAATIM', require('path').join(require('os').homedir(), 'Desktop/Legend Adventure and the Infernal Maze.lnk'), "Launch Legend Adventure and the Infernal Maze", __dirname + '/Resources/LAATIM.ico')
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            createlink("SGB", require('path').join(require('os').homedir(), 'Desktop/Super Geoffrey Bros.lnk'), "Launch Super Geoffrey Bros", __dirname + "/Resources/SGB.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            createlink("SF", require('path').join(require('os').homedir(), 'Desktop/Shootfighter.lnk'), "Launch ShootFighter", __dirname + "/Resources/SF.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            createlink("LA", require('path').join(require('os').homedir(), 'Desktop/Lutin Adventure.lnk'), "Launch Lutin Adventure", __dirname + "/Resources/LA.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            createlink("VITF", require('path').join(require('os').homedir(), 'Desktop/Vincent In The Forest.lnk'), "Launch Vincent In The Forest", __dirname + "/Resources/VITF.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            createlink("TTD", require('path').join(require('os').homedir(), 'Desktop/The Tardis Defender.lnk'), "Launch The Tardis Defender", __dirname + "/Resources/TTD.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            createlink("FWD", require('path').join(require('os').homedir(), 'Desktop/FireWall Defender.lnk'), "Launch FireWall Defender", __dirname + "/Resources/FWD.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            createlink("TB", require('path').join(require('os').homedir(), 'Desktop/TanksBattle.lnk'), "Launch TanksBattle", __dirname + "/Resources/TB.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            createlink("WR", require('path').join(require('os').homedir(), 'Desktop/WinRun.lnk'), "Launch WinRun", __dirname + "/Resources/WR.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            createlink("AE", require('path').join(require('os').homedir(), 'Desktop/Asteroid Escape.lnk'), "Launch AsteroidEscape", __dirname + "/Resources/AE.ico")
        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            createlink("SNRE", require('path').join(require('os').homedir(), 'Desktop/Sans Nom Rééditon.lnk'), "Launch SansNom Réédition", __dirname + "/Resources/SNRE.ico")
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
            Toastifycation(currentLanguage[66])
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            Do('SGB', 'SGB_Version.txt', 'https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz', 'SGB.zip', 'SGB_Version.txt', 'nw.exe', 'Super Geoffrey Bros', 'nw', 'nwjs.app', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJoopV-SOJfhLYFSvA?e=9JoMti', 'https://1drv.ws/u/s!AkkqGntQc7Y5hJopCrrDVVHteOUoaw?e=pbdjt4');
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            Toastifycation(currentLanguage[66])
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            Toastifycation(currentLanguage[66])
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            Toastifycation(currentLanguage[66])
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
            Toastifycation(currentLanguage[66])
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
    if (connectedtointernet == 'true') {

        document.getElementById("pgrs").style.display = "block"
        document.getElementById('downloadbtn').classList.add("disabled")
        document.getElementById("DLTEXT").innerHTML = currentLanguage[93]
        document.getElementById("resultofcalculsize").innerHTML = currentLanguage[94]
        if (process.platform == "linux") {
            if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
                MANIFEST("LAATIM", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMLop9BFbFjQhVpNw?e=KU3c67", ""); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
                MANIFEST("SFO", "https://1drv.ws/t/s!AkkqGntQc7Y5lPIK_zGx_kfkA8569g?e=5ckcSQ", "https://1drv.ws/t/s!AkkqGntQc7Y5lPILhJmXjvQMG74hng?e=dv0NEE"); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
                MANIFEST("SGB", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMYBHbsa5ePOgYigw?e=aJKqBp", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMZfv6_Jl3FK5nVAQ?e=wnKQvb"); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
                MANIFEST("SF", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMUmwvmdb9g2RrMQA?e=mcufGS", ""); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
                MANIFEST("LA", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMMC8O94dNl4WMRdQ?e=KBsTyb", ""); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
                MANIFEST("VITF", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMV2s--dp3uhzwj1g?e=rxqmWc", ""); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
                MANIFEST("TTD", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMWubV37rm19zRPfg?e=MNhglm", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMXODfbhZ1TWXNRhQ?e=tvbccu"); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
                MANIFEST("SNRE", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMNRM1nqxBQLCV_sA?e=q1iZXG", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMOdDbgYEYHbEe-eQ?e=GVUoOg"); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
                MANIFEST("FWD", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMJiX8ota-whvycjw?e=kdNK30", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMPVkX9ewA0NMPTWA?e=TN36WT"); //check
            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
                MANIFEST("TB", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMSB_w7Aw5cycFT8Q?e=ZNS9TZ", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMTWFqo7ym6LB7y-w?e=Zqpmeq"); //check

            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
                MANIFEST("WR", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMQjp86jd0g24s8QQ?e=A6erp6", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMRJix-OKppfQQPNg?e=QETro3"); //check

            }
            if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
                MANIFEST("AE", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMI0WXMA3l57t02DA?e=kchURe", ""); //check
            }
        } else {
            if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
                MANIFEST("LAATIM", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMLop9BFbFjQhVpNw?e=KU3c67", ""); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
                MANIFEST("SGB", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMYBHbsa5ePOgYigw?e=aJKqBp", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMZfv6_Jl3FK5nVAQ?e=wnKQvb"); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
                MANIFEST("SFO", "https://1drv.ws/t/s!AkkqGntQc7Y5lPIK_zGx_kfkA8569g?e=5ckcSQ", "https://1drv.ws/t/s!AkkqGntQc7Y5lPILhJmXjvQMG74hng?e=dv0NEE"); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
                MANIFEST("SF", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMUmwvmdb9g2RrMQA?e=mcufGS", ""); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
                MANIFEST("LA", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMMC8O94dNl4WMRdQ?e=KBsTyb", ""); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
                MANIFEST("VITF", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMV2s--dp3uhzwj1g?e=rxqmWc", ""); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
                MANIFEST("TTD", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMWubV37rm19zRPfg?e=MNhglm", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMXODfbhZ1TWXNRhQ?e=tvbccu"); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
                MANIFEST("SNRE", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMNRM1nqxBQLCV_sA?e=q1iZXG", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMOdDbgYEYHbEe-eQ?e=GVUoOg"); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
                MANIFEST("FWD", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMJiX8ota-whvycjw?e=kdNK30", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMPVkX9ewA0NMPTWA?e=TN36WT"); //check
            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
                MANIFEST("TB", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMSB_w7Aw5cycFT8Q?e=ZNS9TZ", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMTWFqo7ym6LB7y-w?e=Zqpmeq"); //check

            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
                MANIFEST("WR", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMQjp86jd0g24s8QQ?e=A6erp6", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMRJix-OKppfQQPNg?e=QETro3"); //check

            }
            if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
                MANIFEST("AE", "https://1drv.ws/t/s!AkkqGntQc7Y5jPMI0WXMA3l57t02DA?e=kchURe", ""); //check
            }
        }
    }

}

function MANIFEST_GENERATOR(dossiertomanifest) {
    const getAllFiles = function(dirPath, arrayOfFiles) {
        files = fs.readdirSync(dirPath)


        arrayOfFiles = arrayOfFiles || []
        var BlackList = ["AchDone.txt"]

        files.forEach(function(file) {
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


    setTimeout(function() {
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
                    Toastifycation(GameName + currentLanguage[92])
                    REINSTALL_DETECT();
                } else {

                    Toastifycation(GameName + currentLanguage[91])
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
                    Toastifycation(GameName + currentLanguage[92])
                    REINSTALL_DETECT();
                } else {

                    Toastifycation(GameName + currentLanguage[91])
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
                    Toastifycation(GameName + currentLanguage[92])
                    REINSTALL_DETECT();
                } else {

                    Toastifycation(GameName + currentLanguage[91])
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
                    Toastifycation(GameName + currentLanguage[92])
                    REINSTALL_DETECT();
                } else {

                    Toastifycation(GameName + currentLanguage[91])
                    mat.Modal.getInstance(document.getElementById("modal8")).close()

                }
            }
        }
    }, 5000);
}
//Detection for windows games only
//modify to add games
function detectforWin(dossierdujeu, versiontxt, versionlcl, gamename, txtVID, url) {
    rebuildGameFolderTree()
    if (connectedtointernet == 'true') {
        if (process.platform === "win32") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === false) {
                document.getElementById("button1").innerHTML = currentLanguage[3];

                CalculSize(url, gamename, currentLanguage[164]);

                document.getElementById(txtVID).innerHTML = currentLanguage[61];
                if (!!document.getElementById("button2") === true) {
                    document.getElementById("button2").onclick = 0;
                    document.getElementById("button2").innerHTML = "";
                }

                document.getElementById("button3").onclick = 0;
                document.getElementById("button3").innerHTML = "";
            } else {
                if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                    document.getElementById("button1").innerHTML = currentLanguage[1];
                    document.getElementById('resultofcalculsize').innerHTML = currentLanguage[0] + " : " + gamename;
                    document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                } else {
                    document.getElementById("button1").innerHTML = currentLanguage[2];

                    CalculSize(url, gamename, currentLanguage[2]);
                    document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + currentLanguage[63];
                    Toastifycation(currentLanguage[64] + gamename + currentLanguage[65])
                }
            }
        } else {
            if (process.platform !== "win32") {
                document.getElementById(txtVID).innerHTML = currentLanguage[66];
                if (!!document.getElementById("button2") === true) {
                    document.getElementById("button2").onclick = 0;
                    document.getElementById("button2").innerHTML = "";
                }
                document.getElementById("button1").onclick = 0;
                document.getElementById("button1").href = "#";

                document.getElementById("button3").onclick = 0;
                document.getElementById("button1").innerHTML = currentLanguage[68];
                document.getElementById("button3").innerHTML = "";

            }
        }
    } else {
        if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) === true) {
            document.getElementById("button1").innerHTML = currentLanguage[1];
            document.getElementById('resultofcalculsize').innerHTML = currentLanguage[0] + " : " + gamename;
            document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
        } else {
            Toastifycation(currentLanguage[68])
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
                document.getElementById("button1").innerHTML = currentLanguage[3];
                CalculSize(url, gamename, currentLanguage[164]);
                document.getElementById(txtVID).innerHTML = currentLanguage[61];
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
                            document.getElementById("button1").innerHTML = currentLanguage[1];
                            document.getElementById('resultofcalculsize').innerHTML = currentLanguage[0] + " : " + gamename;
                            document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                        } else {
                            document.getElementById("button1").innerHTML = currentLanguage[2];
                            CalculSize(url, gamename, currentLanguage[2]);
                            document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + currentLanguage[63];
                            Toastifycation(currentLanguage[64] + gamename + currentLanguage[65]);
                        }
                    } else {
                        if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/' + versionlcl).toString()) {
                            document.getElementById("button1").innerHTML = currentLanguage[1];
                            document.getElementById('resultofcalculsize').innerHTML = currentLanguage[0] + " : " + gamename;
                            document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                        } else {
                            document.getElementById("button1").innerHTML = currentLanguage[2];
                            CalculSize(url, gamename, currentLanguage[2]);
                            document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + currentLanguage[63];
                            Toastifycation(currentLanguage[64] + gamename + currentLanguage[65])
                        }
                    }

                } else {
                    if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() === fs.readFileSync(__dirname + '/VersionsFiles/' + versionlcl).toString()) {
                        document.getElementById("button1").innerHTML = currentLanguage[1];
                        document.getElementById('resultofcalculsize').innerHTML = currentLanguage[0] + " : " + gamename;
                        document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
                    } else {
                        document.getElementById("button1").innerHTML = currentLanguage[2];

                        CalculSize(url, gamename, currentLanguage[2]);
                        document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString() + currentLanguage[63];
                        Toastifycation(currentLanguage[64] + gamename + currentLanguage[65])
                    }
                }


            }

        } else {
            document.getElementById(txtVID).innerHTML = currentLanguage[66];
            if (!!document.getElementById("button2") === true) {
                document.getElementById("button2").onclick = 0;
                document.getElementById("button2").innerHTML = "";
            }
            document.getElementById("button1").onclick = 0;
            document.getElementById("button1").href = "#";

            document.getElementById("button3").onclick = 0;
            document.getElementById("button1").innerHTML = currentLanguage[67];
            document.getElementById("button3").innerHTML = "";
        }
    } else {
        if (process.platform = "linux") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) == true) {
                document.getElementById("button1").innerHTML = currentLanguage[1];
                document.getElementById('resultofcalculsize').innerHTML = currentLanguage[0] + " : " + gamename;
                document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
            }
        } else if (process.platform = "win32") {
            if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt) == true) {
                document.getElementById("button1").innerHTML = currentLanguage[1];
                document.getElementById('resultofcalculsize').innerHTML = currentLanguage[0] + " : " + gamename;
                document.getElementById(txtVID).innerHTML = currentLanguage[62] + fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + '/' + versiontxt).toString();
            }
        } else {
            Toastifycation(currentLanguage[66])
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

function DownlaodVersion(file_url, targetPath) {
    const { BrowserWindow } = require('electron').remote;
    let win = BrowserWindow.getFocusedWindow();
    win.setProgressBar(2)
    only_one = true
    var received_bytes = 0;
    var total_bytes = 0;
    var req = request({
        method: 'GET',
        uri: file_url
    });
    var out = fs.createWriteStream(targetPath);
    req.pipe(out);
    req.on('response', function(data) {
        total_bytes = parseInt(data.headers['content-length']);
    });
    req.on('data', function(chunk) {
        received_bytes += chunk.length;
    });
    req.on('end', function() {
        win.setProgressBar(-1)
    })
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
    req.on('response', function(data) {
        total_bytes = parseInt(data.headers['content-length']);

    });
    req.on('data', function(chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes, starte); //show progress in progress-bar
    });
    req.on('end', function() {
        const { BrowserWindow } = require('electron').remote;
        let win = BrowserWindow.getFocusedWindow();
        var elem = document.getElementById("myBar");
        elem.style.width = 0;
        elem.className = "indeterminate"
        win.setProgressBar(2)
        document.getElementById('downloadbtn2').classList.add("disabled")
        document.getElementById("DLTEXT").innerHTML = currentLanguage[29]
        document.getElementById("resultofcalculsize").innerHTML = currentLanguage[30]
        extractzipgame(targetPath, dossierdujeu); // extract the downloaded file
    });
}
//Show the progress of download
function showProgress(received, total, starttime) {


    const { BrowserWindow } = require('electron').remote;
    let win = BrowserWindow.getFocusedWindow();
    var percentage = (received * 100) / total;
    var elem = document.getElementById("myBar");
    elem.className = "determinate"
    document.getElementById("DLTEXT").innerHTML = currentLanguage[31]
    document.getElementById("resultofcalculsize").innerHTML = currentLanguage[32]

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
    win.setProgressBar(percentage / 100)
    document.getElementById("MyBartxt").innerHTML = bytesToSize(bps) + "/s -- " + minutes + " " + currentLanguage[33] + seconds + " " + currentLanguage[34] + " (" + bytesToSize(received) + "/" + bytesToSize(total) + ")";
    console.log(percentage.toFixed() + "% | " + received.toFixed() + " bytes out of " + total.toFixed() + " bytes.");


}
//Download redirect
function DL(url, dossierdujeu, nomdufichier) {
    if (connectedtointernet == 'true') {

        console.log("DL phase 1")
        DownlaodFile(url, gamelocation + "/Games/" + dossierdujeu + "/" + nomdufichier, gamelocation + "/Games/" + dossierdujeu)
    }
}
//extract zip
function extractzipgame(zippath, destpath) {
    console.log(zippath, { dir: destpath });
    extract(zippath, { dir: destpath }, function(err) {
        deletefile(zippath)
    })
}

//delete a file
//modify to add games
function deletefile(file2delete) {
    const { BrowserWindow } = require('electron').remote;
    let win = BrowserWindow.getFocusedWindow();
    win.setProgressBar(2)
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
        Toastifycation(currentLanguage[35])
    }
    if (file2delete === gamelocation + "/Games/SFO/SFO.zip") {
        Toastifycation(currentLanguage[36])
    }
    if (file2delete === gamelocation + "/Games/LAATIM/LA_IM.zip") {
        Toastifycation(currentLanguage[37])
    }
    if (file2delete === gamelocation + "/Games/SF/SF.zip") {
        Toastifycation(currentLanguage[38])
    }
    if (file2delete === gamelocation + "/Games/LA/LA.zip") {
        Toastifycation(currentLanguage[39])
    }
    if (file2delete === gamelocation + "/Games/AE/AE.zip") {
        Toastifycation(currentLanguage[40])
    }
    if (file2delete === gamelocation + "/Games/SNRE/SNRE.zip") {
        Toastifycation(currentLanguage[41])
    }
    if (file2delete === gamelocation + "/Games/SGB/SGB.zip") {

        Toastifycation(currentLanguage[42])
    }
    if (file2delete === gamelocation + "/Games/TTD/TTD.zip") {
        Toastifycation(currentLanguage[43])
    }
    if (file2delete === gamelocation + "/Games/TB/TB.zip") {
        Toastifycation(currentLanguage[44])
    }
    if (file2delete === gamelocation + "/Games/FWD/FWD.zip") {
        Toastifycation(currentLanguage[45])
    }
    if (file2delete === gamelocation + "/Games/VITF/VITF.zip") {
        Toastifycation(currentLanguage[46])
    }
    if (file2delete === gamelocation + "/Games/WR/WR.zip") {
        Toastifycation(currentLanguagea[47])
    }
    win.setProgressBar(-1)

    setTimeout(function() {
        if (connectedtointernet == 'true') {
            if (portable == true) {
                if (process.platform == 'linux') {
                    window.location.reload()
                } else {
                    window.location.reload()
                }
            } else {
                if (process.platform == "linux") {
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            }
        } else {
            window.location.reload();
        }

    }, 2000);
    ACH_RECUP();
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
                    setTimeout(function() {
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
            Toastifycation(currentLanguage[70])
        }

    }
    if (process.platform !== "win32") {
        Toastifycation(gamename + currentLanguage[71])
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
                    setTimeout(function() {
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
            Toastifycation(currentLanguage[70])
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
                        setTimeout(function() {
                            DL(URLinux, dossierdujeu, zipname);
                        }, 5000);

                    }
                } else {
                    if (fs.readFileSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt).toString() === fs.readFileSync(app.getPath("documents") + '/nytuolauncher_data/VersionsFiles/' + versionlcl).toString()) {
                        LaunchGame(dossierdujeu)

                    } else {
                        isInUpdate = true;
                        deletefolderforrepair(gamelocation + '/Games/' + dossierdujeu);
                        setTimeout(function() {
                            DL(URLinux, dossierdujeu, zipname);
                        }, 5000);

                    }
                }

            }

        } else if (fs.existsSync(gamelocation + '/Games/' + dossierdujeu + "/" + versiontxt) === true) {
            LaunchGame(dossierdujeu)

        } else {
            Toastifycation(currentLanguage[70])
        }

    }
    if (process.platform != "linux" && process.platform != "win32") {
        Toastifycation(gamename + currentLanguage[71])
    }
    ACH_SAVER();
}
//repair a game
function repair(url, dossier, zip, urlinux, urlmac) {
    const { BrowserWindow } = require('electron').remote;
    let win = BrowserWindow.getFocusedWindow();
    win.setProgressBar(2)
    console.log(gamelocation + "/Games/" + dossier)
    deletefolderforrepair(gamelocation + "/Games/" + dossier);
    setTimeout(function() {
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
    rimraf(folder2delete, function() { console.log("done"); });

    setTimeout(function() {
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

    setTimeout(function() {}, 1000)
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const path = require('path')
    const win = new BrowserWindow({
        minHeight: 480,
        minWidth: 720,
        height: 480,
        width: 720,
        icon: path.join(__dirname, 'Resources/logoexp.png')
    });
    win.loadURL(url);
    if (gamejolt === 'true') {
        setTimeout(function() {
            win.close();
        }, 5000)
    }
}

function LaunchExternally() {

    var page
    if (process.platform == 'linux') {
        if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
            page = "https://nytuo.yo.fr/sn.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
            page = "https://nytuo.yo.fr/ae.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
            page = "https://nytuo.yo.fr/wr.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
            page = "https://nytuo.yo.fr/tb.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
            page = "https://nytuo.yo.fr/fwd.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
            page = "https://nytuo.yo.fr/ttd.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
            page = "https://nytuo.yo.fr/vitf.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
            page = "https://nytuo.yo.fr/la.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
            page = "https://nytuo.yo.fr/sf.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
            page = "https://nytuo.yo.fr/sgb.html"
        }
        if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
            page = "https://nytuo.yo.fr/laatim.html"
        }
    } else {
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
            page = "https://nytuo.yo.fr/sfo.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
            page = "https://nytuo.yo.fr/laatim.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
            page = "https://nytuo.yo.fr/sgb.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
            page = "https://nytuo.yo.fr/sf.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
            page = "https://nytuo.yo.fr/la.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
            page = "https://nytuo.yo.fr/vitf.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
            page = "https://nytuo.yo.fr/ttd.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
            page = "https://nytuo.yo.fr/fwd.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
            page = "https://nytuo.yo.fr/tb.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
            page = "https://nytuo.yo.fr/wr.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
            page = "https://nytuo.yo.fr/ae.html"

        }
        if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
            page = "https://nytuo.yo.fr/sn.html"

        }
    }
    if (page != "") {
        window.open(page);
    }

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


}