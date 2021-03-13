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

const { shell, webContents, dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");
const rimraf = require("rimraf");
const extract = require("extract-zip");
var request = require("request");
var fs = require("fs");
const os = require("os");
var homedir = os.homedir();
const app = require("electron").remote.app;
const ws = require("windows-shortcuts");
var updatedownloaded = false;
const path = require("path");
var isInUpdate = false;
var parentfolder1 = require("path").dirname(__dirname);
var parentfolder2 = require("path").dirname(parentfolder1);
var parentfolder3 = require("path").dirname(parentfolder2);
const CryptoJS = require("crypto-js");

var portable = portable_check();
const currentLanguage = language();

const { execSync } = require("child_process");
const { start } = require("repl");
var dirnamew = __dirname.replace(/\\/g, "/");
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
var ProgressBar = require("progressbar.js");
const { options } = require("request");
const { platform } = require("process");
const mat = require("materialize-css");
const { BrowserWindow } = require("electron").remote;
let win = BrowserWindow.getFocusedWindow();
if (portable == true) {
  if (process.platform == "linux") {
    if (
      fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt") == false ||
      fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt") == ""
    ) {
      window.location.href = "SelectLang.html?reload";
    }
  } else {
    if (
      fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt") == false ||
      fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt") == ""
    ) {
      window.location.href = "SelectLang.html?reload";
    }
  }
} else {
  if (process.platform == "linux") {
    if (
      fs.existsSync(app.getPath("documents") + "/nytuolauncher_data/LID.txt") ==
        false ||
      fs.readFileSync(
        app.getPath("documents") + "/nytuolauncher_data/LID.txt"
      ) == ""
    ) {
      window.location.href = "SelectLang.html?reload";
    }
  } else {
    if (
      fs.existsSync(parentfolder3 + "/nytuolauncher_data/LID.txt") == false ||
      fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt") == ""
    ) {
      window.location.href = "SelectLang.html?reload";
    }
  }
}

if (portable == true) {
  document.getElementById("MyBartxt").innerHTML = currentLanguage[137];

  fs.writeFileSync(
    parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt",
    parentfolder3 + "/nytuolauncher_games"
  );
  gamelocation = parentfolder3 + "/nytuolauncher_games";
} else {
  if (process.platform == "linux" || process.platform == "darwin") {
    if (
      fs.existsSync(
        app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt"
      ) === true
    ) {
      if (
        fs.readFileSync(
          app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt"
        ).length == 0
      ) {
        window.location.href = "SelectFolder.html";
      }
    } else {
      window.location.href = "SelectFolder.html";
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
        ).length == 0
      ) {
        window.location.href = "SelectFolder.html";
      }
    } else {
      window.location.href = "SelectFolder.html";
    }
  }
}
var gamelocation = gameloc();

var connectiontest = window.navigator.onLine;

if (portable == true) {
  if (connectiontest == false) {
    if (process.platform == "linux" || process.platform == "darwin") {
      fs.writeFileSync(
        parentfolder3 + "/nytuolauncher_data/connected.txt",
        CryptoJS.AES.encrypt("false", "connection system")
      );
    } else {
      fs.writeFileSync(
        __dirname + "/connected.txt",
        CryptoJS.AES.encrypt("false", "connection system")
      );
    }
  } else {
    if (process.platform == "linux" || process.platform == "darwin") {
      fs.writeFileSync(
        parentfolder3 + "/nytuolauncher_data/connected.txt",
        CryptoJS.AES.encrypt("true", "connection system")
      );
    } else {
      fs.writeFileSync(
        __dirname + "/connected.txt",
        CryptoJS.AES.encrypt("true", "connection system")
      );
    }
  }
} else {
  if (connectiontest == false) {
    if (process.platform == "linux" || process.platform == "darwin") {
      fs.writeFileSync(
        app.getPath("documents") + "/nytuolauncher_data/connected.txt",
        CryptoJS.AES.encrypt("false", "connection system")
      );
    } else {
      fs.writeFileSync(
        __dirname + "/connected.txt",
        CryptoJS.AES.encrypt("false", "connection system")
      );
    }
  } else {
    if (process.platform == "linux" || process.platform == "darwin") {
      fs.writeFileSync(
        app.getPath("documents") + "/nytuolauncher_data/connected.txt",
        CryptoJS.AES.encrypt("true", "connection system")
      );
    } else {
      fs.writeFileSync(
        __dirname + "/connected.txt",
        CryptoJS.AES.encrypt("true", "connection system")
      );
    }
  }
}
var connectedtointernet = connectest();

document.getElementById("MyBartxt").innerHTML = currentLanguage[135];

if (portable == true) {
  if (process.platform == "linux") {
    if (fs.existsSync(parentfolder3 + "/Updater.bat")) {
      fs.unlinkSync(parentfolder3 + "/Updater.bat");
    }
  } else {
    if (fs.existsSync(parentfolder3 + "/Updater.bat")) {
      fs.unlinkSync(parentfolder3 + "/Updater.bat");
    }
  }
} else {
  if (process.platform == "linux") {
    if (fs.existsSync(app.getPath("documents") + "/Updater.bat")) {
      fs.unlinkSync(app.getPath("documents") + "/Updater.bat");
    }
  } else {
    if (fs.existsSync(parentfolder3 + "/Updater.bat")) {
      fs.unlinkSync(parentfolder3 + "/Updater.bat");
    }
  }
}

//detect or create the games folder location
document.getElementById("MyBartxt").innerHTML = currentLanguage[136];

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
            let t1 = Array.from(new Set(t));
            return t1;
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
            let t1 = Array.from(new Set(t));
            return t1;
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
            let t1 = Array.from(new Set(t));
            return t1;
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
            let t1 = Array.from(new Set(t));
            return t1;
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

function connectest() {
  if (portable == true) {
    if (process.platform == "linux" || process.platform == "darwin") {
      return CryptoJS.enc.Latin1.stringify(
        CryptoJS.AES.decrypt(
          fs
            .readFileSync(parentfolder3 + "/nytuolauncher_data/connected.txt")
            .toString(),
          "connection system"
        )
      );
    } else {
      return CryptoJS.enc.Latin1.stringify(
        CryptoJS.AES.decrypt(
          fs.readFileSync(__dirname + "/connected.txt").toString(),
          "connection system"
        )
      );
    }
  } else {
    if (process.platform == "linux" || process.platform == "darwin") {
      return CryptoJS.enc.Latin1.stringify(
        CryptoJS.AES.decrypt(
          fs
            .readFileSync(
              app.getPath("documents") + "/nytuolauncher_data/connected.txt"
            )
            .toString(),
          "connection system"
        )
      );
    } else {
      return CryptoJS.enc.Latin1.stringify(
        CryptoJS.AES.decrypt(
          fs.readFileSync(__dirname + "/connected.txt").toString(),
          "connection system"
        )
      );
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
          ) != ""
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
          ) != ""
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
          ) != ""
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
          ) != ""
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
document.getElementById("MyBartxt").innerHTML = currentLanguage[140];
ACH_SAVER();

function ACH_SAVER() {
  //savegarde les achievements dans le nytuolauncher_data
  if (portable == true) {
    if (process.platform == "linux" || process.platform == "darwin") {
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[141];

        fs.copyFileSync(
          gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[142];

        fs.copyFileSync(
          gamelocation + "/Games/SNRE/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[143];

        fs.copyFileSync(
          gamelocation + "/Games/SGB/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[144];

        fs.copyFileSync(
          gamelocation + "/Games/SFO/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
    } else {
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[141];

        fs.copyFileSync(
          gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[142];

        fs.copyFileSync(
          gamelocation + "/Games/SNRE/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[143];

        fs.copyFileSync(
          gamelocation + "/Games/SGB/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[144];

        fs.copyFileSync(
          gamelocation + "/Games/SFO/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
    }
  } else {
    if (process.platform == "linux" || process.platform == "darwin") {
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[141];

        fs.copyFileSync(
          gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[142];

        fs.copyFileSync(
          gamelocation + "/Games/SNRE/Achievements/AchDone.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[143];

        fs.copyFileSync(
          gamelocation + "/Games/SGB/Achievements/AchDone.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[144];

        fs.copyFileSync(
          gamelocation + "/Games/SFO/Achievements/AchDone.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
    } else {
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[141];

        fs.copyFileSync(
          gamelocation + "/Games/LAATIM/LA_IM/Achievements.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/LAATIM/Achievements.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[142];

        fs.copyFileSync(
          gamelocation + "/Games/SNRE/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SNRE/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[143];

        fs.copyFileSync(
          gamelocation + "/Games/SGB/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SGB/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
      try {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[144];

        fs.copyFileSync(
          gamelocation + "/Games/SFO/Achievements/AchDone.txt",
          parentfolder3 +
            "/nytuolauncher_data/Achievements_Save/SFO/AchDone.txt"
        );
      } catch (error) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[145];

        console.log(error);
      }
    }
  }
}

document.getElementById("MyBartxt").innerHTML = currentLanguage[146];

document.getElementById("MyBartxt").innerHTML = currentLanguage[147];

document.getElementById("MyBartxt").innerHTML = currentLanguage[148];

document.getElementById("MyBartxt").innerHTML = currentLanguage[149];
