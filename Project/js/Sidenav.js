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

var parentfolder1 = require("path").dirname(__dirname);
var parentfolder2 = require("path").dirname(parentfolder1);
var parentfolder3 = require("path").dirname(parentfolder2);
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

if (process.platform == "linux") {
  if (connectedtointernet == "true") {
    if (
      fs.readFileSync(
        app.getPath("documents") + "/nytuolauncher_data/CurrentUser/PP_URL.txt"
      ) == "../images/default.png"
    ) {
      document.getElementById("PP").src = __dirname + "/Resources/default.png";
    } else {
      {
        document.getElementById("PP").src = fs.readFileSync(
          parentfolder3 + "/nytuolauncher_data/CurrentUser/PP_URL.txt"
        );
      }
    }
    document.getElementById("NameTxt").innerHTML = fs.readFileSync(
      gamelocation + "/Games/Username.txt"
    );
    document.getElementById("emailtxt").innerHTML = fs.readFileSync(
      app.getPath("documents") + "/nytuolauncher_data/CurrentUser/Email.txt"
    );
  } else {
    document.getElementById("PP").src = __dirname + "/Resources/default.png";
    document.getElementById("NameTxt").innerHTML = fs.readFileSync(
      gamelocation + "/Games/Username.txt"
    );
    document.getElementById("emailtxt").innerHTML = currentLanguage[167];
  }
} else {
  if (connectedtointernet == "true") {
    if (
      fs.readFileSync(
        parentfolder3 + "/nytuolauncher_data/CurrentUser/PP_URL.txt"
      ) == "../images/default.png"
    ) {
      document.getElementById("PP").src = __dirname + "/Resources/default.png";
    } else {
      document.getElementById("PP").src = fs.readFileSync(
        parentfolder3 + "/nytuolauncher_data/CurrentUser/PP_URL.txt"
      );
    }

    document.getElementById("NameTxt").innerHTML = fs.readFileSync(
      gamelocation + "/Games/Username.txt"
    );
    document.getElementById("emailtxt").innerHTML = fs.readFileSync(
      parentfolder3 + "/nytuolauncher_data/CurrentUser/Email.txt"
    );
  } else {
    document.getElementById("PP").src = __dirname + "/Resources/default.png";
    document.getElementById("NameTxt").innerHTML = fs.readFileSync(
      gamelocation + "/Games/Username.txt"
    );
    document.getElementById("emailtxt").innerHTML = currentLanguage[167];
  }
}

t = [
    "SS",
  "SFTW",
  "SFO",
  "LAATIM",
  "SGB",
  "SF",
  "LA",
  "VITF",
  "TTD",
  "FWD",
  "TB",
  "WR",
  "AE",
];
if (process.platform == "linux") {
  for (let i = 0; i < t.length; i++) {
    if (
      fs.existsSync(
        app.getPath("documents") +
          "/nytuolauncher_data/CurrentUser/" +
          t[i] +
          ".txt"
      )
    ) {
      if (
        fs
          .readFileSync(
            app.getPath("documents") +
              "/nytuolauncher_data/CurrentUser/" +
              t[i] +
              ".txt"
          )
          .toString() != "true"
      ) {
        document.getElementById(t[i].toLowerCase() + "l").innerHTML = "";
      }
    } else {
      document.getElementById(t[i].toLowerCase() + "l").innerHTML = "";
    }
  }

  if (
    fs.existsSync(
      app.getPath("documents") + "/nytuolauncher_data/CurrentUser/SNRE.txt"
    )
  ) {
    if (
      fs
        .readFileSync(
          app.getPath("documents") + "/nytuolauncher_data/CurrentUser/SNRE.txt"
        )
        .toString() != "true"
    ) {
      document.getElementById("snl").innerHTML = "";
    }
  } else {
    document.getElementById("snl").innerHTML = "";
  }
} else {
  for (let i = 0; i < t.length; i++) {
    if (
      fs.existsSync(
        parentfolder3 + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt"
      )
    ) {
      if (
        fs
          .readFileSync(
            parentfolder3 + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt"
          )
          .toString() != "true"
      ) {
        document.getElementById(t[i].toLowerCase() + "l").innerHTML = "";
      }
    } else {
      document.getElementById(t[i].toLowerCase() + "l").innerHTML = "";
    }
  }

  if (
    fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser/SNRE.txt")
  ) {
    if (
      fs
        .readFileSync(
          parentfolder3 + "/nytuolauncher_data/CurrentUser/SNRE.txt"
        )
        .toString() != "true"
    ) {
      document.getElementById("snl").innerHTML = "";
    }
  } else {
    document.getElementById("snl").innerHTML = "";
  }
}
