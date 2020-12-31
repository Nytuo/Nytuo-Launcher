function gamelocsettings() {
    if (portable == true) {
        if (process.platform == "linux") {
            document.getElementById("gameloc").innerHTML = currentLanguage[28] + fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt")
        } else {
            document.getElementById("gameloc").innerHTML = currentLanguage[28] + fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt")
        }
    } else {
        if (process.platform == "linux" || process.platform == "darwin") {
            document.getElementById("gameloc").innerHTML = currentLanguage[28] + fs.readFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt")
        } else {
            document.getElementById("gameloc").innerHTML = currentLanguage[28] + fs.readFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt")
        }
    }


}
function LANGCHANGE(){
    if (portable == true){
        if (process.platform == "linux"){
            fs.writeFileSync(parentfolder3+"/nytuolauncher_data/LID.txt","")
            redm()
        }else{
            fs.writeFileSync(parentfolder3+"/nytuolauncher_data/LID.txt","")
            redm()
        }
    }else{
        if (process.platform == "linux"){
            fs.writeFileSync(app.getPath("documents")+"/nytuolauncher_data/LID.txt","")
    redm()
        }else{
          fs.writeFileSync(parentfolder3+"/nytuolauncher_data/LID.txt","")
    redm()  
        }
    }
    
}
//Change the location of the games folder
function changegameloc() {
    if (portable == true) {
        if (process.platform == "linux" || process.platform == "darwin") {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", "");
            fs.unlinkSync(parentfolder3 + "/nytuolauncher_data/LID_ONLINE.txt")

            app.relaunch();
            app.quit();
        } else {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", "");
            fs.unlinkSync(parentfolder3 + "/nytuolauncher_data/LID_ONLINE.txt")

            app.relaunch();
            app.quit();
        }
    } else {
        if (process.platform == "linux" || process.platform == "darwin") {
            fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/GamesFolderLoc.txt", "");
            fs.unlinkSync(app.getPath("documents") + "/nytuolauncher_data/LID_ONLINE.txt")

            app.relaunch();
            app.quit();
        } else {
            fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/GamesFolderLoc.txt", "");
            fs.unlinkSync(parentfolder3 + "/nytuolauncher_data/LID_ONLINE.txt")

            app.relaunch();
            app.quit();
        }
    }


}
function forceUpdate() {
    if (process.platform == 'linux' || process.platform == "darwin") {
        fs.writeFileSync(app.getPath("documents") + "/nytuolauncher_data/forceUpdate.txt", "1");

    } else {
        fs.writeFileSync(parentfolder3 + "/nytuolauncher_data/forceUpdate.txt", "1");


    }
    redm();
}
//verif beta access
function validate() {
    if (process.platform == "linux") {
        Toastifycation(currentLanguage[88])
        beta('no');
    } else {
        if (fs.readFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt') == 'True') {
            Toastifycation(currentLanguage[89]);
            beta('no');
        } else {

            Toastifycation(currentLanguage[90]);
            beta('yes');
        }
    }



}
//enter beta program
function beta(entry) {
    if (entry === 'no') {
        if (portable == true) {
            if (process.platform == "linux") {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
            } else {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
            }
        } else {
            if (process.platform == "linux") {
                fs.writeFileSync(app.getPath("documents") + '/nytuolauncher_data/BetaAccess.txt', 'False');
            } else {
                fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'False');
            }
        }


    } else {
        if (process.platform == "linux") {
            Toastifycation(currentLanguage[88])
        } else {
            fs.writeFileSync(parentfolder3 + '/nytuolauncher_data/BetaAccess.txt', 'True');
        }

    }

}