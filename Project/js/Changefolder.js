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
var fs = require("fs");
const os = require("os");
var homedir = os.homedir();
const app = require("electron").remote.app;
const path = require("path");
var parentfolder1 = require("path").dirname(__dirname);
var parentfolder2 = require("path").dirname(parentfolder1);
var parentfolder3 = require("path").dirname(parentfolder2);

var portable = portable_check();
const currentLanguage = language();

var dirnamew = __dirname.replace(/\\/g, "/");

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

var verif = false;
function portable_check() {
  if (fs.existsSync(__dirname + "/portable.txt")) {
    if (fs.readFileSync(__dirname + "/portable.txt") == "true") {
      return true;
    } else {
      return false;
    }
  }
}

function FolderChange() {
  alert(currentLanguage[165]);
  let folder = dialog.showOpenDialogSync({
    properties: ["openDirectory"],
  });
  if (portable == true) {
    fs.writeFileSync(
      parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt",
      parentfolder3 + "/nytuolauncher_games"
    );
    verif = true;
  } else {
    if (process.platform == "win32") {
      fs.writeFileSync(
        parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt",
        folder
      );
      verif = true;
    } else if (process.platform == "linux") {
      fs.writeFileSync(
        app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt",
        folder
      );
      verif = true;
    }
  }
  document.getElementById("disabled").value = folder;
}
function Continu() {
  if (verif == true) {
    window.location.href = "Loading.html";
  }
}
