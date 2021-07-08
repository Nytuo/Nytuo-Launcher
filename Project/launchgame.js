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

//Variables et constantes
const { shell } = require("electron");
const fs = require("fs");
const app = require("electron").remote.app;
const parentfolder1 = require("path").dirname(__dirname);
const parentfolder2 = require("path").dirname(parentfolder1);
const parentfolder3 = require("path").dirname(parentfolder2);
const portable = portable_check();
const currentLanguage = language();

const gamelocation = gameloc();
const { execSync } = require("child_process");
const dirnamew = __dirname.replace(/\\/g, "/");
var LID;

function language() {
  if (portable == true) {
    if (process.platform == "linux") {
      if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt")) {
        LID = fs
          .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
          .toString();

        if (fs.existsSync(__dirname + "/Languages") == true) {
          if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {
            let t = require("fs")
              .readFileSync(
                __dirname + "/Languages/LID_" + LID + ".txt",
                "utf-8"
              )
              .split("\n");
            return Array.from(new Set(t));
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        return [];
      }
    } else if (process.platform == "win32") {
      if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt")) {
        LID = fs
          .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
          .toString();

        if (fs.existsSync(__dirname + "/Languages") == true) {
          if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {
            let t = require("fs")
              .readFileSync(
                __dirname + "/Languages/LID_" + LID + ".txt",
                "utf-8"
              )
              .split("\n");
            return Array.from(new Set(t));
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  } else {
    if (process.platform == "linux") {
      if (
        fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/LID.txt")
      ) {
        LID = fs
          .readFileSync(
            app.getPath("documents") + "/nytuolauncher_data/LID.txt"
          )
          .toString();

        if (fs.existsSync(__dirname + "/Languages") == true) {
          if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {
            let t = require("fs")
              .readFileSync(
                __dirname + "/Languages/LID_" + LID + ".txt",
                "utf-8"
              )
              .split("\n");
            return Array.from(new Set(t));
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        return [];
      }
    } else if (process.platform == "win32") {
      if (fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt")) {
        LID = fs
          .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
          .toString();

        if (fs.existsSync(__dirname + "/Languages") == true) {
          if (fs.existsSync(__dirname + "/Languages/LID_" + LID + ".txt")) {
            let t = require("fs")
              .readFileSync(
                __dirname + "/Languages/LID_" + LID + ".txt",
                "utf-8"
              )
              .split("\n");
            return Array.from(new Set(t));
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        return [];
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
      if (
        fs.existsSync(
          parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
        ) === true
      ) {
        if (
          fs.readFileSync(
            parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
          ) !== ""
        ) {
          return fs.readFileSync(
            parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
          );
        } else {
          alert(currentLanguage[26]);
          return parentfolder3;
        }
      } else {
        alert(currentLanguage[27]);
        return parentfolder3;
      }
    } else {
      if (
        fs.existsSync(
          parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
        ) === true
      ) {
        if (
          fs.readFileSync(
            parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
          ) !== ""
        ) {
          return fs.readFileSync(
            parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
          );
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
      if (
        fs.existsSync(
          app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt"
        ) === true
      ) {
        if (
          fs.readFileSync(
            app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt"
          ) !== ""
        ) {
          return fs.readFileSync(
            app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt"
          );
        } else {
          alert(currentLanguage[24]);
          return app.getPath("documents");
        }
      } else {
        alert(currentLanguage[25]);
        return app.getPath("documents");
      }
    } else {
      if (
        fs.existsSync(
          parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
        ) === true
      ) {
        if (
          fs.readFileSync(
            parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
          ) !== ""
        ) {
          return fs.readFileSync(
            parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt"
          );
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

//Open any type of file or folder
function Open(dossierdujeu, filename) {
  if (
    shell.openPath(gamelocation + "/Games/" + dossierdujeu + "/" + filename)
  ) {
    setTimeout(() => {
      close();
    }, 5000);
  }
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
  close();
}

function detectgamepage() {
  if (process.platform == "linux" || process.platform == "darwin") {
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SFTW") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[179];
      document.getElementById("IMGLOAD").src = "Resources/SFTW.png";
      document.getElementById("IMGLOAD").style.width = "35%";
      document.getElementById("BG").className = "IMGBGSFTW";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SFO") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[110];
      document.getElementById("IMGLOAD").src = "Resources/LogoSFO2.png";
      document.getElementById("IMGLOAD").style.width = "35%";
      document.getElementById("BG").className = "IMGBGSFO";
    }
    if (
      window.location.href ==
      "file://" + dirnamew + "/Gamelaunch.html?LAATIM"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[111];
      document.getElementById("IMGLOAD").src = "Resources/LogoLAATIM.png";
      document.getElementById("IMGLOAD").style.width = "20%";
      document.getElementById("BG").className = "IMGBGLAATIM";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SGB") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[112];
      document.getElementById("IMGLOAD").src = "Resources/SGB1.png";
      document.getElementById("IMGLOAD").style.width = "40%";
      document.getElementById("BG").className = "IMGBGSGB";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SF") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[113];
      document.getElementById("IMGLOAD").src = "Resources/LogoSF.png";
      document.getElementById("IMGLOAD").style.width = "20%";
      document.getElementById("BG").className = "IMGBGSF";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?LA") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[114];
      document.getElementById("IMGLOAD").src = "Resources/LogoLA.png";
      document.getElementById("IMGLOAD").style.width = "35%";
      document.getElementById("BG").className = "IMGBGLA";
    }
    if (
      window.location.href ==
      "file://" + dirnamew + "/Gamelaunch.html?VITF"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[115];
      document.getElementById("IMGLOAD").src = "Resources/LogoVITF.png";
      document.getElementById("IMGLOAD").style.width = "50%";
      document.getElementById("BG").className = "IMGBGVITF";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TTD") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[116];
      document.getElementById("IMGLOAD").src = "Resources/LogoTTD.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGTTD";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?FWD") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[117];
      document.getElementById("IMGLOAD").src = "Resources/LogoFWD.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGFWD";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TB") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[118];
      document.getElementById("IMGLOAD").src = "Resources/LogoTB.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGTB";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?WR") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[119];
      document.getElementById("IMGLOAD").src = "Resources/LogoWR.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGWR";
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?AE") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[120];
      document.getElementById("IMGLOAD").src = "Resources/LogoAE.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGAE";
    }
    if (
      window.location.href ==
      "file://" + dirnamew + "/Gamelaunch.html?SNRE"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[121];
      document.getElementById("IMGLOAD").src = "Resources/LogoSN.png";
      document.getElementById("IMGLOAD").style.width = "17%";
      document.getElementById("BG").className = "IMGBGSNRE";
    }
  } else {
    if (
        window.location.href ==
        "file:///" + dirnamew + "/Gamelaunch.html?SFTW"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[179];
      document.getElementById("IMGLOAD").src = "Resources/SFTW.png";
      document.getElementById("IMGLOAD").style.width = "35%";
      document.getElementById("BG").className = "IMGBGSFTW";
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SFO"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[110];
      document.getElementById("IMGLOAD").src = "Resources/LogoSFO2.png";
      document.getElementById("IMGLOAD").style.width = "35%";
      document.getElementById("BG").className = "IMGBGSFO";
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?LAATIM"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[111];
      document.getElementById("IMGLOAD").src = "Resources/LogoLAATIM.png";
      document.getElementById("IMGLOAD").style.width = "20%";
      document.getElementById("BG").className = "IMGBGLAATIM";
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SGB"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[112];
      document.getElementById("IMGLOAD").src = "Resources/SGB1.png";
      document.getElementById("IMGLOAD").style.width = "40%";
      document.getElementById("BG").className = "IMGBGSGB";
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SF") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[113];
      document.getElementById("IMGLOAD").src = "Resources/LogoSF.png";
      document.getElementById("IMGLOAD").style.width = "20%";
      document.getElementById("BG").className = "IMGBGSF";
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LA") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[114];
      document.getElementById("IMGLOAD").src = "Resources/LogoLA.png";
      document.getElementById("IMGLOAD").style.width = "35%";
      document.getElementById("BG").className = "IMGBGLA";
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?VITF"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[115];
      document.getElementById("IMGLOAD").src = "Resources/LogoVITF.png";
      document.getElementById("IMGLOAD").style.width = "50%";
      document.getElementById("BG").className = "IMGBGVITF";
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?TTD"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[116];
      document.getElementById("IMGLOAD").src = "Resources/LogoTTD.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGTTD";
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?FWD"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[117];
      document.getElementById("IMGLOAD").src = "Resources/LogoFWD.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGFWD";
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TB") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[118];
      document.getElementById("IMGLOAD").src = "Resources/LogoTB.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGTB";
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?WR") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[119];
      document.getElementById("IMGLOAD").src = "Resources/LogoWR.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGWR";
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?AE") {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[120];
      document.getElementById("IMGLOAD").src = "Resources/LogoAE.png";
      document.getElementById("IMGLOAD").style.width = "25%";
      document.getElementById("BG").className = "IMGBGAE";
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SNRE"
    ) {
      document.getElementById("TXTLOAD").innerHTML = currentLanguage[121];
      document.getElementById("IMGLOAD").src = "Resources/LogoSN.png";
      document.getElementById("IMGLOAD").style.width = "17%";
      document.getElementById("BG").className = "IMGBGSNRE";
    }
  }
  LAUNCH();
}

//execute by games actions
//modify to add games
function LAUNCH() {
  if (process.platform == "linux") {
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SFTW") {
      setTimeout(() => {
        OpenforLinux(gamelocation, "SFTW", "RiffleDivision.sh");
      }, 2000);
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SFO") {
      setTimeout(() => {
        OpenforLinux(gamelocation, "SFO", "nw");
      }, 2000);
    }
    if (
      window.location.href ==
      "file://" + dirnamew + "/Gamelaunch.html?LAATIM"
    ) {
      alert("Game not available on Linux");
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SGB") {
      setTimeout(() => {
        OpenforLinux(gamelocation, "SGB", "nw");
      }, 2000);
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?SF") {
      alert("Game not available on Linux");
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?LA") {
      alert("Game not available on Linux");
    }
    if (
      window.location.href ==
      "file://" + dirnamew + "/Gamelaunch.html?VITF"
    ) {
      alert("Game not available on Linux");
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TTD") {
      setTimeout(() => {
        OpenforLinux(gamelocation, "TTD", "nw");
      }, 2000);
    }
    if (
      window.location.href ==
      "file://" + dirnamew + "/Gamelaunch.html?SNRE"
    ) {
      setTimeout(() => {
        OpenforLinux(gamelocation, "SNRE", "nw");
      }, 2000);
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?FWD") {
      setTimeout(() => {
        OpenforLinux(gamelocation, "FWD", "nw");
      }, 2000);
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?TB") {
      setTimeout(() => {
        OpenforLinux(gamelocation, "TB", "nw");
      }, 2000);
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?WR") {
      setTimeout(() => {
        OpenforLinux(gamelocation, "WR", "nw");
      }, 2000);
    }
    if (window.location.href == "file://" + dirnamew + "/Gamelaunch.html?AE") {
      alert("Game not available on Linux");
    }
  } else if (process.platform == "win32") {
    if (
        window.location.href ==
        "file:///" + dirnamew + "/Gamelaunch.html?SFTW"
    ) {
      setTimeout(() => {
        Open("SFTW", "RiffleDivision.exe");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SFO"
    ) {
      setTimeout(() => {
        Open("SFO", "nw.exe");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?LAATIM"
    ) {
      setTimeout(() => {
        Open("LAATIM", "LA_IM.exe");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SGB"
    ) {
      setTimeout(() => {
        Open("SGB", "nw.exe");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SF") {
      setTimeout(() => {
        Open("SF", "ShootFighter.exe");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LA") {
      setTimeout(() => {
        Open("LA", "Lutin_Adventure.exe");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?VITF"
    ) {
      setTimeout(() => {
        Open("VITF", "VincentInTheForest.exe");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?TTD"
    ) {
      setTimeout(() => {
        Open("TTD", "nw.exe");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SNRE"
    ) {
      setTimeout(() => {
        Open("SNRE", "nw.exe");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?FWD"
    ) {
      setTimeout(() => {
        Open("FWD", "nw.exe");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TB") {
      setTimeout(() => {
        Open("TB", "nw.exe");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?WR") {
      setTimeout(() => {
        Open("WR", "nw.exe");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?AE") {
      setTimeout(() => {
        Open("AE", "AsteroidEscapeWinV1FinalPatch1.exe");
      }, 2000);
    }
  } else {
    if (
        window.location.href ==
        "file:///" + dirnamew + "/Gamelaunch.html?SFTW"
    ) {
      alert("Game not supported on this platform yet");
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SFO"
    ) {
      setTimeout(() => {
        Open("SFO", "shootfighterorigins.app");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?LAATIM"
    ) {
      alert("Game not supported on this platform");
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SGB"
    ) {
      setTimeout(() => {
        Open("SuperGeoffreyBros", "supergeoffreybros.app");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?SF") {
      alert("Game not supported on this platform");
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?LA") {
      alert("Game not supported on this platform");
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?VITF"
    ) {
      alert("Game not supported on this platform");
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?TTD"
    ) {
      setTimeout(() => {
        Open("TTD", "thetardisdefender.app");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?SNRE"
    ) {
      setTimeout(() => {
        Open("SNRE", "sansnomreedition.app");
      }, 2000);
    }
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Gamelaunch.html?FWD"
    ) {
      setTimeout(() => {
        Open("FWD", "firewalldefender.app");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?TB") {
      setTimeout(() => {
        Open("TB", "tanksbattle.app");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?WR") {
      setTimeout(() => {
        Open("WR", "winrun.app");
      }, 2000);
    }
    if (window.location.href == "file:///" + dirnamew + "/Gamelaunch.html?AE") {
      alert("Game not supported on this platform");
    }
  }
}
