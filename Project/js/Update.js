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
var portable = portable_check();
var gamelocation = gameloc();

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

function Toastifycation(message) {
  mat.toast({ html: message });
}

function DownlaodVersion(file_url, targetPath) {
  only_one = true;
  var received_bytes = 0;
  var total_bytes = 0;
  var req = request({
    method: "GET",
    uri: file_url,
  });
  var out = fs.createWriteStream(targetPath);
  var starte = new Date().getTime();

  req.pipe(out);
  req.on("response", function (data) {
    total_bytes = parseInt(data.headers["content-length"]);
  });
  req.on("data", function (chunk) {
    received_bytes += chunk.length;
    showProgressUpdate(received_bytes, total_bytes, starte, "");
  });
  req.on("end", function () {
    document.getElementById("prgs").className = "indeterminate";
    VerifyVersionSizeAndContent(file_url, targetPath);
  });
}

//the update system
var isUp2date = true;

function update() {
  if (connectedtointernet == "true") {
    document.getElementById("MyBartxt").innerHTML = currentLanguage[122];

    setTimeout(function () {
      console.log(
        window.require("electron").remote.app.getVersion().toString()
      );
      if (portable == true) {
        if (process.platform == "linux") {
          var launcherversion = fs.readFileSync(
            parentfolder3 +
              "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
          );
          var launcherversionbeta = fs.readFileSync(
            parentfolder3 +
              "/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt"
          );
        } else {
          var launcherversion = fs.readFileSync(
            __dirname + "/VersionsFiles/LauncherVersion.txt"
          );
          var launcherversionbeta = fs.readFileSync(
            __dirname + "/VersionsFiles/LauncherBetaVersion.txt"
          );
        }
      } else {
        if (process.platform == "linux") {
          var launcherversion = fs.readFileSync(
            app.getPath("documents") +
              "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
          );
          var launcherversionbeta = fs.readFileSync(
            app.getPath("documents") +
              "/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt"
          );
        } else {
          var launcherversion = fs.readFileSync(
            __dirname + "/VersionsFiles/LauncherVersion.txt"
          );
          var launcherversionbeta = fs.readFileSync(
            __dirname + "/VersionsFiles/LauncherBetaVersion.txt"
          );
        }
      }

      console.log(parentfolder2);
      if (
        process.platform == "win32" &&
        fs.existsSync(parentfolder3 + "/nytuolauncher_data/BetaAccess.txt") ==
          true &&
        fs.readFileSync(parentfolder3 + "/nytuolauncher_data/BetaAccess.txt") ==
          "True" &&
        fs.readFileSync(__dirname + "/VersionsFiles/b_Beta.txt") == "True"
      ) {
        if (
          fs.existsSync(
            parentfolder3 + "/nytuolauncher_data/forceUpdate.txt"
          ) &&
          fs.readFileSync(
            parentfolder3 + "/nytuolauncher_data/forceUpdate.txt"
          ) == "1"
        ) {
          fs.writeFileSync(
            parentfolder3 + "/nytuolauncher_data/forceUpdate.txt",
            "0"
          );
          document.getElementById("MyBartxt").innerHTML = currentLanguage[132];
          Toastifycation(currentLanguage[72]);
          console.log("You have to update the launcher !");
          isUp2date = false;
        } else {
          if (
            window.require("electron").remote.app.getVersion().toString() <
            fs
              .readFileSync(
                __dirname + "/VersionsFiles/LauncherBetaVersion.txt"
              )
              .toString()
          ) {
            Toastifycation(currentLanguage[73]);
            console.log("You have to update the launcher !");
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[131];
            isUp2date = false;
          }
          if (
            window.require("electron").remote.app.getVersion().toString() >
            fs
              .readFileSync(
                __dirname + "/VersionsFiles/LauncherBetaVersion.txt"
              )
              .toString()
          ) {
            console.log("Very UpToDate");
            console.log(app.getAppPath());
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[130];
            verif_gameVersionLoading();
          }
          if (
            window.require("electron").remote.app.getVersion().toString() ===
            fs
              .readFileSync(
                __dirname + "/VersionsFiles/LauncherBetaVersion.txt"
              )
              .toString()
          ) {
            console.log("UpToDate");
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[130];
            verif_gameVersionLoading();
          }
        }
        if (isUp2date === false) {
          if (portable == true) {
            alert(currentLanguage[74]);
            app.exit();
          } else {
            if (!!document.getElementById("updateview") === true) {
              document.getElementById("updateview").style.display = "block";
            }
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[134];
            DownlaodFileUpdate(
              "https://github.com/Nytuo/Nytuo-Launcher/releases/download/v" +
                launcherversionbeta +
                "/Nytuo-Launcher-Setup-" +
                launcherversionbeta +
                ".exe",
              parentfolder3 + "/nytuolauncher_data/update.exe"
            );
          }
        }
      } else {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs.existsSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt"
              ) &&
              fs.readFileSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt"
              ) == "1"
            ) {
              fs.writeFileSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt",
                "0"
              );
              Toastifycation(currentLanguage[72]);
              document.getElementById("MyBartxt").innerHTML =
                currentLanguage[133];
              console.log("You have to update the launcher !");
              isUp2date = false;
            } else {
              if (
                window.require("electron").remote.app.getVersion().toString() <
                fs
                  .readFileSync(
                    parentfolder3 +
                      "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                Toastifycation(currentLanguage[75]);
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[131];
                console.log("You have to update the launcher !");
                isUp2date = false;
              }
              if (
                window.require("electron").remote.app.getVersion().toString() >
                fs
                  .readFileSync(
                    parentfolder3 +
                      "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                console.log("Very UpToDate");
                console.log(app.getAppPath());
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[130];
                verif_gameVersionLoading();
              }
              if (
                window
                  .require("electron")
                  .remote.app.getVersion()
                  .toString() ===
                fs
                  .readFileSync(
                    parentfolder3 +
                      "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                console.log("UpToDate");
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[130];
                verif_gameVersionLoading();
              }
            }

            if (isUp2date === false) {
              //DL bonne version
              //Lance le programme
              //Ferme celui là
              if (portable == true) {
                alert(currentLanguage[74]);
                app.exit();
              } else {
                if (!!document.getElementById("updateview") === true) {
                  document.getElementById("updateview").style.display = "block";
                }
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[129];
                DownlaodFileUpdate(
                  "https://github.com/Nytuo/Nytuo-Launcher/releases/download/v" +
                    launcherversion +
                    "/Nytuo-Launcher_" +
                    launcherversion +
                    "_amd64.snap",
                  app.getPath("documents") + "/nytuolauncher_data/update.snap"
                );
              }
            }
          } else {
            if (
              fs.existsSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt"
              ) &&
              fs.readFileSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt"
              ) == "1"
            ) {
              fs.writeFileSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt",
                "0"
              );
              Toastifycation(currentLanguage[72]);
              document.getElementById("MyBartxt").innerHTML =
                currentLanguage[132];
              console.log("You have to update the launcher !");
              isUp2date = false;
            } else {
              if (
                window.require("electron").remote.app.getVersion().toString() <
                fs
                  .readFileSync(
                    __dirname + "/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                Toastifycation(currentLanguage[75]);
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[131];
                console.log("You have to update the launcher !");
                isUp2date = false;
              }
              if (
                window.require("electron").remote.app.getVersion().toString() >
                fs
                  .readFileSync(
                    __dirname + "/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                console.log("Very UpToDate");
                console.log(app.getAppPath());
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[130];
                verif_gameVersionLoading();
              }
              if (
                window
                  .require("electron")
                  .remote.app.getVersion()
                  .toString() ===
                fs
                  .readFileSync(
                    __dirname + "/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                console.log("UpToDate");
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[130];
                verif_gameVersionLoading();
              }
            }

            if (isUp2date === false) {
              //DL bonne version
              //Lance le programme
              //Ferme celui là
              if (portable == true) {
                alert(currentLanguage[74]);
                app.exit();
              } else {
                if (!!document.getElementById("updateview") === true) {
                  document.getElementById("updateview").style.display = "block";
                }
                if (process.platform == "win32") {
                  document.getElementById("MyBartxt").innerHTML =
                    currentLanguage[129];
                  DownlaodFileUpdate(
                    "https://github.com/Nytuo/Nytuo-Launcher/releases/download/v" +
                      launcherversion +
                      "/Nytuo-Launcher-Setup-" +
                      launcherversion +
                      ".exe",
                    parentfolder3 + "/nytuolauncher_data/update.exe"
                  );
                }
              }
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs.existsSync(
                app.getPath("documents") + "/nytuolauncher_data/forceUpdate.txt"
              ) &&
              fs.readFileSync(
                app.getPath("documents") + "/nytuolauncher_data/forceUpdate.txt"
              ) == "1"
            ) {
              fs.writeFileSync(
                app.getPath("documents") +
                  "/nytuolauncher_data/forceUpdate.txt",
                "0"
              );
              Toastifycation(currentLanguage[72]);
              document.getElementById("MyBartxt").innerHTML =
                currentLanguage[132];
              console.log("You have to update the launcher !");
              isUp2date = false;
            } else {
              if (
                window.require("electron").remote.app.getVersion().toString() <
                fs
                  .readFileSync(
                    app.getPath("documents") +
                      "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                Toastifycation(currentLanguage[75]);
                console.log("You have to update the launcher !");
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[131];
                isUp2date = false;
              }
              if (
                window.require("electron").remote.app.getVersion().toString() >
                fs
                  .readFileSync(
                    app.getPath("documents") +
                      "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                console.log("Very UpToDate");
                console.log(app.getAppPath());
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[130];
                verif_gameVersionLoading();
              }
              if (
                window
                  .require("electron")
                  .remote.app.getVersion()
                  .toString() ===
                fs
                  .readFileSync(
                    app.getPath("documents") +
                      "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                console.log("UpToDate");
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[130];
                verif_gameVersionLoading();
              }
            }

            if (isUp2date === false) {
              //DL bonne version
              //Lance le programme
              //Ferme celui là
              if (!!document.getElementById("updateview") === true) {
                document.getElementById("updateview").style.display = "block";
              }
              document.getElementById("MyBartxt").innerHTML =
                "Downloading Update";
              DownlaodFileUpdate(
                "https://github.com/Nytuo/Nytuo-Launcher/releases/download/v" +
                  launcherversion +
                  "/Nytuo-Launcher_" +
                  launcherversion +
                  "_amd64.snap",
                app.getPath("documents") + "/nytuolauncher_data/update.snap"
              );
            }
          } else {
            if (
              fs.existsSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt"
              ) &&
              fs.readFileSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt"
              ) == "1"
            ) {
              fs.writeFileSync(
                parentfolder3 + "/nytuolauncher_data/forceUpdate.txt",
                "0"
              );
              Toastifycation(currentLanguage[72]);
              document.getElementById("MyBartxt").innerHTML =
                currentLanguage[132];
              console.log("You have to update the launcher !");
              isUp2date = false;
            } else {
              if (
                window.require("electron").remote.app.getVersion().toString() <
                fs
                  .readFileSync(
                    __dirname + "/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                Toastifycation(currentLanguage[75]);
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[131];
                console.log("You have to update the launcher !");
                isUp2date = false;
              }
              if (
                window.require("electron").remote.app.getVersion().toString() >
                fs
                  .readFileSync(
                    __dirname + "/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                console.log("Very UpToDate");
                console.log(app.getAppPath());
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[130];
                verif_gameVersionLoading();
              }
              if (
                window
                  .require("electron")
                  .remote.app.getVersion()
                  .toString() ===
                fs
                  .readFileSync(
                    __dirname + "/VersionsFiles/LauncherVersion.txt"
                  )
                  .toString()
              ) {
                console.log("UpToDate");
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[130];
                verif_gameVersionLoading();
              }
            }

            if (isUp2date === false) {
              //DL bonne version
              //Lance le programme
              //Ferme celui là
              if (!!document.getElementById("updateview") === true) {
                document.getElementById("updateview").style.display = "block";
              }
              if (process.platform == "win32") {
                document.getElementById("MyBartxt").innerHTML =
                  currentLanguage[129];
                DownlaodFileUpdate(
                  "https://github.com/Nytuo/Nytuo-Launcher/releases/download/v" +
                    launcherversion +
                    "/Nytuo-Launcher-Setup-" +
                    launcherversion +
                    ".exe",
                  parentfolder3 + "/nytuolauncher_data/update.exe"
                );
              }
            }
          }
        }
      }
    }, 5000);
  } else {
    document.getElementById("MyBartxt").innerHTML = currentLanguage[167];
    GameAvailableOffline();

    LaunchWindowLauncherOffline();
  }
}

function verif_gameVersionLoading() {
  document.getElementById("MyBartxt").innerHTML = currentLanguage[128];

  if (
    window.require("electron").remote.app.getVersion().toString() >=
    fs.readFileSync(__dirname + "/VersionsFiles/LauncherVersion.txt").toString()
  ) {
    setTimeout(function () {
      if (
        fs.existsSync(gamelocation + "/Games/LAATIM/LAIM_Version.txt")
          .toString === true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/LAATIM/LAIM_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/LAIM_Version.txt"
                )
                .toString()
            ) {
              LAATIMU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/LAATIM/LAIM_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/LAIM_Version.txt")
                .toString()
            ) {
              LAATIMU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/LAATIM/LAIM_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/LAIM_Version.txt"
                )
                .toString()
            ) {
              LAATIMU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/LAATIM/LAIM_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/LAIM_Version.txt")
                .toString()
            ) {
              LAATIMU = false;
            }
          }
        }
        Toastifycation(curentLanguage[76]);
      }

      if (
        fs.existsSync(gamelocation + "/Games/SF/VersionSF.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SF/VersionSF.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/SF_Version.txt"
                )
                .toString()
            ) {
              SFU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SF/VersionSF.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/SF_Version.txt")
                .toString()
            ) {
              SFU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SF/VersionSF.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/SF_Version.txt"
                )
                .toString()
            ) {
              SFU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SF/VersionSF.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/SF_Version.txt")
                .toString()
            ) {
              SFU = false;
            }
          }
        }

        Toastifycation(currentLanguage[77]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/LA/VersionLA.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/LA/VersionLA.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/LA_Version.txt"
                )
                .toString()
            ) {
              LAU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/LA/VersionLA.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/LA_Version.txt")
                .toString()
            ) {
              LAU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/LA/VersionLA.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/LA_Version.txt"
                )
                .toString()
            ) {
              LAU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/LA/VersionLA.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/LA_Version.txt")
                .toString()
            ) {
              LAU = false;
            }
          }
        }
        Toastifycation(currentLanguage[78]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/AE/VersionAE.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/AE/VersionAE.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/AE_Version.txt"
                )
                .toString()
            ) {
              AEU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/AE/VersionAE.txt")
                .toString() <
              fs
                .readFileSync(
                  __dirname + "/nytuolauncher_data/VersionsFiles/AE_Version.txt"
                )
                .toString()
            ) {
              AEU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/AE/VersionAE.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/AE_Version.txt"
                )
                .toString()
            ) {
              AEU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/AE/VersionAE.txt")
                .toString() <
              fs
                .readFileSync(
                  __dirname + "/nytuolauncher_data/VersionsFiles/AE_Version.txt"
                )
                .toString()
            ) {
              AEU = false;
            }
          }
        }
        Toastifycation(currentLanguage[79]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/SNRE/SNRE_Version.txt")
          .toString === true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SNRE/SNRE_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/SNRE_Version.txt"
                )
                .toString()
            ) {
              SNU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SNRE/SNRE_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/SNRE_Version.txt")
                .toString()
            ) {
              SNU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SNRE/SNRE_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/SNRE_Version.txt"
                )
                .toString()
            ) {
              SNU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SNRE/SNRE_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/SNRE_Version.txt")
                .toString()
            ) {
              SNU = false;
            }
          }
        }

        Toastifycation(currentLanguage[80]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/SGB/SGB_Version.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SGB/SGB_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/SGB_Version.txt"
                )
                .toString()
            ) {
              SGBU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SGB/SGB_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/SGB_Version.txt")
                .toString()
            ) {
              SGBU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SGB/SGB_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/SGB_Version.txt"
                )
                .toString()
            ) {
              SGBU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SGB/SGB_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/SGB_Version.txt")
                .toString()
            ) {
              SGBU = false;
            }
          }
        }
        Toastifycation(currentLanguage[81]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/TTD/TTD_Version.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/TTD/TTD_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/TTD_Version.txt"
                )
                .toString()
            ) {
              TTDU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/TTD/TTD_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/TTD_Version.txt")
                .toString()
            ) {
              TTDU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/TTD/TTD_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/TTD_Version.txt"
                )
                .toString()
            ) {
              TTDU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/TTD/TTD_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/TTD_Version.txt")
                .toString()
            ) {
              TTDU = false;
            }
          }
        }
        Toastifycation(currentLanguage[82]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/TB/VersionTB.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/TB/VersionTB.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/TB_Version.txt"
                )
                .toString()
            ) {
              TBU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/TB/VersionTB.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/TB_Version.txt")
                .toString()
            ) {
              TBU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/TB/VersionTB.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/TB_Version.txt"
                )
                .toString()
            ) {
              TBU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/TB/VersionTB.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/TB_Version.txt")
                .toString()
            ) {
              TBU = false;
            }
          }
        }
        Toastifycation(currentLanguage[83]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/FWD/VersionFWD.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/FWD/VersionFWD.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/FWD_Version.txt"
                )
                .toString()
            ) {
              FWDU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/FWD/VersionFWD.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/FWD_Version.txt")
                .toString()
            ) {
              FWDU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/FWD/VersionFWD.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/FWD_Version.txt"
                )
                .toString()
            ) {
              FWDU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/FWD/VersionFWD.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/FWD_Version.txt")
                .toString()
            ) {
              FWDU = false;
            }
          }
        }
        Toastifycation(currentLanguage[84]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/VITF/VersionVITF.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/VITF/VersionVITF.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/VITF_Version.txt"
                )
                .toString()
            ) {
              VITFU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/VITF/VersionVITF.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/VITF_Version.txt")
                .toString()
            ) {
              VITFU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/VITF/VersionVITF.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/VITF_Version.txt"
                )
                .toString()
            ) {
              VITFU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/VITF/VersionVITF.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/VITF_Version.txt")
                .toString()
            ) {
              VITFU = false;
            }
          }
        }
        Toastifycation(currentLanguage[85]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/WR/VersionWR.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/WR/VersionWR.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/WR_Version.txt"
                )
                .toString()
            ) {
              WRU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/WR/VersionWR.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/WR_Version.txt")
                .toString()
            ) {
              WRU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/WR/VersionWR.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/WR_Version.txt"
                )
                .toString()
            ) {
              WRU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/WR/VersionWR.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/WR_Version.txt")
                .toString()
            ) {
              WRU = false;
            }
          }
        }
        Toastifycation(currentLanguage[86]);
      }
      if (
        fs.existsSync(gamelocation + "/Games/SFO/SFO_Version.txt").toString ===
        true
      ) {
        if (portable == true) {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SFO/SFO_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  parentfolder3 +
                    "/nytuolauncher_data/VersionsFiles/SFO_Version.txt"
                )
                .toString()
            ) {
              SFOU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SFO/SFO_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/SFO_Version.txt")
                .toString()
            ) {
              SFOU = false;
            }
          }
        } else {
          if (process.platform == "linux") {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SFO/SFO_Version.txt")
                .toString() <
              fs
                .readFileSync(
                  app.getPath("documents") +
                    "/nytuolauncher_data/VersionsFiles/SFO_Version.txt"
                )
                .toString()
            ) {
              SFOU = false;
            }
          } else {
            if (
              fs
                .readFileSync(gamelocation + "/Games/SFO/SFO_Version.txt")
                .toString() <
              fs
                .readFileSync(__dirname + "/VersionsFiles/SFO_Version.txt")
                .toString()
            ) {
              SFOU = false;
            }
          }
        }
        Toastifycation(currentLanguage[87]);
      }
      ConnectionForm();
    }, 4000);
  }
}

function ConnectionForm() {
  if (process.platform == "linux" || process.platform == "darwin") {
    if (
      fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LoginSecu.txt") ==
      "false"
    ) {
      const remote = require("electron").remote;
      const BrowserWindow = remote.BrowserWindow;
      const path = require("path");
      let win = new BrowserWindow({
        backgroundColor: 212121,
        minWidth: 500,
        minHeight: 720,
        width: 500,
        height: 720,
        icon: path.join(__dirname, "Resources/favicon.ico"),
        webPreferences: {
          webSecurity: true,
          nodeIntegration: false,
          enableRemoteModule: false,
        },
      });
      fs.writeFileSync(
        parentfolder3 + "/nytuolauncher_data/LoginSecu.txt",
        "true"
      );
      win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?1");
    } else if (
      fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LoginSecu.txt") ==
      "true"
    ) {
      const remote = require("electron").remote;
      const BrowserWindow = remote.BrowserWindow;
      const path = require("path");
      let win = new BrowserWindow({
        backgroundColor: 212121,
        minWidth: 500,
        minHeight: 720,
        width: 500,
        height: 720,
        icon: path.join(__dirname, "Resources/logoexp.png"),
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
        },
      });
      win.removeMenu();
      ACH_SAVER();
      LID = fs
        .readFileSync(app.getPath("documents") + "/nytuolauncher_data/LID.txt")
        .toString();
      win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
    }
  } else {
    //launch basic window
    if (
      fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LoginSecu.txt") ==
      "false"
    ) {
      const remote = require("electron").remote;
      const BrowserWindow = remote.BrowserWindow;
      const path = require("path");
      let win = new BrowserWindow({
        backgroundColor: 212121,
        minWidth: 500,
        minHeight: 720,
        width: 500,
        height: 720,
        icon: path.join(__dirname, "Resources/favicon.ico"),
        webPreferences: {
          webSecurity: true,
          nodeIntegration: false,
          enableRemoteModule: false,
          nativeWindowOpen: true,
        },
      });
      fs.writeFileSync(
        parentfolder3 + "/nytuolauncher_data/LoginSecu.txt",
        "true"
      );
      win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?1");
    } else if (
      fs.readFileSync(parentfolder3 + "/nytuolauncher_data/LoginSecu.txt") ==
      "true"
    ) {
      //launch custo window

      const remote = require("electron").remote;
      const BrowserWindow = remote.BrowserWindow;
      const path = require("path");
      let win = new BrowserWindow({
        backgroundColor: 212121,
        minWidth: 500,
        minHeight: 720,
        width: 500,
        height: 720,
        icon: path.join(__dirname, "Resources/favicon.ico"),
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
        },
      });
      ACH_SAVER();
      if (connectedtointernet == "true") {
        if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?laatim"
        ) {
          if (LAATIMU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("LAATIM");

            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?sfo"
        ) {
          if (SFOU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("SFO");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?sf"
        ) {
          if (SFU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("SF");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?la"
        ) {
          if (LAU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("LA");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?sgb"
        ) {
          if (SGBU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("SGB");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?fwd"
        ) {
          if (FWDU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("FWD");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?ttd"
        ) {
          if (TTDU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("TTD");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?tb"
        ) {
          if (TBU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("TB");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?ae"
        ) {
          if (AEU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("AE");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?wr"
        ) {
          if (WRU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("WR");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?sn"
        ) {
          if (SNU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("SNRE");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else if (
          window.location.href ==
          "file:///" + dirnamew + "/Loading.html?vitf"
        ) {
          if (VITFU == true) {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[127];

            LaunchGame("VITF");
            win.close();
          } else {
            document.getElementById("MyBartxt").innerHTML =
              currentLanguage[126];

            LID = fs
              .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
              .toString();
            win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
          }
        } else {
          document.getElementById("MyBartxt").innerHTML = currentLanguage[126];

          LID = fs
            .readFileSync(parentfolder3 + "/nytuolauncher_data/LID.txt")
            .toString();
          win.loadURL("https://launcher.nytuo.yo.fr/connexion.html?Nosecu");
        }
      } else {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[125];
        GameAvailableOffline();

        LaunchWindowLauncherOffline();
      }
    } else {
      alert("Error, Please restart !");
    }
  }
  close();
}

function LaunchWindowLauncherOffline() {
  if (process.platform == "linux" || process.platform == "darwin") {
    const remote = require("electron").remote;
    const BrowserWindow = remote.BrowserWindow;
    const path = require("path");
    let win = new BrowserWindow({
      backgroundColor: 212121,
      minWidth: 1280,
      minHeight: 720,
      width: 1280,
      height: 720,
      icon: path.join(__dirname, "Resources/logoexp.png"),
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });
    ACH_SAVER();
    win.loadFile("index.html");
  } else {
    const remote = require("electron").remote;
    const BrowserWindow = remote.BrowserWindow;
    const path = require("path");
    let win = new BrowserWindow({
      backgroundColor: 212121,
      minWidth: 1280,
      minHeight: 720,
      width: 1280,
      height: 720,
      icon: path.join(__dirname, "Resources/favicon.ico"),
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      frame: false,
    });
    //win.removeMenu()
    ACH_SAVER();
    if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?laatim"
    ) {
      if (LAATIMU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("LAATIM");

        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?sfo"
    ) {
      if (SFOU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("SFO");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?sf"
    ) {
      if (SFU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("SF");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?la"
    ) {
      if (LAU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("LA");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?sgb"
    ) {
      if (SGBU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("SGB");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?fwd"
    ) {
      if (FWDU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("FWD");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?ttd"
    ) {
      if (TTDU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("TTD");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?tb"
    ) {
      if (TBU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("TB");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?ae"
    ) {
      if (AEU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("AE");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?wr"
    ) {
      if (WRU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("WR");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?sn"
    ) {
      if (SNU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("SNRE");
        win.close();
      }
    } else if (
      window.location.href ==
      "file:///" + dirnamew + "/Loading.html?vitf"
    ) {
      if (VITFU == true) {
        document.getElementById("MyBartxt").innerHTML = currentLanguage[127];

        LaunchGame("VITF");
        win.close();
      }
    } else {
      win.loadFile("index.html");
    }
  }
  close();
}

function GameAvailableOffline() {
  if (portable == true) {
    if (process.platform == "linux") {
      if (!fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")) {
        fs.mkdirSync(parentfolder3 + "/nytuolauncher_data/CurrentUser");
      }
      var GamesIDs = [
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
        "SNRE",
      ];
      var t = [];
      for (let i = 0; i < GamesIDs.length; i++) {
        if (
          fs.readdirSync(gamelocation + "/Games/" + GamesIDs[i]).length != 0
        ) {
          t.push(GamesIDs[i]);
        }
      }
      for (let i = 0; i < t.length; i++) {
        fs.writeFileSync(
          parentfolder3 + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt",
          "true"
        );
      }
    } else {
      if (!fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")) {
        fs.mkdirSync(parentfolder3 + "/nytuolauncher_data/CurrentUser");
      }
      var GamesIDs = [
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
        "SNRE",
      ];
      var t = [];
      for (let i = 0; i < GamesIDs.length; i++) {
        if (
          fs.readdirSync(gamelocation + "/Games/" + GamesIDs[i]).length != 0
        ) {
          t.push(GamesIDs[i]);
        }
      }
      for (let i = 0; i < t.length; i++) {
        fs.writeFileSync(
          parentfolder3 + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt",
          "true"
        );
      }
    }
  } else {
    if (process.platform == "linux") {
      if (
        !fs.existsSync(
          app.getPath("documents") + "/nytuolauncher_data/CurrentUser"
        )
      ) {
        fs.mkdirSync(
          app.getPath("documents") + "/nytuolauncher_data/CurrentUser"
        );
      }
      var GamesIDs = [
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
        "SNRE",
      ];
      var t = [];
      for (let i = 0; i < GamesIDs.length; i++) {
        if (
          fs.readdirSync(gamelocation + "/Games/" + GamesIDs[i]).length != 0
        ) {
          t.push(GamesIDs[i]);
        }
      }
      for (let i = 0; i < t.length; i++) {
        fs.writeFileSync(
          app.getPath("documents") +
            "/nytuolauncher_data/CurrentUser/" +
            t[i] +
            ".txt",
          "true"
        );
      }
    } else {
      if (!fs.existsSync(parentfolder3 + "/nytuolauncher_data/CurrentUser")) {
        fs.mkdirSync(parentfolder3 + "/nytuolauncher_data/CurrentUser");
      }
      var GamesIDs = [
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
        "SNRE",
      ];
      var t = [];
      for (let i = 0; i < GamesIDs.length; i++) {
        if (
          fs.readdirSync(gamelocation + "/Games/" + GamesIDs[i]).length != 0
        ) {
          t.push(GamesIDs[i]);
        }
      }
      for (let i = 0; i < t.length; i++) {
        fs.writeFileSync(
          parentfolder3 + "/nytuolauncher_data/CurrentUser/" + t[i] + ".txt",
          "true"
        );
      }
    }
  }
}
//download of the version files
function DLVersions() {
  if (connectedtointernet == "true") {
    document.getElementById("MyBartxt").innerHTML = currentLanguage[124];

    if (portable == true) {
      if (process.platform == "linux" || process.platform == "darwin") {
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SN/master/Linux/SNRE_Version.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/SNRE_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/AE/master/Linux/VersionAE.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/AE_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/FWD/master/Linux/VersionFWD.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/FWD_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/Linux/LAIM_Version.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/LAIM_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LA/master/Linux/VersionLA.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/LA_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SF/master/Linux/VersionSF.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/SF_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SGB/master/Linux/SGB_Version.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/SGB_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TB/master/Linux/VersionTB.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/TB_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TTD/master/Linux/VersionTTD.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/TTD_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/VITF/master/Linux/VersionVITF.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/VITF_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/WR/master/Linux/VersionWR.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/WR_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SFO/master/Linux/SFO_Version.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/SFO_Version.txt"
        );

        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/Version.txt",
          parentfolder3 +
            "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/UpdateType.txt",
          parentfolder3 +
            "/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/BetaVersion.txt",
          parentfolder3 +
            "/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/BetaAvailable.txt",
          parentfolder3 + "/nytuolauncher_data/VersionsFiles/b_Beta.txt"
        );
        if (
          fs.readFileSync(
            parentfolder3 +
              "/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt"
          ) === "1"
        ) {
          document.getElementById("MyBartxt").innerHTML = currentLanguage[69];
        }
      } else {
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SN/master/Windows/SNRE_Version.txt",
          __dirname + "/VersionsFiles/SNRE_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/AE/master/Windows/VersionAE.txt",
          __dirname + "/VersionsFiles/AE_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/FWD/master/Windows/VersionFWD.txt",
          __dirname + "/VersionsFiles/FWD_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/Windows/LAIM_Version.txt",
          __dirname + "/VersionsFiles/LAIM_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LA/master/Windows/VersionLA.txt",
          __dirname + "/VersionsFiles/LA_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SF/master/Windows/VersionSF.txt",
          __dirname + "/VersionsFiles/SF_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SGB/master/Windows/SGB_Version.txt",
          __dirname + "/VersionsFiles/SGB_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TB/master/Windows/VersionTB.txt",
          __dirname + "/VersionsFiles/TB_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TTD/master/Windows/VersionTTD.txt",
          __dirname + "/VersionsFiles/TTD_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/VITF/master/Windows/VersionVITF.txt",
          __dirname + "/VersionsFiles/VITF_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/WR/master/Windows/VersionWR.txt",
          __dirname + "/VersionsFiles/WR_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SFO/master/Windows/SFO_Version.txt",
          __dirname + "/VersionsFiles/SFO_Version.txt"
        );

        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/Version.txt",
          __dirname + "/VersionsFiles/LauncherVersion.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/UpdateType.txt",
          __dirname + "/VersionsFiles/LauncherUpdateType.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/BetaVersion.txt",
          __dirname + "/VersionsFiles/LauncherBetaVersion.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/BetaAvailable.txt",
          __dirname + "/VersionsFiles/b_Beta.txt"
        );
        if (
          fs.readFileSync(
            __dirname + "/VersionsFiles/LauncherUpdateType.txt"
          ) === "1"
        ) {
          document.getElementById("MyBartxt").innerHTML = currentLanguage[69];
        }
      }
    } else {
      if (process.platform == "linux" || process.platform == "darwin") {
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SN/master/Linux/SNRE_Version.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/SNRE_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/AE/master/Linux/VersionAE.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/AE_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/FWD/master/Linux/VersionFWD.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/FWD_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/Linux/LAIM_Version.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/LAIM_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LA/master/Linux/VersionLA.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/LA_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SF/master/Linux/VersionSF.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/SF_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SGB/master/Linux/SGB_Version.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/SGB_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TB/master/Linux/VersionTB.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/TB_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TTD/master/Linux/VersionTTD.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/TTD_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/VITF/master/Linux/VersionVITF.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/VITF_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/WR/master/Linux/VersionWR.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/WR_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SFO/master/Linux/SFO_Version.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/SFO_Version.txt"
        );

        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/Version.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/LauncherVersion.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/UpdateType.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/BetaVersion.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/LauncherBetaVersion.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/BetaAvailable.txt",
          app.getPath("documents") +
            "/nytuolauncher_data/VersionsFiles/b_Beta.txt"
        );
        if (
          fs.readFileSync(
            app.getPath("documents") +
              "/nytuolauncher_data/VersionsFiles/LauncherUpdateType.txt"
          ) === "1"
        ) {
          document.getElementById("MyBartxt").innerHTML = currentLanguage[69];
        }
      } else {
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SN/master/Windows/SNRE_Version.txt",
          __dirname + "/VersionsFiles/SNRE_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/AE/master/Windows/VersionAE.txt",
          __dirname + "/VersionsFiles/AE_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/FWD/master/Windows/VersionFWD.txt",
          __dirname + "/VersionsFiles/FWD_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/Windows/LAIM_Version.txt",
          __dirname + "/VersionsFiles/LAIM_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LA/master/Windows/VersionLA.txt",
          __dirname + "/VersionsFiles/LA_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SF/master/Windows/VersionSF.txt",
          __dirname + "/VersionsFiles/SF_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SGB/master/Windows/SGB_Version.txt",
          __dirname + "/VersionsFiles/SGB_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TB/master/Windows/VersionTB.txt",
          __dirname + "/VersionsFiles/TB_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TTD/master/Windows/VersionTTD.txt",
          __dirname + "/VersionsFiles/TTD_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/VITF/master/Windows/VersionVITF.txt",
          __dirname + "/VersionsFiles/VITF_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/WR/master/Windows/VersionWR.txt",
          __dirname + "/VersionsFiles/WR_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SFO/master/Windows/SFO_Version.txt",
          __dirname + "/VersionsFiles/SFO_Version.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/Version.txt",
          __dirname + "/VersionsFiles/LauncherVersion.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/UpdateType.txt",
          __dirname + "/VersionsFiles/LauncherUpdateType.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/BetaVersion.txt",
          __dirname + "/VersionsFiles/LauncherBetaVersion.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/Nytuo-Launcher/master/BetaAvailable.txt",
          __dirname + "/VersionsFiles/b_Beta.txt"
        );
        if (
          fs.readFileSync(
            __dirname + "/VersionsFiles/LauncherUpdateType.txt"
          ) === "1"
        ) {
          document.getElementById("MyBartxt").innerHTML = currentLanguage[69];
        }
      }
    }
  }
}

function DLCL() {
  if (connectedtointernet == "true") {
    document.getElementById("MyBartxt").innerHTML =
      "!!!!ChangeLanguages!!!! Downloading ChangesLogs";

    if (portable == true) {
      if (process.platform == "linux" || process.platform == "darwin") {
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SN/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/SN.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/AE/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/AE.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/FWD/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/FWD.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/LAATIM.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LA/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/LA.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SF/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/SF.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SGB/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/SGB.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TB/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/TB.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TTD/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/TTD.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/VITF/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/VITF.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/WR/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/WR.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SFO/master/ChangesLogs",
          parentfolder3 + "/nytuolauncher_data/ChangesLogs/SFO.txt"
        );
      } else {
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SN/master/ChangesLogs",
          __dirname + "/ChangesLogs/SN.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/AE/master/ChangesLogs",
          __dirname + "/ChangesLogs/AE.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/FWD/master/ChangesLogs",
          __dirname + "/ChangesLogs/FWD.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/ChangesLogs",
          __dirname + "/ChangesLogs/LAATIM.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LA/master/ChangesLogs",
          __dirname + "/ChangesLogs/LA.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SF/master/ChangesLogs",
          __dirname + "/ChangesLogs/SF.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SGB/master/ChangesLogs",
          __dirname + "/ChangesLogs/SGB.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TB/master/ChangesLogs",
          __dirname + "/ChangesLogs/TB.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TTD/master/ChangesLogs",
          __dirname + "/ChangesLogs/TTD.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/VITF/master/ChangesLogs",
          __dirname + "/ChangesLogs/VITF.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/WR/master/ChangesLogs",
          __dirname + "/ChangesLogs/WR.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SFO/master/ChangesLogs",
          __dirname + "/ChangesLogs/SFO.txt"
        );
      }
    } else {
      if (process.platform == "linux" || process.platform == "darwin") {
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SN/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/SN.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/AE/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/AE.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/FWD/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/FWD.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/ChangesLogs",
          app.getPath("documents") +
            "/nytuolauncher_data/ChangesLogs/LAATIM.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LA/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/LA.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SF/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/SF.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SGB/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/SGB.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TB/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/TB.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TTD/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/TTD.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/VITF/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/VITF.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/WR/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/WR.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SFO/master/ChangesLogs",
          app.getPath("documents") + "/nytuolauncher_data/ChangesLogs/SFO.txt"
        );
      } else {
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SN/master/ChangesLogs",
          __dirname + "/ChangesLogs/SN.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/AE/master/ChangesLogs",
          __dirname + "/ChangesLogs/AE.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/FWD/master/ChangesLogs",
          __dirname + "/ChangesLogs/FWD.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LAATIM/master/ChangesLogs",
          __dirname + "/ChangesLogs/LAATIM.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/LA/master/ChangesLogs",
          __dirname + "/ChangesLogs/LA.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SF/master/ChangesLogs",
          __dirname + "/ChangesLogs/SF.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SGB/master/ChangesLogs",
          __dirname + "/ChangesLogs/SGB.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TB/master/ChangesLogs",
          __dirname + "/ChangesLogs/TB.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/TTD/master/ChangesLogs",
          __dirname + "/ChangesLogs/TTD.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/VITF/master/ChangesLogs",
          __dirname + "/ChangesLogs/VITF.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/WR/master/ChangesLogs",
          __dirname + "/ChangesLogs/WR.txt"
        );
        DownlaodVersion(
          "https://raw.githubusercontent.com/Nytuo/SFO/master/ChangesLogs",
          __dirname + "/ChangesLogs/SFO.txt"
        );
      }
    }
  }
}

function VerifyVersionSizeAndContent(URL, empl) {
  if (
    fs.statSync(empl.toString()).size == 0 ||
    fs.readFileSync(empl.toString()) == ""
  ) {
    DownlaodVersion(URL, empl);
  }
}

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

function DownlaodFileUpdate(file_url, targetPath, dossierdujeu) {
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

    showProgressUpdate(received_bytes, total_bytes, starte, "U");
  });
  req.on("end", function () {
    document.getElementById("prgs").className = "indeterminate";
    if (process.platform == "linux") {
      //open a txt file with instruction
      //alert the user to follow the instruction in the txt file
      //close the launcher
      alert(
        "Please follow the commands in the text file opened after you click OK to update the Nytuo Launcher."
      );
      shell.openExternal(__dirname + "/Update_Instruction_Linux.txt");
      shell.openExternal(app.getPath("documents") + "/nytuolauncher_data/");
      setTimeout(() => {
        app.exit();
      }, 1000);
    } else {
      shell.openExternal(parentfolder3 + "/nytuolauncher_data/update.exe");

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
    elem.className = "determinate";
    elem.style.width = percentage + "%";
    document.getElementById("MyBartxt").innerHTML =
      percentage.toFixed() +
      "% -- " +
      bytesToSize(bps) +
      "/s -- " +
      bytesToSize(received) +
      "/" +
      bytesToSize(total) +
      " -- " +
      minutes +
      " : " +
      seconds;
    console.log(
      percentage.toFixed() +
        "% | " +
        received.toFixed() +
        " bytes out of " +
        total.toFixed() +
        " bytes."
    );
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
    elem.className = "determinate";
    elem.style.width = percentage + "%";
    document.getElementById("MyBartxt").innerHTML =
      currentLanguage[124] + " -- " + percentage + "%";
  }
}

function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

function LaunchGame(gameid) {
  const remote = require("electron").remote;
  const BrowserWindow = remote.BrowserWindow;
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
    },
  });
  if (process.platform == "linux") {
    launching.loadURL("file://" + __dirname + "/Gamelaunch.html?" + gameid);
  } else {
    launching.loadURL(__dirname + "/Gamelaunch.html?" + gameid);
  }
}
