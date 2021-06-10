/*
License (GNU GPL V3 you can find it on the internet or on the root of the source code (if you are on the compiled app : root/resources/app/)):
Copyright (C) 2021  Nytuo (Arnaud BEUX)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.*/

var connectedtointernet = connectest();

function connectest() {
  if (portable == true) {
    if (process.platform == "linux" || process.platform == "darwin") {
      return fs
        .readFileSync(parentfolder3 + "/nytuolauncher_data/connected.txt")
        .toString();
    } else {
      return fs.readFileSync(__dirname + "/connected.txt").toString();
    }
  } else {
    if (process.platform == "linux" || process.platform == "darwin") {
      return fs
        .readFileSync(
          app.getPath("documents") + "/nytuolauncher_data/connected.txt"
        )
        .toString();
    } else {
      return fs.readFileSync(__dirname + "/connected.txt").toString();
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

function ChangesLogs_Load(gameId) {
  if (portable_check() == true) {
    if (process.platform == "linux") {
      return fs
        .readFileSync(
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/" + gameId + ".txt"
        )
        .toString();
    } else {
      return fs
        .readFileSync(__dirname + "/ChangesLogs/" + gameId + ".txt")
        .toString();
    }
  } else {
    if (process.platform == "linux") {
      return fs
        .readFileSync(
          app.getPath("documents") +
            "/nytuolauncher_data/ChangesLogs/" +
            gameId +
            ".txt"
        )
        .toString();
    } else {
      return fs
        .readFileSync(__dirname + "/ChangesLogs/" + gameId + ".txt")
        .toString();
    }
  }
}
//Games.html page style
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
  document.getElementById("AbortTuto").innerHTML = currentLanguage[176];

  if (process.platform == "linux") {
    if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
      document.getElementById("BG").className = "IMGBGSFO";
      document.getElementById("LOGOCARD").src = "Resources/LogoSFO3.png";

      document.getElementById("NAME").innerHTML = "ShootFighter Origins";
      document.getElementById("NAME2").innerHTML = "ShootFighter Origins";
      document.getElementById("NAME3").innerHTML = "ShootFighter Origins";
      document.getElementById("NAME5").innerHTML = "ShootFighter Origins";
      document.getElementById("NAME4").innerHTML = "ShootFighter Origins";
      document.getElementById("DETECTION").onclick = detect(
        "SFO",
        "SFO_Version.txt",
        "SFO_Version.txt",
        "ShootFighter Origins",
        "versiontxt"
      );
      //document.getElementById("ONLINEPLAY").onclick = 0;
      //document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = currentLanguage[97];
      document.getElementById("myBar").style.backgroundColor = "##cc3333";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.backgroundColor = "##cc3333";
      document.getElementById("BarAch").style.color = "black";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      //document.getElementById("button2").onclick= 0;
      //document.getElementById("button2").innerHTML = "";
      //document.getElementById("SAVES").onclick = 0;
      //  document.getElementById("SAVES").innerHTML = "";
      document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4];
      document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6];
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("SFO");

      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
      document.getElementById("BG").className = "IMGBGLAATIM";
      document.getElementById("LOGOCARD").src = "Resources/LogoLAATIM2.png";

      document.getElementById("NAME").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("NAME2").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("NAME3").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("NAME4").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("NAME5").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("DETECTION").onclick = detectforWin(
        "LAATIM",
        "LAIM_Version.txt",
        "LAIM_Version.txt",
        "Legend Adventure And The Infernal Maze",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#008C3F";
      document.getElementById("BarAch").style.backgroundColor = "#008C3F";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";

      //document.getElementById("button2").onclick= 0;
      //document.getElementById("button2").innerHTML = "";
      document.getElementById("SAVES").onclick = 0;
      document.getElementById("changes").innerHTML = ChangesLogs_Load("LAATIM");

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
      document.getElementById("DETECTION").onclick = detect(
        "SGB",
        "SGB_Version.txt",
        "SGB_Version.txt",
        "Super Geoffrey Bros",
        "versiontxt"
      );
      //document.getElementById("ONLINEPLAY").onclick = 0;
      //document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML =
        "The online version is the same of the downloadable one.But the achievements system doesn't work.";
      document.getElementById("myBar").style.backgroundColor = "#FBCF08";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.backgroundColor = "#FBCF08";
      document.getElementById("BarAch").style.color = "black";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      //document.getElementById("button2").onclick= 0;
      //document.getElementById("button2").innerHTML = "";
      //document.getElementById("SAVES").onclick = 0;
      //  document.getElementById("SAVES").innerHTML = "";
      document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4];
      document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6];
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("SGB");

      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
      document.getElementById("BG").className = "IMGBGSF";
      document.getElementById("LOGOCARD").src = "Resources/sflogo.png";

      document.getElementById("NAME").innerHTML = "ShootFighter";
      document.getElementById("NAME2").innerHTML = "ShootFighter";
      document.getElementById("NAME3").innerHTML = "ShootFighter";
      document.getElementById("NAME4").innerHTML = "ShootFighter";
      document.getElementById("NAME5").innerHTML = "ShootFighter";
      document.getElementById("DETECTION").onclick = detectforWin(
        "SF",
        "VersionSF.txt",
        "SF_Version.txt",
        "ShootFighter",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#D40A10";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.backgroundColor = "#D40A10";
      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("changes").innerHTML = ChangesLogs_Load("SF");
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
      document.getElementById("DETECTION").onclick = detectforWin(
        "LA",
        "VersionLA.txt",
        "LA_Version.txt",
        "Lutin Adventure",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#40C101";
      document.getElementById("BarAch").style.backgroundColor = "#40C101";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("changes").innerHTML = ChangesLogs_Load("LA");
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
      document.getElementById("DETECTION").onclick = detectforWin(
        "VITF",
        "VersionVITF.txt",
        "VITF_Version.txt",
        "Vincent In The Forest",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#05B311";
      document.getElementById("BarAch").style.backgroundColor = "#05B311";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("changes").innerHTML = ChangesLogs_Load("VITF");

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
      document.getElementById("DETECTION").onclick = detect(
        "TTD",
        "VersionTTD.txt",
        "TTD_Version.txt",
        "The tardis Defender",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#436B8C";
      document.getElementById("BarAch").style.backgroundColor = "#436B8C";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      // document.getElementById("SAVES").onclick = 0;
      //document.getElementById("SAVES").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("TTD");

      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
      document.getElementById("BG").className = "IMGBGFWD";
      document.getElementById("LOGOCARD").src = "Resources/LogoFWD.png";

      document.getElementById("NAME").innerHTML = "FireWall Defender";
      document.getElementById("NAME5").innerHTML = "FireWall Defender";
      document.getElementById("NAME2").innerHTML = "FireWall Defender";
      document.getElementById("NAME3").innerHTML = "FireWall Defender";
      document.getElementById("NAME4").innerHTML = "FireWall Defender";
      document.getElementById("DETECTION").onclick = detect(
        "FWD",
        "VersionFWD.txt",
        "FWD_Version.txt",
        "FireWall Defender",
        "versiontxt"
      );
      //document.getElementById("ONLINEPLAY").onclick = 0;
      //document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      //document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#E77817";
      document.getElementById("BarAch").style.backgroundColor = "#E77817";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4];
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("FWD");

      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
      document.getElementById("BG").className = "IMGBGTB";
      document.getElementById("LOGOCARD").src = "Resources/tbvertLogo.png";

      document.getElementById("NAME").innerHTML = "TanksBattle";
      document.getElementById("NAME2").innerHTML = "TanksBattle";
      document.getElementById("NAME3").innerHTML = "TanksBattle";
      document.getElementById("NAME5").innerHTML = "TanksBattle";
      document.getElementById("NAME4").innerHTML = "TanksBattle";
      document.getElementById("DETECTION").onclick = detect(
        "TB",
        "VersionTB.txt",
        "TB_Version.txt",
        "TanksBattle",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#229ACA";
      document.getElementById("BarAch").style.backgroundColor = "#229ACA";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("TB");

      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
      document.getElementById("BG").className = "IMGBGWR";
      document.getElementById("LOGOCARD").src = "Resources/LogoWR.png";

      document.getElementById("NAME").innerHTML = "WinRun";
      document.getElementById("NAME2").innerHTML = "WinRun";
      document.getElementById("NAME3").innerHTML = "WinRun";
      document.getElementById("NAME5").innerHTML = "WinRun";
      document.getElementById("NAME4").innerHTML = "WinRun";
      document.getElementById("DETECTION").onclick = detect(
        "WR",
        "VersionWR.txt",
        "WR_Version.txt",
        "WinRun",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor =
        "rgb(177, 89, 31)";
      document.getElementById("BarAch").style.backgroundColor =
        "rgb(177, 89, 31)";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("WR");

      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
      document.getElementById("BG").className = "IMGBGAE";
      document.getElementById("LOGOCARD").src = "Resources/AELogo.png";

      document.getElementById("NAME").innerHTML = "Asteroid Escape";
      document.getElementById("NAME2").innerHTML = "Asteroid Escape";
      document.getElementById("NAME3").innerHTML = "Asteroid Escape";
      document.getElementById("NAME4").innerHTML = "Asteroid Escape";
      document.getElementById("NAME5").innerHTML = "Asteroid Escape";
      document.getElementById("DETECTION").onclick = detectforWin(
        "AE",
        "VersionAE.txt",
        "AE_Version.txt",
        "AsteroidEscape",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#57B3B8";
      document.getElementById("BarAch").style.backgroundColor = "#57B3B8";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      document.getElementById("changes").innerHTML = ChangesLogs_Load("AE");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
      document.getElementById("BG").className = "IMGBGSN";
      document.getElementById("LOGOCARD").src = "Resources/LogoSNRE.png";

      document.getElementById("NAME").innerHTML = "SansNom Réédition";
      document.getElementById("NAME2").innerHTML = "SansNom Réédition";
      document.getElementById("NAME3").innerHTML = "SansNom Réédition";
      document.getElementById("NAME4").innerHTML = "SansNom Réédition";
      document.getElementById("NAME5").innerHTML = "SansNom Réédition";
      document.getElementById("DETECTION").onclick = detect(
        "SNRE",
        "SNRE_Version.txt",
        "SNRE_Version.txt",
        "Sans Nom Réédition",
        "versiontxt"
      );
      //document.getElementById("ONLINEPLAY").onclick = 0;
      //document.getElementById("ONLINEPLAY").innerHTML = "";
      //document.getElementById("SNCLASSIC").onclick = 0;
      //document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#6FC4A9";
      document.getElementById("BarAch").style.backgroundColor = "#6FC4A9";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("shortcuts").onclick = 0;
      document.getElementById("shortcuts").innerHTML = "";
      //document.getElementById("button2").onclick= 0;
      //document.getElementById("button2").innerHTML = "";
      //  document.getElementById("SAVES").onclick = 0;
      // document.getElementById("SAVES").innerHTML = "";
      document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4];
      document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6];
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("SN");
      document.getElementById("SNCTXT2").innerHTML = currentLanguage[103];
      document.getElementById("SNCTXT").innerHTML = currentLanguage[108];
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
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
      document.getElementById("DETECTION").onclick = detectforWin(
        "SFO",
        "SFO_Version.txt",
        "SFO_Version.txt",
        "ShootFighter Origins",
        "versiontxt"
      );
      //document.getElementById("ONLINEPLAY").onclick = 0;
      //document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = currentLanguage[97];
      document.getElementById("myBar").style.backgroundColor = "#cc3333";
      document.getElementById("BarAch").style.backgroundColor = "#cc3333";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      //document.getElementById("button2").onclick= 0;
      //document.getElementById("button2").innerHTML = "";
      //document.getElementById("SAVES").onclick= 0;
      //document.getElementById("SAVES").innerHTML = "";
      document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4];
      document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6];
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("SFO");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
      document.getElementById("BG").className = "IMGBGLAATIM";
      document.getElementById("LOGOCARD").src = "Resources/LogoLAATIM2.png";
      document.getElementById("NAME").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("NAME2").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("NAME3").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("NAME4").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("NAME5").innerHTML =
        "Legend Adventure And The Infernal Maze";
      document.getElementById("DETECTION").onclick = detectforWin(
        "LAATIM",
        "LAIM_Version.txt",
        "LAIM_Version.txt",
        "Legend Adventure And The Infernal Maze",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#008C3F";
      document.getElementById("BarAch").style.backgroundColor = "#008C3F";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      //document.getElementById("button2").onclick= 0;
      //document.getElementById("button2").innerHTML = "";
      //document.getElementById("SAVES").onclick= 0;
      //document.getElementById("SAVES").innerHTML = "";
      document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6];
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("LAATIM");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
      document.getElementById("BG").className = "IMGBGSGB";
      document.getElementById("LOGOCARD").src = "Resources/SGB3.png";
      document.getElementById("NAME").innerHTML = "Super Geoffrey Bros";
      document.getElementById("NAME2").innerHTML = "Super Geoffrey Bros";
      document.getElementById("NAME3").innerHTML = "Super Geoffrey Bros";
      document.getElementById("NAME5").innerHTML = "Super Geoffrey Bros";
      document.getElementById("NAME4").innerHTML = "Super Geoffrey Bros";
      document.getElementById("DETECTION").onclick = detect(
        "SGB",
        "SGB_Version.txt",
        "SGB_Version.txt",
        "Super Geoffrey Bros",
        "versiontxt"
      );
      //document.getElementById("ONLINEPLAY").onclick = 0;
      //document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML =
        "The online version is the same of the downloadable one.But the achievements system doesn't work.";
      document.getElementById("myBar").style.backgroundColor = "#FBCF08";
      document.getElementById("BarAch").style.backgroundColor = "#FBCF08";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      //document.getElementById("button2").onclick= 0;
      //document.getElementById("button2").innerHTML = "";
      //  document.getElementById("SAVES").onclick = 0;
      // document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4];
      document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6];
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("SGB");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
      document.getElementById("BG").className = "IMGBGSF";
      document.getElementById("LOGOCARD").src = "Resources/sflogo.png";

      document.getElementById("NAME").innerHTML = "ShootFighter";
      document.getElementById("NAME2").innerHTML = "ShootFighter";
      document.getElementById("NAME3").innerHTML = "ShootFighter";
      document.getElementById("NAME4").innerHTML = "ShootFighter";
      document.getElementById("NAME5").innerHTML = "ShootFighter";
      document.getElementById("DETECTION").onclick = detectforWin(
        "SF",
        "VersionSF.txt",
        "SF_Version.txt",
        "ShootFighter",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#D40A10";
      document.getElementById("BarAch").style.backgroundColor = "#D40A10";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("SF");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
      document.getElementById("BG").className = "IMGBGLA";
      document.getElementById("LOGOCARD").src = "Resources/LA_logo.png";

      document.getElementById("NAME").innerHTML = "Lutin Adventure";
      document.getElementById("NAME2").innerHTML = "Lutin Adventure";
      document.getElementById("NAME3").innerHTML = "Lutin Adventure";
      document.getElementById("NAME4").innerHTML = "Lutin Adventure";
      document.getElementById("NAME5").innerHTML = "Lutin Adventure";
      document.getElementById("DETECTION").onclick = detectforWin(
        "LA",
        "VersionLA.txt",
        "LA_Version.txt",
        "Lutin Adventure",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#40C101";
      document.getElementById("BarAch").style.backgroundColor = "#40C101";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("LA");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
      document.getElementById("BG").className = "IMGBGVITF";
      document.getElementById("LOGOCARD").src = "Resources/VITF_Logo.png";

      document.getElementById("NAME").innerHTML = "Vincent In The Forest";
      document.getElementById("NAME2").innerHTML = "Vincent In The Forest";
      document.getElementById("NAME3").innerHTML = "Vincent In The Forest";
      document.getElementById("NAME4").innerHTML = "Vincent In The Forest";
      document.getElementById("NAME5").innerHTML = "Vincent In The Forest";
      document.getElementById("DETECTION").onclick = detectforWin(
        "VITF",
        "VersionVITF.txt",
        "VITF_Version.txt",
        "Vincent In The Forest",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#05B311";
      document.getElementById("BarAch").style.backgroundColor = "#05B311";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("VITF");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
      document.getElementById("BG").className = "IMGBGTTD";
      document.getElementById("LOGOCARD").src = "Resources/LogoTTD.png";

      document.getElementById("NAME").innerHTML = "The TARDIS Defender";
      document.getElementById("NAME2").innerHTML = "The TARDIS Defender";
      document.getElementById("NAME3").innerHTML = "The TARDIS Defender";
      document.getElementById("NAME4").innerHTML = "The TARDIS Defender";
      document.getElementById("NAME5").innerHTML = "The TARDIS Defender";
      document.getElementById("DETECTION").onclick = detect(
        "TTD",
        "VersionTTD.txt",
        "TTD_Version.txt",
        "The tardis Defender",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#436B8C";
      document.getElementById("BarAch").style.backgroundColor = "#436B8C";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      //document.getElementById("SAVES").onclick = 0;
      //document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("TTD");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
      document.getElementById("BG").className = "IMGBGFWD";
      document.getElementById("LOGOCARD").src = "Resources/LogoFWD.png";

      document.getElementById("NAME").innerHTML = "FireWall Defender";
      document.getElementById("NAME5").innerHTML = "FireWall Defender";
      document.getElementById("NAME2").innerHTML = "FireWall Defender";
      document.getElementById("NAME3").innerHTML = "FireWall Defender";
      document.getElementById("NAME4").innerHTML = "FireWall Defender";
      document.getElementById("DETECTION").onclick = detect(
        "FWD",
        "VersionFWD.txt",
        "FWD_Version.txt",
        "FireWall Defender",
        "versiontxt"
      );
      //document.getElementById("ONLINEPLAY").onclick = 0;
      //document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      //document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#E77817";
      document.getElementById("BarAch").style.backgroundColor = "#E77817";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4];
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("FWD");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
      document.getElementById("BG").className = "IMGBGTB";
      document.getElementById("LOGOCARD").src = "Resources/tbvertLogo.png";

      document.getElementById("NAME").innerHTML = "TanksBattle";
      document.getElementById("NAME2").innerHTML = "TanksBattle";
      document.getElementById("NAME3").innerHTML = "TanksBattle";
      document.getElementById("NAME5").innerHTML = "TanksBattle";
      document.getElementById("NAME4").innerHTML = "TanksBattle";
      document.getElementById("DETECTION").onclick = detect(
        "TB",
        "VersionTB.txt",
        "TB_Version.txt",
        "TanksBattle",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#229ACA";
      document.getElementById("BarAch").style.backgroundColor = "#229ACA";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("TB");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
      document.getElementById("BG").className = "IMGBGWR";
      document.getElementById("LOGOCARD").src = "Resources/LogoWR.png";

      document.getElementById("NAME").innerHTML = "WinRun";
      document.getElementById("NAME2").innerHTML = "WinRun";
      document.getElementById("NAME3").innerHTML = "WinRun";
      document.getElementById("NAME5").innerHTML = "WinRun";
      document.getElementById("NAME4").innerHTML = "WinRun";
      document.getElementById("DETECTION").onclick = detect(
        "WR",
        "VersionWR.txt",
        "WR_Version.txt",
        "WinRun",
        "versiontxt"
      );
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor =
        "rgb(177, 89, 31)";
      document.getElementById("BarAch").style.backgroundColor =
        "rgb(177, 89, 31)";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("WR");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
      document.getElementById("BG").className = "IMGBGAE";
      document.getElementById("LOGOCARD").src = "Resources/AELogo.png";

      document.getElementById("NAME").innerHTML = "Asteroid Escape";
      document.getElementById("NAME2").innerHTML = "Asteroid Escape";
      document.getElementById("NAME3").innerHTML = "Asteroid Escape";
      document.getElementById("NAME4").innerHTML = "Asteroid Escape";
      document.getElementById("NAME5").innerHTML = "Asteroid Escape";
      document.getElementById("DETECTION").onclick = detectforWin(
        "AE",
        "VersionAE.txt",
        "AE_Version.txt",
        "AsteroidEscape",
        "versiontxt"
      );
      document.getElementById("changes").innerHTML = ChangesLogs_Load("AE");
      document.getElementById("ONLINEPLAY").onclick = 0;
      document.getElementById("ONLINEPLAY").innerHTML = "";
      document.getElementById("SNCLASSIC").onclick = 0;
      document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#57B3B8";
      document.getElementById("BarAch").style.backgroundColor = "#57B3B8";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      document.getElementById("button2").onclick = 0;
      document.getElementById("button2").innerHTML = "";
      document.getElementById("SAVES").innerHTML = "";

      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
      document.getElementById("BG").className = "IMGBGSN";
      document.getElementById("LOGOCARD").src = "Resources/LogoSNRE.png";
      document.getElementById("NAME").innerHTML = "SansNom Réédition";
      document.getElementById("NAME2").innerHTML = "SansNom Réédition";
      document.getElementById("NAME3").innerHTML = "SansNom Réédition";
      document.getElementById("NAME4").innerHTML = "SansNom Réédition";
      document.getElementById("NAME5").innerHTML = "SansNom Réédition";
      document.getElementById("DETECTION").onclick = detect(
        "SNRE",
        "SNRE_Version.txt",
        "SNRE_Version.txt",
        "Sans Nom Réédition",
        "versiontxt"
      );
      //document.getElementById("ONLINEPLAY").onclick = 0;
      //document.getElementById("ONLINEPLAY").innerHTML = "";
      //document.getElementById("SNCLASSIC").onclick = 0;
      //document.getElementById("SNCLASSIC").innerHTML = "";
      document.getElementById("GAMEJOLT").innerHTML = "";
      document.getElementById("myBar").style.backgroundColor = "#6FC4A9";
      document.getElementById("BarAch").style.backgroundColor = "#6FC4A9";
      document.getElementById(
        "myBar2"
      ).style.backgroundColor = document.getElementById(
        "myBar"
      ).style.backgroundColor;

      document.getElementById("BarAch").style.color = "black";
      //document.getElementById("button2").onclick= 0;
      //document.getElementById("button2").innerHTML = "";
      //  document.getElementById("SAVES").onclick = 0;
      //  document.getElementById("SAVES").innerHTML = "";
      //document.getElementById("shortcuts").onclick = 0;
      //document.getElementById("shortcuts").innerHTML = "";
      document.getElementById("ONLINEPLAYTXT").innerHTML = currentLanguage[4];
      document.getElementById("ACHIEVEMENTSTXT").innerHTML = currentLanguage[6];

      document.getElementById("REPAIRTXT").innerHTML = currentLanguage[7];
      document.getElementById("REINSTALLTXT").innerHTML = currentLanguage[8];
      document.getElementById("UNINSTALLTXT").innerHTML = currentLanguage[9];
      document.getElementById("OGLTXT").innerHTML = currentLanguage[10];
      document.getElementById("SHORTTXT").innerHTML = currentLanguage[12];
      document.getElementById("SNCTXT2").innerHTML = currentLanguage[103];
      document.getElementById("SNCTXT").innerHTML = currentLanguage[108];
      document.getElementById("changes").innerHTML = ChangesLogs_Load("SN");
      document.getElementById("SVTXT").innerHTML = currentLanguage[11];
    }
  }
}
//delete folder of a game
//modify to add games
function deletefolder(folder2delete) {
  ACH_SAVER();
  fs.rmdir(folder2delete, { recursive: true }, (err) => {
    if (err) {
      Toastifycation(err);
    }
    if (!fs.existsSync(gamelocation + "/Games"))
      fs.mkdirSync(gamelocation + "/Games", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/AE"))
      fs.mkdirSync(gamelocation + "/Games/AE", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/SNRE"))
      fs.mkdirSync(gamelocation + "/Games/SNRE", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/LAATIM"))
      fs.mkdirSync(gamelocation + "/Games/LAATIM", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/LA"))
      fs.mkdirSync(gamelocation + "/Games/LA", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/SGB"))
      fs.mkdirSync(gamelocation + "/Games/SGB", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/SF"))
      fs.mkdirSync(gamelocation + "/Games/SF", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/TTD"))
      fs.mkdirSync(gamelocation + "/Games/TTD", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/TB"))
      fs.mkdirSync(gamelocation + "/Games/TB", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/FWD"))
      fs.mkdirSync(gamelocation + "/Games/FWD", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/VITF"))
      fs.mkdirSync(gamelocation + "/Games/VITF", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/WR"))
      fs.mkdirSync(gamelocation + "/Games/WR", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/SFO"))
      fs.mkdirSync(gamelocation + "/Games/SFO", { recursive: true });

    if (folder2delete === gamelocation + "/Games/LAATIM") {
      Toastifycation(currentLanguage[48]);
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
      Toastifycation(currentLanguage[54]);
    }
    if (folder2delete === gamelocation + "/Games/TTD") {
      Toastifycation(currentLanguage[55]);
    }
    if (folder2delete === gamelocation + "/Games/TB") {
      Toastifycation(currentLanguage[56]);
    }
    if (folder2delete === gamelocation + "/Games/FWD") {
      Toastifycation(currentLanguage[57]);
    }
    if (folder2delete === gamelocation + "/Games/VITF") {
      Toastifycation(curentLanguage[58]);
    }
    if (folder2delete === gamelocation + "/Games/WR") {
      Toastifycation(currentLanguage[59]);
    }
    if (portable == true) {
      if (process.platform == "linux") {
        window.location.href = __dirname + "/index.html";
      } else {
        window.location.href = __dirname + "/index.html";
      }
    } else {
      if (process.platform == "linux") {
        window.location.href = __dirname + "/index.html";
      } else {
        window.location.href = __dirname + "/index.html";
      }
    }
    console.log("Done");
  });
}
//detect witch folder to delete
//modify to add games
function DELETE_DETECT() {
  console.log("Enter Delete");
  if (process.platform == "linux") {
    if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
      deletefolder(gamelocation + "/Games/SFO");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
      deletefolder(gamelocation + "/Games/LAATIM");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
      deletefolder(gamelocation + "/Games/SGB");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
      deletefolder(gamelocation + "/Games/SF");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
      deletefolder(gamelocation + "/Games/LA");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
      deletefolder(gamelocation + "/Games/VITF");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
      deletefolder(gamelocation + "/Games/TTD");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
      deletefolder(gamelocation + "/Games/FWD");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
      deletefolder(gamelocation + "/Games/TB");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
      deletefolder(gamelocation + "/Games/WR");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
      deletefolder(gamelocation + "/Games/AE");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
      deletefolder(gamelocation + "/Games/SNRE");
    }
  } else {
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
      deletefolder(gamelocation + "/Games/SFO");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
      deletefolder(gamelocation + "/Games/LAATIM");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
      deletefolder(gamelocation + "/Games/SGB");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
      deletefolder(gamelocation + "/Games/SF");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
      deletefolder(gamelocation + "/Games/LA");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
      deletefolder(gamelocation + "/Games/VITF");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
      deletefolder(gamelocation + "/Games/TTD");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
      deletefolder(gamelocation + "/Games/FWD");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
      deletefolder(gamelocation + "/Games/TB");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
      deletefolder(gamelocation + "/Games/WR");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
      deletefolder(gamelocation + "/Games/AE");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
      deletefolder(gamelocation + "/Games/SNRE");
    }
  }
}
//select repair link by games
//modify to add games
function REINSTALL_DETECT(list1, list2, m) {
  if (connectedtointernet == "true") {
    document.getElementById("pgrs").style.display = "block";
    document.getElementById("downloadbtn").classList.add("disabled");
    document.getElementById("DLTEXT").innerHTML = currentLanguage[95];
    document.getElementById("resultofcalculsize").innerHTML =
      currentLanguage[96];
    if (process.platform == "linux") {
      if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/SFO", "SFO", 1);
        } else {
          repair("SFO", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/LAATIM", "LAATIM", 1);
        } else {
          repair("LAATIM", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/SGB", "SGB", 1);
        } else {
          repair("SGB", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/SF", "SF", 1);
        } else {
          repair("SF", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/LA", "LA", 1);
        } else {
          repair("LA", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/VITF", "VITF", 1);
        } else {
          repair("VITF", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/TTD", "TTD", 1);
        } else {
          repair("TTD", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/FWD", "FWD", 1);
        } else {
          repair("FWD", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/TB", "TB", 1);
        } else {
          repair("TB", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/WR", "WR", 1);
        } else {
          repair("WR", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/AE", "AE", 1);
        } else {
          repair("AE", list1, list2);
        }
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/SNRE", "SN", 1);
        } else {
          repair("SNRE", list1, list2);
        }
      }
    } else {
      if (
        window.location.href ==
        "file:///" + dirnamew + "/Games.html?laatim"
      ) {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/LAATIM", "LAATIM", 0);
        } else {
          repair("LAATIM", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/SGB", "SGB", 0);
        } else {
          repair("SGB", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/SFO", "SFO", 0);
        } else {
          repair("SFO", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/SF", "SF", 0);
        } else {
          repair("SF", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/LA", "LA", 0);
        } else {
          repair("LA", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/VITF", "VITF", 0);
        } else {
          repair("VITF", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/TTD", "TDD", 0);
        } else {
          repair("TTD", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/FWD", "FWD", 0);
        } else {
          repair("FWD", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/TB", "TB", 0);
        } else {
          repair("TB", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/WR", "WR", 0);
        } else {
          repair("WR", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/AE", "AE", 0);
        } else {
          repair("AE", list1, list2);
        }
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
        if (m === false) {
          deletefolderforrepair(gamelocation + "/Games/SNRE", "SN", 0);
        } else {
          repair("SNRE", list1, list2);
        }
      }
    }
  }
}
//set online link by games (if available)
//modify to add games who work online
function ONLINE_LINK_DETECT() {
  if (process.platform == "linux") {
    if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
      RunWithoutInstall("https://itch.io/embed-upload/1461064?color=303030");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
      RunWithoutInstall("https://gamejolt.com/games/FirewallDefender/323970");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
      RunWithoutInstall("https://itch.io/embed-upload/1889077?color=303030");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
      RunWithoutInstall("https://itch.io/embed-upload/2669133?color=212121");
    }
  } else {
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
      RunWithoutInstall("https://itch.io/embed-upload/1461064?color=303030");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
      RunWithoutInstall("https://gamejolt.com/games/FirewallDefender/323970");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
      RunWithoutInstall("https://itch.io/embed-upload/1889077?color=303030");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
      RunWithoutInstall("https://itch.io/embed-upload/2669133?color=212121");
    }
  }
}
//Open emplacement by games
//modify to add games
function OPEN_GAMELOC_DETECT() {
  if (process.platform == "linux") {
    if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
      OpenEmpl(gamelocation + "/Games/SFO/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
      OpenEmpl(gamelocation + "/Games/LAATIM/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
      OpenEmpl(gamelocation + "/Games/SGB/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
      OpenEmpl(gamelocation + "/Games/SF/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
      OpenEmpl(gamelocation + "/Games/LA/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
      OpenEmpl(gamelocation + "/Games/VITF/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
      OpenEmpl(gamelocation + "/Games/TTD/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
      OpenEmpl(gamelocation + "/Games/FWD/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
      OpenEmpl(gamelocation + "/Games/TB/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
      OpenEmpl(gamelocation + "/Games/WR/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
      OpenEmpl(gamelocation + "/Games/AE/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
      OpenEmpl(gamelocation + "/Games/SNRE/");
    }
  } else {
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
      OpenEmpl(gamelocation + "/Games/SFO/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
      OpenEmpl(gamelocation + "/Games/LAATIM/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
      OpenEmpl(gamelocation + "/Games/SGB/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
      OpenEmpl(gamelocation + "/Games/SF/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
      OpenEmpl(gamelocation + "/Games/LA/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
      OpenEmpl(gamelocation + "/Games/VITF/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
      OpenEmpl(gamelocation + "/Games/TTD/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
      OpenEmpl(gamelocation + "/Games/FWD/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
      OpenEmpl(gamelocation + "/Games/TB/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
      OpenEmpl(gamelocation + "/Games/WR/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
      OpenEmpl(gamelocation + "/Games/AE/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
      OpenEmpl(gamelocation + "/Games/SNRE/");
    }
  }
}
//create shortcut
function createlink(gameid, path2link, desc, iconpath) {
  ws.create(path2link, {
    target: "nytuo://launchid/" + gameid.toString().toLowerCase(),
    icon: iconpath,
    desc: desc,
  });
}
//shortcut by games
//modify to add games
function SHORTCUT_DETECT() {
  if (process.platform == "linux") {
    Toastifycation("This is not available for your platform : Linux");
  } else {
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
      createlink(
        "SFO",
        require("path").join(
          require("os").homedir(),
          "Desktop/ShootFighter Origins.lnk"
        ),
        "Launch ShootFighter Origins",
        __dirname + "/Resources/LogoSFO.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
      createlink(
        "LAATIM",
        require("path").join(
          require("os").homedir(),
          "Desktop/Legend Adventure and the Infernal Maze.lnk"
        ),
        "Launch Legend Adventure and the Infernal Maze",
        __dirname + "/Resources/LAATIM.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
      createlink(
        "SGB",
        require("path").join(
          require("os").homedir(),
          "Desktop/Super Geoffrey Bros.lnk"
        ),
        "Launch Super Geoffrey Bros",
        __dirname + "/Resources/SGB.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
      createlink(
        "SF",
        require("path").join(
          require("os").homedir(),
          "Desktop/Shootfighter.lnk"
        ),
        "Launch ShootFighter",
        __dirname + "/Resources/SF.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
      createlink(
        "LA",
        require("path").join(
          require("os").homedir(),
          "Desktop/Lutin Adventure.lnk"
        ),
        "Launch Lutin Adventure",
        __dirname + "/Resources/LA.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
      createlink(
        "VITF",
        require("path").join(
          require("os").homedir(),
          "Desktop/Vincent In The Forest.lnk"
        ),
        "Launch Vincent In The Forest",
        __dirname + "/Resources/VITF.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
      createlink(
        "TTD",
        require("path").join(
          require("os").homedir(),
          "Desktop/The Tardis Defender.lnk"
        ),
        "Launch The Tardis Defender",
        __dirname + "/Resources/TTD.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
      createlink(
        "FWD",
        require("path").join(
          require("os").homedir(),
          "Desktop/FireWall Defender.lnk"
        ),
        "Launch FireWall Defender",
        __dirname + "/Resources/FWD.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
      createlink(
        "TB",
        require("path").join(
          require("os").homedir(),
          "Desktop/TanksBattle.lnk"
        ),
        "Launch TanksBattle",
        __dirname + "/Resources/TB.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
      createlink(
        "WR",
        require("path").join(require("os").homedir(), "Desktop/WinRun.lnk"),
        "Launch WinRun",
        __dirname + "/Resources/WR.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
      createlink(
        "AE",
        require("path").join(
          require("os").homedir(),
          "Desktop/Asteroid Escape.lnk"
        ),
        "Launch AsteroidEscape",
        __dirname + "/Resources/AE.ico"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
      createlink(
        "SNRE",
        require("path").join(
          require("os").homedir(),
          "Desktop/Sans Nom Rééditon.lnk"
        ),
        "Launch SansNom Réédition",
        __dirname + "/Resources/SNRE.ico"
      );
    }
  }
}
//execute by games actions
//modify to add games
function WHATTODO_DETECT() {
  document.getElementById("pgrs").style.display = "block";
  document.getElementById("downloadbtn").classList.add("disabled");
  if (process.platform == "linux") {
    if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
      Do(
        "SFO",
        "SFO_Version.txt",
        "SFO_Version.txt",
        "nw.exe",
        "ShootFighter Origins",
        "nw"
      );
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
      Toastifycation(currentLanguage[66]);
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
      Do(
        "SGB",
        "SGB_Version.txt",
        "SGB_Version.txt",
        "nw.exe",
        "Super Geoffrey Bros",
        "nw"
      );
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
      Toastifycation(currentLanguage[66]);
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
      Toastifycation(currentLanguage[66]);
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
      Toastifycation(currentLanguage[66]);
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
      Do(
        "TTD",
        "VersionTTD.txt",
        "TTD_Version.txt",
        "nw.exe",
        "The tardis Defender",
        "nw"
      );
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
      Do(
        "SNRE",
        "SNRE_Version.txt",
        "SNRE_Version.txt",
        "nw.exe",
        "Sans Nom : Réédition",
        "nw"
      );
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
      Do(
        "FWD",
        "VersionFWD.txt",
        "FWD_Version.txt",
        "nw.exe",
        "FireWall Defender",
        "nw"
      );
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
      Do(
        "TB",
        "VersionTB.txt",
        "TB_Version.txt",
        "nw.exe",
        "TanksBattle",
        "nw"
      );
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
      Do("WR", "VersionWR.txt", "WR_Version.txt", "nw.exe", "WinRun", "nw");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
      Toastifycation(currentLanguage[66]);
    }
  } else {
    if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
      DoforWin(
        "LAATIM",
        "LAIM_Version.txt",
        "LAIM_Version.txt",
        "LA_IM.exe",
        "Legend Adventure and the Infernal Maze"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
      Do(
        "SFO",
        "SFO_Version.txt",
        "SFO_Version.txt",
        "nw.exe",
        "ShootFighter Origins",
        "nw"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
      Do(
        "SGB",
        "SGB_Version.txt",
        "SGB_Version.txt",
        "nw.exe",
        "Super Geoffrey Bros",
        "nw"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
      DoforWin(
        "SF",
        "VersionSF.txt",
        "SF_Version.txt",
        "ShootFighter.exe",
        "Shoot Fighter"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
      DoforWin(
        "LA",
        "VersionLA.txt",
        "LA_Version.txt",
        "Lutin_Adventure.exe",
        "Lutin Adventure"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
      DoforWin(
        "VITF",
        "VersionVITF.txt",
        "VITF_Version.txt",
        "VincentInTheForest.exe",
        "Vincent In The Forest"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
      Do(
        "TTD",
        "VersionTTD.txt",
        "TTD_Version.txt",
        "nw.exe",
        "The tardis Defender",
        "nw"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
      Do(
        "SNRE",
        "SNRE_Version.txt",
        "SNRE_Version.txt",
        "nw.exe",
        "Sans Nom : Réédition",
        "nw"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
      Do(
        "FWD",
        "VersionFWD.txt",
        "FWD_Version.txt",
        "nw.exe",
        "FireWall Defender",
        "nw"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
      Do(
        "TB",
        "VersionTB.txt",
        "TB_Version.txt",
        "nw.exe",
        "TanksBattle",
        "nw"
      );
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
      Do("WR", "VersionWR.txt", "WR_Version.txt", "nw.exe", "WinRun", "nw");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
      DoforWin(
        "AE",
        "VersionAE.txt",
        "AE_Version.txt",
        "AsteroidEscapeWinV1FinalPatch1.exe",
        "AsteroidEscape"
      );
    }
  }
}
//saves by games
//modify to add games
function OPEN_GAMESAVE() {
  if (process.platform == "linux") {
    if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
      alert("No available on this platform...");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
      OpenEmpl(homedir + "/SuperGeoffreyBros/User Data/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
      OpenEmpl(homedir + "/ShootFighterOrigins/User Data/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
      OpenEmpl(homedir + "/TheTardisDefender/User Data/");
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
      OpenEmpl(homedir + "/SansNomReedition/User Data/");
    }
  } else {
    if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
      OpenEmpl(homedir + "/AppData/Local/LA_IM/Saved/SaveGames/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
      OpenEmpl(homedir + "/AppData/Local/SuperGeoffreyBros/User Data/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
      OpenEmpl(homedir + "/AppData/Local/ShootFighterOrigins/User Data/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
      OpenEmpl(homedir + "/AppData/Local/TheTardisDefender/User Data/");
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
      OpenEmpl(homedir + "/AppData/Local/SansNomReedition/User Data/");
    }
  }
}
//check manifest by game
//modify to add games
function REPAIR_DETECT() {
  if (connectedtointernet == "true") {
    document.getElementById("pgrs").style.display = "block";
    document.getElementById("downloadbtn").classList.add("disabled");
    document.getElementById("DLTEXT").innerHTML = currentLanguage[93];
    document.getElementById("resultofcalculsize").innerHTML =
      currentLanguage[94];
    if (process.platform == "linux") {
      if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
        MANIFEST(
          "LAATIM",
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/Windows/Manifest.txt",
          ""
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?sfo") {
        MANIFEST(
          "SFO",
          "https://raw.githubusercontent.com/Nytuo/SFO/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/SFO/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
        MANIFEST(
          "SGB",
          "https://raw.githubusercontent.com/Nytuo/SGB/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/SGB/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
        MANIFEST(
          "SF",
          "https://raw.githubusercontent.com/Nytuo/SF/master/Windows/Manifest.txt",
          ""
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
        MANIFEST(
          "LA",
          "https://raw.githubusercontent.com/Nytuo/LA/master/Windows/Manifest.txt",
          ""
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
        MANIFEST(
          "VITF",
          "https://raw.githubusercontent.com/Nytuo/VITF/master/Windows/Manifest.txt",
          ""
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
        MANIFEST(
          "TTD",
          "https://raw.githubusercontent.com/Nytuo/TTD/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/TTD/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
        MANIFEST(
          "SNRE",
          "https://raw.githubusercontent.com/Nytuo/SN/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/SN/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
        MANIFEST(
          "FWD",
          "https://raw.githubusercontent.com/Nytuo/FWD/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/FWD/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
        MANIFEST(
          "TB",
          "https://raw.githubusercontent.com/Nytuo/TB/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/TB/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
        MANIFEST(
          "WR",
          "https://raw.githubusercontent.com/Nytuo/WR/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/WR/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
        MANIFEST(
          "AE",
          "https://raw.githubusercontent.com/Nytuo/AE/master/Windows/Manifest.txt",
          ""
        ); //check
      }
    } else {
      if (
        window.location.href ==
        "file:///" + dirnamew + "/Games.html?laatim"
      ) {
        MANIFEST(
          "LAATIM",
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/Windows/Manifest.txt",
          ""
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
        MANIFEST(
          "SGB",
          "https://raw.githubusercontent.com/Nytuo/SGB/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/SGB/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
        MANIFEST(
          "SFO",
          "https://raw.githubusercontent.com/Nytuo/SFO/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/SFO/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
        MANIFEST(
          "SF",
          "https://raw.githubusercontent.com/Nytuo/SF/master/Windows/Manifest.txt",
          ""
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
        MANIFEST(
          "LA",
          "https://raw.githubusercontent.com/Nytuo/LA/master/Windows/Manifest.txt",
          ""
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
        MANIFEST(
          "VITF",
          "https://raw.githubusercontent.com/Nytuo/VITF/master/Windows/Manifest.txt",
          ""
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
        MANIFEST(
          "TTD",
          "https://raw.githubusercontent.com/Nytuo/TTD/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/TTD/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
        MANIFEST(
          "SNRE",
          "https://raw.githubusercontent.com/Nytuo/SN/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/SN/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
        MANIFEST(
          "FWD",
          "https://raw.githubusercontent.com/Nytuo/FWD/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/FWD/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
        MANIFEST(
          "TB",
          "https://raw.githubusercontent.com/Nytuo/TB/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/TB/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
        MANIFEST(
          "WR",
          "https://raw.githubusercontent.com/Nytuo/WR/master/Windows/Manifest.txt",
          "https://raw.githubusercontent.com/Nytuo/WR/master/Linux/Manifest.txt"
        ); //check
      }
      if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
        MANIFEST(
          "AE",
          "https://raw.githubusercontent.com/Nytuo/AE/master/Windows/Manifest.txt",
          ""
        ); //check
      }
    }
  }
}

function MANIFEST_GENERATOR(dossiertomanifest, dossierdujeu) {
  const getAllFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];
    var BlackList = ["AchDone.txt", "install_Manifest.txt"];

    files.forEach(function (file) {
      if (BlackList.includes(file) == false) {
        if (fs.statSync(dirPath + "\\" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "\\" + file, arrayOfFiles);
        } else {
          var nbOfnbInStr = Array.from(dossierdujeu).length;
          dirPath2 = dirPath.substring(
            dirPath.lastIndexOf(dossierdujeu) + nbOfnbInStr + 1,
            dirPath.length
          );
          if (dirPath2 == "") {
            v = dirPath2 + file + "|" + fs.statSync(dirPath + "\\" + file).size;
          } else {
            v =
              dirPath2 +
              "\\" +
              file +
              "|" +
              fs.statSync(dirPath + "\\" + file).size;
          }
          arrayOfFiles.push(v);
        }
      } else {
        console.log(
          "The file : " +
            file +
            " is in the BlackList and is not write into the manifest!"
        );
        console.log(file + " is in : '" + BlackList.toString() + "'");
      }
    });
    return arrayOfFiles;
  };

  var output = getAllFiles(dossiertomanifest).toString();
  //output = output.replace(/-/g, "")
  //output = output.replace(/\./g, "")
  //output = output.replace(/_/g, "")
  output = output.split(",");

  output = output.sort();
  var arr2 = [];
  for (let i = 0; i < output.length; i++) {
    var element = output[i];
    element = element.toString().split("|");
    arr2.push(element);
  }
  output = arr2;

  return output;
}
//get manifest of the game in onedrive and download it, compare for difference and choose if re-install the game or pass throw.
function MANIFEST(GameName, URLMANIFEST, URLMANIFESTLINUX) {
  var readmanifest = MANIFEST_GENERATOR(
    gamelocation + "/Games/" + GameName,
    GameName
  );
  if (portable == true) {
    if (process.platform == "linux") {
      DownlaodVersion(
        URLMANIFESTLINUX,
        parentfolder3 +
          "/nytuolauncher_data/VersionsFiles/" +
          GameName +
          "_MANIFEST.txt"
      );
    } else {
      DownlaodVersion(
        URLMANIFEST,
        __dirname + "/VersionsFiles/" + GameName + "_MANIFEST.txt"
      );
    }
  } else {
    if (process.platform == "linux") {
      DownlaodVersion(
        URLMANIFESTLINUX,
        app.getPath("documents") +
          "/nytuolauncher_data/VersionsFiles/" +
          GameName +
          "_MANIFEST.txt"
      );
    } else {
      DownlaodVersion(
        URLMANIFEST,
        __dirname + "/VersionsFiles/" + GameName + "_MANIFEST.txt"
      );
    }
  }

  setTimeout(function () {
    if (portable == true) {
      if (process.platform == "linux") {
        var readmanifestlcl = fs.readFileSync(
          parentfolder3 +
            "/nytuolauncher_data/VersionsFiles/" +
            GameName +
            "_MANIFEST.txt",
          "utf-8"
        );
        var listoflclmanifest = readmanifestlcl.split("\n");
        listoflclmanifest.pop();
        var arr2 = [];
        for (let i = 0; i < listoflclmanifest.length; i++) {
          var element = listoflclmanifest[i];
          element = element.toString().split(",");
          arr2.push(element);
        }
        listoflclmanifest = arr2;
        listoflclmanifest = listoflclmanifest.sort();

        console.log(listoflclmanifest);
        console.log(readmanifest);

        CompareForRepair(listoflclmanifest, readmanifest, GameName);
      } else {
        var readmanifestlcl = fs.readFileSync(
          __dirname + "/VersionsFiles/" + GameName + "_MANIFEST.txt",
          "utf-8"
        );
        var listoflclmanifest = readmanifestlcl.split("\n");
        listoflclmanifest.pop();

        var arr2 = [];
        for (let i = 0; i < listoflclmanifest.length; i++) {
          var element = listoflclmanifest[i];
          element = element.toString().split(",");
          arr2.push(element);
        }
        listoflclmanifest = arr2;
        listoflclmanifest = listoflclmanifest.sort();

        console.log(listoflclmanifest);
        console.log(readmanifest);
        CompareForRepair(listoflclmanifest, readmanifest, GameName);
      }
    } else {
      if (process.platform == "linux") {
        var readmanifestlcl = fs.readFileSync(
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/" +
            GameName +
            "_MANIFEST.txt",
          "utf-8"
        );
        var listoflclmanifest = readmanifestlcl.split("\n");
        listoflclmanifest.pop();

        var arr2 = [];
        for (let i = 0; i < listoflclmanifest.length; i++) {
          var element = listoflclmanifest[i];
          element = element.toString().split(",");
          arr2.push(element);
        }
        listoflclmanifest = arr2;
        listoflclmanifest = listoflclmanifest.sort();

        console.log(listoflclmanifest);
        console.log(readmanifest);
        CompareForRepair(listoflclmanifest, readmanifest, GameName);
      } else {
        var readmanifestlcl = fs.readFileSync(
          __dirname + "/VersionsFiles/" + GameName + "_MANIFEST.txt",
          "utf-8"
        );
        var listoflclmanifest = readmanifestlcl.split("\n");
        listoflclmanifest.pop();

        var arr2 = [];
        for (let i = 0; i < listoflclmanifest.length; i++) {
          var element = listoflclmanifest[i];
          element = element.toString().split(",");
          arr2.push(element);
        }
        listoflclmanifest = arr2;
        listoflclmanifest = listoflclmanifest.sort();

        console.log(listoflclmanifest);
        console.log(readmanifest);

        CompareForRepair(listoflclmanifest, readmanifest, GameName);
      }
    }
  }, 5000);
}
//Detection for windows games only
//modify to add games
function detectforWin(dossierdujeu, versiontxt, versionlcl, gamename, txtVID) {
  rebuildGameFolderTree();
  if (connectedtointernet == "true") {
    if (process.platform === "win32") {
      if (
        fs.existsSync(
          gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
        ) === false
      ) {
        document.getElementById("button1").innerHTML = currentLanguage[3];
        document.getElementById("resultofcalculsize").innerHTML =
          currentLanguage[175] + " : " + gamename;

        document.getElementById(txtVID).innerHTML = currentLanguage[61];
        if (!!document.getElementById("button2") === true) {
          document.getElementById("button2").onclick = 0;
          document.getElementById("button2").innerHTML = "";
        }

        document.getElementById("button3").onclick = 0;
        document.getElementById("button3").innerHTML = "";
      } else {
        if (
          fs
            .readFileSync(
              gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
            )
            .toString() ===
          fs.readFileSync(__dirname + "/VersionsFiles/" + versionlcl).toString()
        ) {
          document.getElementById("button1").innerHTML = currentLanguage[1];
          document.getElementById("resultofcalculsize").innerHTML =
            currentLanguage[0] + " : " + gamename;
          document.getElementById(txtVID).innerHTML =
            currentLanguage[62] +
            fs
              .readFileSync(
                gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
              )
              .toString();
        } else {
          document.getElementById("button1").innerHTML = currentLanguage[2];

          document.getElementById(txtVID).innerHTML =
            currentLanguage[62] +
            fs
              .readFileSync(
                gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
              )
              .toString() +
            currentLanguage[63];
          Toastifycation(currentLanguage[64] + gamename + currentLanguage[65]);
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
    if (
      fs.existsSync(
        gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
      ) === true
    ) {
      document.getElementById("button1").innerHTML = currentLanguage[1];
      document.getElementById("resultofcalculsize").innerHTML =
        currentLanguage[0] + " : " + gamename;
      document.getElementById(txtVID).innerHTML =
        currentLanguage[62] +
        fs
          .readFileSync(
            gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
          )
          .toString();
    } else {
      Toastifycation(currentLanguage[68]);
    }
  }
}
//detect games
//modify to add games
function detect(dossierdujeu, versiontxt, versionlcl, gamename, txtVID) {
  rebuildGameFolderTree();
  console.log(parentfolder3);
  if (connectedtointernet == "true") {
    if (
      process.platform === "win32" ||
      process.platform === "linux" ||
      process.platform == "darwin"
    ) {
      if (
        fs.existsSync(
          gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
        ) === false
      ) {
        document.getElementById("button1").innerHTML = currentLanguage[3];
        document.getElementById(txtVID).innerHTML = currentLanguage[61];
        document.getElementById("resultofcalculsize").innerHTML =
          currentLanguage[175] + " : " + gamename;

        if (!!document.getElementById("button2") === true) {
          document.getElementById("button2").onclick = 0;
          document.getElementById("button2").innerHTML = "";
        }

        document.getElementById("button3").onclick = 0;

        document.getElementById("button3").innerHTML = "";
      } else {
        if (process.platform == "linux") {
          if (portable == true) {
            if (
              fs
                .readFileSync(
                  gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
                )
                .toString() ===
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/" +
                    versionlcl
                )
                .toString()
            ) {
              document.getElementById("button1").innerHTML = currentLanguage[1];
              document.getElementById("resultofcalculsize").innerHTML =
                currentLanguage[0] + " : " + gamename;
              document.getElementById(txtVID).innerHTML =
                currentLanguage[62] +
                fs
                  .readFileSync(
                    gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
                  )
                  .toString();
            } else {
              document.getElementById("button1").innerHTML = currentLanguage[2];
              document.getElementById(txtVID).innerHTML =
                currentLanguage[62] +
                fs
                  .readFileSync(
                    gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
                  )
                  .toString() +
                currentLanguage[63];
              Toastifycation(
                currentLanguage[64] + gamename + currentLanguage[65]
              );
            }
          } else {
            if (
              fs
                .readFileSync(
                  gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
                )
                .toString() ===
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/" +
                    versionlcl
                )
                .toString()
            ) {
              document.getElementById("button1").innerHTML = currentLanguage[1];
              document.getElementById("resultofcalculsize").innerHTML =
                currentLanguage[0] + " : " + gamename;
              document.getElementById(txtVID).innerHTML =
                currentLanguage[62] +
                fs
                  .readFileSync(
                    gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
                  )
                  .toString();
            } else {
              document.getElementById("button1").innerHTML = currentLanguage[2];
              document.getElementById(txtVID).innerHTML =
                currentLanguage[62] +
                fs
                  .readFileSync(
                    gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
                  )
                  .toString() +
                currentLanguage[63];
              Toastifycation(
                currentLanguage[64] + gamename + currentLanguage[65]
              );
            }
          }
        } else {
          if (
            fs
              .readFileSync(
                gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
              )
              .toString() ===
            fs
              .readFileSync(__dirname + "/VersionsFiles/" + versionlcl)
              .toString()
          ) {
            document.getElementById("button1").innerHTML = currentLanguage[1];
            document.getElementById("resultofcalculsize").innerHTML =
              currentLanguage[0] + " : " + gamename;
            document.getElementById(txtVID).innerHTML =
              currentLanguage[62] +
              fs
                .readFileSync(
                  gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
                )
                .toString();
          } else {
            document.getElementById("button1").innerHTML = currentLanguage[2];

            document.getElementById(txtVID).innerHTML =
              currentLanguage[62] +
              fs
                .readFileSync(
                  gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
                )
                .toString() +
              currentLanguage[63];
            Toastifycation(
              currentLanguage[64] + gamename + currentLanguage[65]
            );
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
    if ((process.platform = "linux")) {
      if (
        fs.existsSync(
          gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
        ) == true
      ) {
        document.getElementById("button1").innerHTML = currentLanguage[1];
        document.getElementById("resultofcalculsize").innerHTML =
          currentLanguage[0] + " : " + gamename;
        document.getElementById(txtVID).innerHTML =
          currentLanguage[62] +
          fs
            .readFileSync(
              gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
            )
            .toString();
      }
    } else if ((process.platform = "win32")) {
      if (
        fs.existsSync(
          gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
        ) == true
      ) {
        document.getElementById("button1").innerHTML = currentLanguage[1];
        document.getElementById("resultofcalculsize").innerHTML =
          currentLanguage[0] + " : " + gamename;
        document.getElementById(txtVID).innerHTML =
          currentLanguage[62] +
          fs
            .readFileSync(
              gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
            )
            .toString();
      }
    } else {
      Toastifycation(currentLanguage[66]);
    }
  }
}
//Open any type of file or folder
function Open(dossierdujeu, filename) {
  shell.openPath(gamelocation + "/Games/" + dossierdujeu + "/" + filename);
}
//Open games in LINUX OS
function OpenforLinux(gameloc, dossierdujeu, filename) {
  execSync(
    "cd " +
      gameloc +
      "/Games/" +
      dossierdujeu +
      ";" +
      " chmod a+x ./" +
      filename +
      ";" +
      " ./" +
      filename
  );
}

function DownlaodVersion(file_url, targetPath) {
  const { BrowserWindow } = require("electron").remote;
  let win = BrowserWindow.getFocusedWindow();
  only_one = true;
  var received_bytes = 0;
  var total_bytes = 0;
  var req = request({
    method: "GET",
    uri: file_url,
  });
  var out = fs.createWriteStream(targetPath);
  req.pipe(out);
  req.on("response", function (data) {
    total_bytes = parseInt(data.headers["content-length"]);
  });
  req.on("data", function (chunk) {
    received_bytes += chunk.length;
  });
  req.on("end", function () {});
}
//Download part
function DownlaodFile(file_url, targetPath) {
  console.log("DL phase 2");
  var received_bytes = 0;
  var total_bytes = 0;
  var req = request({
    method: "GET",
    uri: file_url,
  });
  var out = fs.createWriteStream(targetPath);
  var starte = new Date().getTime();
  console.log("DL phase 3");
  req.pipe(out);
  req.on("response", function (data) {
    total_bytes = parseInt(data.headers["content-length"]);
  });
  req.on("data", function (chunk) {
    // Update the received bytes
    received_bytes += chunk.length;

    showProgress(received_bytes, total_bytes, starte, 1, 1); //show progress in progress-bar
  });
  req.on("end", function () {
    const { BrowserWindow } = require("electron").remote;
    let win = BrowserWindow.getFocusedWindow();
    var elem = document.getElementById("myBar");
    elem.style.width = 0;
    elem.className = "indeterminate";
    document.getElementById("downloadbtn2").classList.add("disabled");
    document.getElementById("DLTEXT").innerHTML = currentLanguage[29];
    document.getElementById("resultofcalculsize").innerHTML =
      currentLanguage[30];
  });
}

//Show the progress of download
function showProgress(received, total, starttime, i, limitlist) {
  const { BrowserWindow } = require("electron").remote;
  let win = BrowserWindow.getFocusedWindow();
  var percentage = (received / total) * 100;
  var elem = document.getElementById("myBar");
  elem.className = "determinate";
  document.getElementById("DLTEXT").innerHTML =
    currentLanguage[31] + i + "/" + limitlist;
  document.getElementById("resultofcalculsize").innerHTML = currentLanguage[32];

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
  document.getElementById("MyBartxt").innerHTML =
    bytesToSize(bps) +
    "/s -- " +
    minutes +
    " " +
    currentLanguage[33] +
      " "+
    seconds +
    " " +
    currentLanguage[34] +
    " (" +
    bytesToSize(received) +
    "/" +
    bytesToSize(total) +
    ")";
  console.log(
    percentage.toFixed() +
      "% | " +
      received.toFixed() +
      " bytes out of " +
      total.toFixed() +
      " bytes."
  );
}

//delete a file
//modify to add games
function deletefile(file2delete) {
  const { BrowserWindow } = require("electron").remote;
  let win = BrowserWindow.getFocusedWindow();
  var filepath = file2delete;
  console.log(filepath);
  if (fs.existsSync(filepath)) {
    fs.unlink(filepath, (err) => {
      if (err) {
        Toastifycation(err.message);
        console.log(err);
      }
    });
  } else {
    Toastifycation(currentLanguage[35]);
  }

  setTimeout(function () {
    if (connectedtointernet == "true") {
      if (portable == true) {
        if (process.platform == "linux") {
          window.location.reload();
        } else {
          window.location.reload();
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

function DLGH(file_url, targetPath, n, list, listlimit, dossierdujeu, os) {
  console.log("DL phase 2");
  var received_bytes = 0;
  var total_bytes = 0;
  var req = request({
    method: "GET",
    uri: file_url,
  });
  var out = fs.createWriteStream(targetPath);
  var starte = new Date().getTime();
  console.log("DL phase 3");
  req.pipe(out);
  req.on("response", function (data) {
    total_bytes = parseInt(data.headers["content-length"]);
  });
  req.on("data", function (chunk) {
    // Update the received bytes
    received_bytes += chunk.length;
    document.getElementById("myBar2").style.width =
      ((n * 100) / listlimit).toString() + "%";
    document.getElementById("actualDL").innerHTML = list[n - 1][0];

    showProgress(received_bytes, total_bytes, starte, n, listlimit); //show progress in progress-bar
  });
  req.on("end", function () {
    const { BrowserWindow } = require("electron").remote;
    let win = BrowserWindow.getFocusedWindow();
    var elem = document.getElementById("myBar");
    elem.style.width = 0;
    if (n != listlimit) {
      if (list[n][1] == "0") {
        if (dossierdujeu == "SNRE") {
          if (os == 0) {
            DLGH(
              "https://raw.githubusercontent.com/Nytuo/SN/master/Windows/" +
                list[n][0],
              gamelocation + "/Games/" + dossierdujeu + "/" + list[n][0],
              n + 1,
              list,
              listlimit,
              dossierdujeu,
              0
            );
          } else {
            DLGH(
              "https://raw.githubusercontent.com/Nytuo/SN/master/Linux/" +
                list[n][0],
              gamelocation + "/Games/" + dossierdujeu + "/" + list[n][0],
              n + 1,
              list,
              listlimit,
              dossierdujeu,
              1
            );
          }
        } else {
          if (os == 0) {
            DLGH(
              "https://raw.githubusercontent.com/Nytuo/" +
                dossierdujeu +
                "/master/Windows/" +
                list[n][0],
              gamelocation + "/Games/" + dossierdujeu + "/" + list[n][0],
              n + 1,
              list,
              listlimit,
              dossierdujeu,
              0
            );
          } else {
            DLGH(
              "https://raw.githubusercontent.com/Nytuo/" +
                dossierdujeu +
                "/master/Linux/" +
                list[n][0],
              gamelocation + "/Games/" + dossierdujeu + "/" + list[n][0],
              n + 1,
              list,
              listlimit,
              dossierdujeu,
              1
            );
          }
        }
      } else {
        if (os == 0) {
          DLGH(
            list[n][1],
            gamelocation + "/Games/" + dossierdujeu + "/" + list[n][0],
            n + 1,
            list,
            listlimit,
            dossierdujeu,
            0
          );
        } else {
          DLGH(
            list[n][1],
            gamelocation + "/Games/" + dossierdujeu + "/" + list[n][0],
            n + 1,
            list,
            listlimit,
            dossierdujeu,
            1
          );
        }
      }
    } else {
      elem.className = "indeterminate";
      document.getElementById("DLTEXT").innerHTML = currentLanguage[177];
      document.getElementById("resultofcalculsize").innerHTML =
        currentLanguage[178];
      document.getElementById("actualDL").innerHTML = "";
      document.getElementById("pgrs2").style.display = "none";
      document.getElementById("MyBartxt").innerHTML = "";

      setTimeout(function () {
        if (connectedtointernet == "true") {
          if (portable == true) {
            if (process.platform == "linux") {
              window.location.reload();
            } else {
              window.location.reload();
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
  });
}

function DLGHManifest(file_url, targetPath, dossierdujeu, os) {
  console.log(file_url);
  console.log("DL phase 2");
  var received_bytes = 0;
  var total_bytes = 0;
  var req = request({
    method: "GET",
    uri: file_url,
  });
  var out = fs.createWriteStream(targetPath);
  var starte = new Date().getTime();
  console.log("DL phase 3");
  req.pipe(out);
  req.on("response", function (data) {
    total_bytes = parseInt(data.headers["content-length"]);
  });
  req.on("data", function (chunk) {
    // Update the received bytes
    received_bytes += chunk.length;

    showProgress(received_bytes, total_bytes, starte, 1, 1); //show progress in progress-bar
  });
  req.on("end", function () {
    const { BrowserWindow } = require("electron").remote;
    let win = BrowserWindow.getFocusedWindow();
    var elem = document.getElementById("myBar");
    elem.style.width = 0;
    elem.className = "indeterminate";
    document.getElementById("DLTEXT").innerHTML = currentLanguage[29];
    document.getElementById("resultofcalculsize").innerHTML =
      currentLanguage[30];
    document.getElementById("actualDL").innerHTML = "";
    setTimeout(() => {
      var FilesList = fs
        .readFileSync(
          gamelocation + "/Games/" + dossierdujeu + "/install_Manifest.txt",
          "utf-8"
        )
        .toString()
        .split("\n");
      FilesList.pop();
      var arr2 = [];
      for (let i = 0; i < FilesList.length; i++) {
        var element = FilesList[i];
        element = element.toString().split(",");
        arr2.push(element);
      }
      setTimeout(() => {
        createDLGameTree(arr2, dossierdujeu, os);
      }, 2000);
    }, 4000);
  });
}

function createDLGameTree(List, dossierdujeu, os) {
  console.log("Creating the GameDL Tree");
  console.log(List);
  for (let i = 0; i < List.length; i++) {
    var element = List[i][0];
    console.log(element);
    if (element.includes("\\") == true) {
      element = element.substring(0, element.lastIndexOf("\\") + 1);
      console.log(element);
      if (
        fs.existsSync(
          gamelocation + "/Games/" + dossierdujeu + "/" + element
        ) == false
      ) {
        require("shelljs").mkdir(
          "-p",
          gamelocation + "/Games/" + dossierdujeu + "/" + element
        );
      }
    }
  }

  LaunchDL(dossierdujeu, List, os);
}

function DLFromGitHubAllFiles(dossierdujeu, os) {
  console.log(dossierdujeu);
  if (dossierdujeu == "SNRE") {
    if (os == 0) {
      DLGHManifest(
        "https://raw.githubusercontent.com/Nytuo/SN/master/Windows/install_Manifest",
        gamelocation + "/Games/" + dossierdujeu + "/install_Manifest.txt",
        dossierdujeu,
        0
      );
    } else {
      DLGHManifest(
        "https://raw.githubusercontent.com/Nytuo/SN/master/Linux/install_Manifest",
        gamelocation + "/Games/" + dossierdujeu + "/install_Manifest.txt",
        dossierdujeu,
        1
      );
    }
  } else {
    if (os == 0) {
      DLGHManifest(
        "https://raw.githubusercontent.com/Nytuo/" +
          dossierdujeu +
          "/master/Windows/install_Manifest",
        gamelocation + "/Games/" + dossierdujeu + "/install_Manifest.txt",
        dossierdujeu,
        0
      );
    } else {
      DLGHManifest(
        "https://raw.githubusercontent.com/Nytuo/" +
          dossierdujeu +
          "/master/Linux/install_Manifest",
        gamelocation + "/Games/" + dossierdujeu + "/install_Manifest.txt",
        dossierdujeu,
        1
      );
    }
  }
}

function LaunchDL(dossierdujeu, FilesList, os) {
  document.getElementById("pgrs2").style.display = "block";
  console.log(FilesList);
  if (dossierdujeu == "SNRE") {
    if (FilesList[0][1] == "0") {
      if (os == 0) {
        console.log(FilesList[0][1]);

        DLGH(
          "https://raw.githubusercontent.com/Nytuo/SN/master/Windows/" +
            FilesList[0][0],
          gamelocation + "/Games/" + dossierdujeu + "/" + FilesList[0][0],
          1,
          FilesList,
          FilesList.length,
          dossierdujeu,
          0
        );
      } else {
        console.log(FilesList[0][1]);

        DLGH(
          "https://raw.githubusercontent.com/Nytuo/SN/master/Linux/" +
            FilesList[0][0],
          gamelocation + "/Games/" + dossierdujeu + "/" + FilesList[0][0],
          1,
          FilesList,
          FilesList.length,
          dossierdujeu,
          1
        );
      }
    } else {
      if (os == 0) {
        console.log(FilesList[0][1]);
        DLGH(
          FilesList[0][1],
          gamelocation + "/Games/" + dossierdujeu + "/" + FilesList[0][0],
          1,
          FilesList,
          FilesList.length,
          dossierdujeu,
          0
        );
      } else {
        console.log(FilesList[0][1]);

        DLGH(
          FilesList[0][1],
          gamelocation + "/Games/" + dossierdujeu + "/" + FilesList[0][0],
          1,
          FilesList,
          FilesList.length,
          dossierdujeu,
          1
        );
      }
    }
  } else {
    if (FilesList[0][1] == "0") {
      if (os == 0) {
        console.log(FilesList[0][1]);

        DLGH(
          "https://raw.githubusercontent.com/Nytuo/" +
            dossierdujeu +
            "/master/Windows/" +
            FilesList[0][0],
          gamelocation + "/Games/" + dossierdujeu + "/" + FilesList[0][0],
          1,
          FilesList,
          FilesList.length,
          dossierdujeu,
          0
        );
      } else {
        console.log(FilesList[0][1]);

        DLGH(
          "https://raw.githubusercontent.com/Nytuo/" +
            dossierdujeu +
            "/master/Linux/" +
            FilesList[0][0],
          gamelocation + "/Games/" + dossierdujeu + "/" + FilesList[0][0],
          1,
          FilesList,
          FilesList.length,
          dossierdujeu,
          1
        );
      }
    } else {
      if (os == 0) {
        console.log(FilesList[0][1]);
        DLGH(
          FilesList[0][1],
          gamelocation + "/Games/" + dossierdujeu + "/" + FilesList[0][0],
          1,
          FilesList,
          FilesList.length,
          dossierdujeu,
          0
        );
      } else {
        console.log(FilesList[0][1]);

        DLGH(
          FilesList[0][1],
          gamelocation + "/Games/" + dossierdujeu + "/" + FilesList[0][0],
          1,
          FilesList,
          FilesList.length,
          dossierdujeu,
          1
        );
      }
    }
  }
}

//Execute action for windows game only
function DoforWin(dossierdujeu, versiontxt, versionlcl, nomexe, gamename) {
  if (process.platform === "win32") {
    if (connectedtointernet == "true") {
      if (
        fs.existsSync(
          gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
        ) === false
      ) {
        console.log("DL init.");
        DLFromGitHubAllFiles(dossierdujeu, 0);
      } else {
        if (
          fs
            .readFileSync(
              gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
            )
            .toString() ===
          fs.readFileSync(__dirname + "/VersionsFiles/" + versionlcl).toString()
        ) {
          LaunchGame(dossierdujeu);
          //turnonOverlay();
          //Open(dossierdujeu, nomexe);
          //setTimeout(function () {
          //  turnoffOverlay();
          //}, 1000);
        } else {
          isInUpdate = true;
          setTimeout(function () {
            REPAIR_DETECT();
          }, 5000);
        }
      }
    } else if (
      fs.existsSync(
        gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
      ) === true
    ) {
      //turnonOverlay();
      //Open(dossierdujeu, nomexe);
      //setTimeout(function () {
      //   turnoffOverlay();
      //}, 1000);
      LaunchGame(dossierdujeu);
    } else {
      Toastifycation(currentLanguage[70]);
    }
  }
  if (process.platform !== "win32") {
    Toastifycation(gamename + currentLanguage[71]);
  }
  ACH_SAVER();
}
//execute action for games
function Do(dossierdujeu, versiontxt, versionlcl, nomexe, gamename, linuxexe) {
  if (process.platform === "win32") {
    if (connectedtointernet == "true") {
      if (
        fs.existsSync(
          gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
        ) === false
      ) {
        DLFromGitHubAllFiles(dossierdujeu, 0);
      } else {
        if (
          fs
            .readFileSync(
              gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
            )
            .toString() ===
          fs.readFileSync(__dirname + "/VersionsFiles/" + versionlcl).toString()
        ) {
          //turnonOverlay();
          //Open(dossierdujeu, nomexe);
          //setTimeout(function () {
          //turnoffOverlay()
          //}, 1000)
          LaunchGame(dossierdujeu);
        } else {
          isInUpdate = true;
          setTimeout(function () {
            REPAIR_DETECT();
          }, 5000);
        }
      }
    } else if (
      fs.existsSync(
        gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
      ) === true
    ) {
      //turnonOverlay();
      //Open(dossierdujeu, nomexe);
      //setTimeout(function () {
      //   turnoffOverlay()
      //}, 1000)
      LaunchGame(dossierdujeu);
    } else {
      Toastifycation(currentLanguage[70]);
    }
  }
  if (process.platform === "linux") {
    if (connectedtointernet == "true") {
      if (
        fs.existsSync(
          gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
        ) === false
      ) {
        DLFromGitHubAllFiles(dossierdujeu, 1);
      } else {
        if (portable == true) {
          if (
            fs
              .readFileSync(
                gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
              )
              .toString() ===
            fs
              .readFileSync(
                parentfolder3 +
                  "/nytuolauncher_data/VersionsFiles/" +
                  versionlcl
              )
              .toString()
          ) {
            LaunchGame(dossierdujeu);
          } else {
            isInUpdate = true;
            setTimeout(function () {
              REPAIR_DETECT();
            }, 5000);
          }
        } else {
          if (
            fs
              .readFileSync(
                gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
              )
              .toString() ===
            fs
              .readFileSync(
                app.getPath("documents") +
                  "/nytuolauncher_data/VersionsFiles/" +
                  versionlcl
              )
              .toString()
          ) {
            LaunchGame(dossierdujeu);
          } else {
            isInUpdate = true;
            setTimeout(function () {
              REPAIR_DETECT();
            }, 5000);
          }
        }
      }
    } else if (
      fs.existsSync(
        gamelocation + "/Games/" + dossierdujeu + "/" + versiontxt
      ) === true
    ) {
      LaunchGame(dossierdujeu);
    } else {
      Toastifycation(currentLanguage[70]);
    }
  }
  if (process.platform != "linux" && process.platform != "win32") {
    Toastifycation(gamename + currentLanguage[71]);
  }
  ACH_SAVER();
}

function FileRemover(list1, list2, rlist, dossier, n) {
  console.log(rlist);
  //supprimer les fichiers
  if (rlist.length > 0) {
    if (n <= rlist.length) {
      if (fs.existsSync(gamelocation + "/Games/" + dossier + "/" + rlist[n])) {
        fs.unlink(
          gamelocation + "/Games/" + dossier + "/" + rlist[n],
          (err) => {
            if (err) {
              Toastifycation(err.message);
              console.log(err);
            }
          }
        );
        FileRemover(list1, list2, rlist, dossier, n + 1);
      } else {
        Toastifycation(currentLanguage[35]);
        FileRemover(list1, list2, rlist, dossier, n + 1);
      }
    } else {
      CreateRepairDLManifest(list1, list2, dossier);
    }
  } else {
    CreateRepairDLManifest(list1, list2, dossier);
  }
}

function CreateRemoveManifeste(list1, list2, dossier) {
  console.log(list1, list2);
  var TheList = [];
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      var tmp = [];
      if (list1[i][0] == list2[j][0]) {
        if (list1[i][2] != list2[j][1]) {
          console.log("DEBUG : " + list2[j][0]);
          if (TheList.indexOf(list2[j][0]) < 0) {
            TheList.push(list2[j][0]);
          }
        }
      } else {
        var arr = list1.filter(function (el) {
          return !!~el.indexOf(list2[j][0]);
        });
        console.log(arr);
        if (arr == false) {
          console.log("DEBUG : " + list2[j][0]);
          if (TheList.indexOf(list2[j][0]) < 0) {
            TheList.push(list2[j][0]);
          }
        }
      }
    }
  }
  console.log(TheList);
  setTimeout(() => {
    FileRemover(list1, list2, TheList, dossier, 0);
  }, 2000);
}

function CreateRepairDLManifest(list1, list2, dossier) {
  console.log(list1, list2);
  var TheList = [];
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      var tmp = [];
      if (list1[i][0] == list2[j][0]) {
        if (list1[i][2] != list2[j][1]) {
          console.log("DEBUG : " + list1[i][0]);
          var arr3 = TheList.filter(function (el) {
            return !!~el.indexOf(list1[i][0]);
          });
          if (arr3 == false) {
            TheList.push([list1[i][0], list1[i][1]]);
          }
        }
      } else {
        var arr = list2.filter(function (el) {
          return !!~el.indexOf(list1[i][0]);
        });
        console.log(arr);
        if (arr == false) {
          console.log("DEBUG : " + list1[i][0]);
          var arr2 = TheList.filter(function (el) {
            return !!~el.indexOf(list1[i][0]);
          });
          if (arr2 == false) {
            TheList.push([list1[i][0], list1[i][1]]);
          }
        }
      }
    }
  }

  console.log(TheList);
  setTimeout(() => {
    LaunchRepairDL(dossier, TheList);
  }, 2000);
}

function LaunchRepairDL(dossier, TheList) {
  if (TheList.length > 0) {
    setTimeout(function () {
      if (process.platform === "win32") {
        LaunchDL(dossier, TheList, 0);
      }
      if (process.platform === "linux") {
        LaunchDL(dossier, TheList, 1);
      }
    }, 5000);
  } else {
    window.location.reload();
  }
}

function CompareForRepair(list1, list2, GameName) {
  console.log(list1, list2);
  var TheList = [];
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      var tmp = [];
      if (list1[i][0] == list2[j][0]) {
        if (list1[i][2] != list2[j][1]) {
          console.log("DEBUG : " + list2[j][0]);
          if (TheList.indexOf(list2[j][0]) < 0) {
            TheList.push(list2[j][0]);
          }
        }
      } else {
        var arr = list1.filter(function (el) {
          return !!~el.indexOf(list2[j][0]);
        });
        console.log(arr);
        if (arr == false) {
          console.log("DEBUG : " + list2[j][0]);
          if (TheList.indexOf(list2[j][0]) < 0) {
            TheList.push(list2[j][0]);
          }
        }
      }
    }
  }
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      var tmp = [];
      if (list1[i][0] == list2[j][0]) {
        if (list1[i][2] != list2[j][1]) {
          console.log("DEBUG : " + list1[i][0]);
          if (TheList.indexOf([list1[i][0], list1[i][1]]) < 0) {
            TheList.push([list1[i][0], list1[i][1]]);
          }
        }
      } else {
        var arr = list2.filter(function (el) {
          return !!~el.indexOf(list1[i][0]);
        });
        console.log(arr);
        if (arr == false) {
          console.log("DEBUG : " + list1[i][0]);
          if (TheList.indexOf([list1[i][0], list1[i][1]]) < 0) {
            TheList.push([list1[i][0], list1[i][1]]);
          }
        }
      }
    }
  }

  console.log(TheList);
  if (TheList.length > 0) {
    Toastifycation(GameName + currentLanguage[92]);

    REINSTALL_DETECT(list1, list2, true);
  } else {
    Toastifycation(GameName + currentLanguage[91]);
  }
}
//repair a game
function repair(dossier, list1, list2) {
  const { BrowserWindow } = require("electron").remote;
  let win = BrowserWindow.getFocusedWindow();
  console.log(gamelocation + "/Games/" + dossier);
  CreateRemoveManifeste(list1, list2, dossier);
  //Cree le manifeste de DL
  //Supprimer les trucs en trop
}
//delete a folder for a repair
function deletefolderforrepair(folder2delete, DDG, os) {
  fs.rmdir(folder2delete, { recursive: true }, (err) => {
    if (err) {
      Toastifycation(err);
    }
    console.log("Done");
    if (!fs.existsSync(gamelocation + "/Games"))
      fs.mkdirSync(gamelocation + "/Games", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/AE"))
      fs.mkdirSync(gamelocation + "/Games/AE", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/SNRE"))
      fs.mkdirSync(gamelocation + "/Games/SNRE", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/LAATIM"))
      fs.mkdirSync(gamelocation + "/Games/LAATIM", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/LA"))
      fs.mkdirSync(gamelocation + "/Games/LA", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/SGB"))
      fs.mkdirSync(gamelocation + "/Games/SGB", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/SF"))
      fs.mkdirSync(gamelocation + "/Games/SF", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/TTD"))
      fs.mkdirSync(gamelocation + "/Games/TTD", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/TB"))
      fs.mkdirSync(gamelocation + "/Games/TB", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/FWD"))
      fs.mkdirSync(gamelocation + "/Games/FWD", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/VITF"))
      fs.mkdirSync(gamelocation + "/Games/VITF", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/WR"))
      fs.mkdirSync(gamelocation + "/Games/WR", { recursive: true });
    if (!fs.existsSync(gamelocation + "/Games/SFO"))
      fs.mkdirSync(gamelocation + "/Games/SFO", { recursive: true });
    DLFromGitHubAllFiles(DDG, os);
  });
}
//run online version of a game
function RunWithoutInstall(url, gamejolt) {
  setTimeout(function () {}, 1000);
  const BrowserWindow = require("electron").remote.BrowserWindow;
  const path = require("path");
  const win = new BrowserWindow({
    minHeight: 480,
    minWidth: 720,
    height: 480,
    width: 720,
    icon: path.join(__dirname, "Resources/logoexp.png"),
  });
  win.loadURL(url);
  if (gamejolt === "true") {
    setTimeout(function () {
      win.close();
    }, 5000);
  }
}

function LaunchExternally() {
  var page;
  if (process.platform == "linux") {
    if (window.location.href == "file://" + dirnamew + "/Games.html?sn") {
      page = "https://nytuo.yo.fr/sn.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ae") {
      page = "https://nytuo.yo.fr/ae.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?wr") {
      page = "https://nytuo.yo.fr/wr.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?tb") {
      page = "https://nytuo.yo.fr/tb.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?fwd") {
      page = "https://nytuo.yo.fr/fwd.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?ttd") {
      page = "https://nytuo.yo.fr/ttd.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?vitf") {
      page = "https://nytuo.yo.fr/vitf.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?la") {
      page = "https://nytuo.yo.fr/la.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sf") {
      page = "https://nytuo.yo.fr/sf.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?sgb") {
      page = "https://nytuo.yo.fr/sgb.html";
    }
    if (window.location.href == "file://" + dirnamew + "/Games.html?laatim") {
      page = "https://nytuo.yo.fr/laatim.html";
    }
  } else {
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sfo") {
      page = "https://nytuo.yo.fr/sfo.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?laatim") {
      page = "https://nytuo.yo.fr/laatim.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sgb") {
      page = "https://nytuo.yo.fr/sgb.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sf") {
      page = "https://nytuo.yo.fr/sf.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?la") {
      page = "https://nytuo.yo.fr/la.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?vitf") {
      page = "https://nytuo.yo.fr/vitf.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ttd") {
      page = "https://nytuo.yo.fr/ttd.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?fwd") {
      page = "https://nytuo.yo.fr/fwd.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?tb") {
      page = "https://nytuo.yo.fr/tb.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?wr") {
      page = "https://nytuo.yo.fr/wr.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?ae") {
      page = "https://nytuo.yo.fr/ae.html";
    }
    if (window.location.href == "file:///" + dirnamew + "/Games.html?sn") {
      page = "https://nytuo.yo.fr/sn.html";
    }
  }
  if (page != "") {
    window.open(page);
  }
}

function LaunchGame(gameid) {
  const BrowserWindow = require("electron").remote.BrowserWindow;
  const path = require("path");
  let launching = new BrowserWindow({
    backgroundColor: 212121,
    width: 520,
    height: 280,
    frame: false,
    resizable: false,
    alwaysOnTop: false,
    icon: path.join(__dirname, "Resources/logoexp.png"),
    webPreferences: {
      webSecurity: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  if (process.platform == "linux") {
    launching.loadURL("file://" + __dirname + "/Gamelaunch.html?" + gameid);
  } else {
    launching.loadURL(__dirname + "/Gamelaunch.html?" + gameid);
  }
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}
