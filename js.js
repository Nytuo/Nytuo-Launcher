const {shell,webContents} = require('electron');
const {ipcRenderer} = require('electron');
const rimraf = require("rimraf");
const extract=require('extract-zip');
var request = require('request');
var fs =require('fs');
var app = require('electron').remote;
var dialog = app.dialog; 
const ws = require('windows-shortcuts');
function Open(dossierdujeu,filename){
shell.openItem(__dirname + "/Games/"+dossierdujeu+"/"+filename);
}
function DownlaodFile(file_url,targetPath,dossierdujeu){
	var received_bytes = 0;
	var total_bytes = 0;
	var req = request({
		method:'GET',
		uri:file_url
	});
	var out = fs.createWriteStream(targetPath);
	req.pipe(out);
	req.on('response',function(data){
		total_bytes = parseInt(data.headers['content-length']);
	});
	req.on('data', function(chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes);
    });
    req.on('end', function() {
        if (dossierdujeu === "LAATIM")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'Legend Adventure And The Infernal Maze downloaded, extracting !'
       })
        }
        if (dossierdujeu === "SF")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'ShootFighter downloaded, extracting !'
       })
        }
        if (dossierdujeu === "LA")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'Lutin Adventure downloaded, extracting !'
       })
        }
        if (dossierdujeu === "AE")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'AsteroidEscape downloaded, extracting !'
       })
        }
        if (dossierdujeu === "SNRE")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'SansNom Réédition downloaded, extracting !'
       })
        }
        if (dossierdujeu === "SGB")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'Super Geoffrey Bros downloaded, extracting !'
       })
        }
        if (dossierdujeu === "TTD")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'The Tardis Defender downloaded, extracting !'
       })
        }
        if (dossierdujeu === "TB")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'TanksBattle downloaded, extracting !'
       })
        }
        if (dossierdujeu === "FWD")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'FireWall Defender downloaded, extracting !'
       })
        }
        if (dossierdujeu === "VITF")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'Vincent In The Forest downloaded, extracting !'
       })
        }
        if (dossierdujeu === "WR")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'WinRun downloaded, extracting !'
       })
        }
    	
        extractzipgame(targetPath,dossierdujeu);
    });
}
function showProgress(received,total){
    var percentage = (received * 100) / total;
    var elem = document.getElementById("myBar");   
    var width = 0;

        width++; 
        elem.style.width = percentage + "%"; 
        elem.innerHTML = percentage.toFixed() + "%";
    console.log(percentage.toFixed() + "% | " + received.toFixed() + " bytes out of " + total.toFixed() + " bytes.");
}
function DL(url,dossierdujeu,nomdufichier){
	DownlaodFile(url,__dirname+"/Games/"+dossierdujeu+"/"+nomdufichier,__dirname+"/Games/"+dossierdujeu)
}
function extractzipgame(zippath,destpath){
    console.log(zippath,{dir:destpath});
	extract(zippath,{dir:destpath},function(err){
		deletefile(zippath)
	})
}
function deletefile(file2delete){
	var filepath = file2delete;
if (fs.existsSync(filepath)) {
    fs.unlink(filepath, (err) => {
        if (err) {
            let myNotification = new Notification('Nytuo Launcher - Error', {
                body: err.message
              })
            console.log(err);
            return;
            
        }
        if (file2delete === "LA_IM.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'Legend Adventure And The Infernal Maze is now playable !'
       })
        }
        if (file2delete === "SF.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'ShootFighter is now playable !'
       })
        }
        if (file2delete === "LA.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'Lutin Adventure is now playable !'
       })
        }
        if (file2delete === "AE.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'AsteroidEscape is now playable !'
       })
        }
        if (file2delete === "SNRE.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'SansNom Réédition is now playable !'
       })
        }
        if (file2delete === "SGB.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'Super Geoffrey Bros is now playable !'
       })
        }
        if (file2delete === "TTD.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'The Tardis Defender is now playable !'
       })
        }
        if (file2delete === "TB.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'TanksBattle is now playable !'
       })
        }
        if (file2delete === "FWD.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'FireWall Defender is now playable !'
       })
        }
        if (file2delete === "VITF.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'Vincent In The Forest is now playable !'
       })
        }
        if (file2delete === "WR.zip")
        {
            let myNotification = new Notification('Nytuo Launcher', {
         body: 'WinRun is now playable !'
       })
        }
        if (file2delete === "Nytuo.Launcher.zip")
        {
            window.require('electron').remote.app.quit();
        }
   });
} else {
        let myNotification = new Notification('Nytuo Launcher - Error', {
     body: "Game can't be deleted !"
   })
}
refresh();
}
function OpenEmpl(emplacement){
    shell.showItemInFolder(emplacement);
}
function redm(){
    exec(process.execPath);
    appl.quit();
}
function deletefolder(folder2delete){
    rimraf(folder2delete, function () { console.log("done"); });
    setTimeout(function (){
    if (!fs.existsSync(__dirname+'/Games'))fs.mkdirSync(__dirname+'/Games', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/AE'))fs.mkdirSync(__dirname+'/Games/AE', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/SNRE'))fs.mkdirSync(__dirname+'/Games/SNRE', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/LAATIM'))fs.mkdirSync(__dirname+'/Games/LAATIM', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/LA'))fs.mkdirSync(__dirname+'/Games/LA', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/SGB'))fs.mkdirSync(__dirname+'/Games/SGB', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/SF'))fs.mkdirSync(__dirname+'/Games/SF', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/TTD'))fs.mkdirSync(__dirname+'/Games/TTD', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/TB'))fs.mkdirSync(__dirname+'/Games/TB', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/FWD'))fs.mkdirSync(__dirname+'/Games/FWD', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/VITF'))fs.mkdirSync(__dirname+'/Games/VITF', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/WR'))fs.mkdirSync(__dirname+'/Games/WR', { recursive: true });
   refresh();
   if (folder2delete === "LAATIM")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'Legend Adventure And The Infernal Maze is now deleted !'
  })
   }
   if (folder2delete === "SF")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'ShootFighter is now deleted !'
  })
   }
   if (folder2delete === "LA")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'Lutin Adventure is now deleted !'
  })
   }
   if (folder2delete === "AE")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'AsteroidEscape is now deleted !'
  })
   }
   if (folder2delete === "SNRE")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'SansNom Réédition is now deleted !'
  })
   }
   if (folder2delete === "SGB")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'Super Geoffrey Bros is now deleted !'
  })
   }
   if (folder2delete === "TTD")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'The Tardis Defender is now deleted !'
  })
   }
   if (folder2delete === "TB")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'TanksBattle is now deleted !'
  })
   }
   if (folder2delete === "FWD")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'FireWall Defender is now deleted !'
  })
   }
   if (folder2delete === "VITF")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'Vincent In The Forest is now deleted !'
  })
   }
   if (folder2delete === "WR")
   {
       let myNotification = new Notification('Nytuo Launcher', {
    body: 'WinRun is now deleted !'
  })
   }
   },5000);
}
function deleteall(){
    rimraf(__dirname+"/Games", function () { console.log("done"); });
    setTimeout(function (){
         if (!fs.existsSync(__dirname+'/Games'))fs.mkdirSync(__dirname+'/Games', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/AE'))fs.mkdirSync(__dirname+'/Games/AE', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/SNRE'))fs.mkdirSync(__dirname+'/Games/SNRE', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/LAATIM'))fs.mkdirSync(__dirname+'/Games/LAATIM', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/LA'))fs.mkdirSync(__dirname+'/Games/LA', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/SGB'))fs.mkdirSync(__dirname+'/Games/SGB', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/SF'))fs.mkdirSync(__dirname+'/Games/SF', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/TTD'))fs.mkdirSync(__dirname+'/Games/TTD', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/TB'))fs.mkdirSync(__dirname+'/Games/TB', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/FWD'))fs.mkdirSync(__dirname+'/Games/FWD', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/VITF'))fs.mkdirSync(__dirname+'/Games/VITF', { recursive: true });
    if (!fs.existsSync(__dirname+'/Games/WR'))fs.mkdirSync(__dirname+'/Games/WR', { recursive: true });
    refresh();
    let myNotification = new Notification('All Games Deleted !', {
        body: 'All your games are now deleted !'
      })
    },5000);
}
function createlink(path,path2link){
    ws.create(path2link,path);
}
function detectforWin(dossierdujeu,versiontxt,versionlcl,gamename,txtVID){
    if (fs.existsSync(__dirname+'/Games/'+dossierdujeu+"/"+versiontxt)===false)
    {
        if (process.platform === "win32")
        {
            document.getElementById(dossierdujeu+"button1").innerHTML = "Installer";
            document.getElementById(txtVID).innerHTML = "Version : ?";
            document.getElementById(dossierdujeu+"button2").onclick = 0;
            document.getElementById(dossierdujeu+"button3").onclick = 0;
            document.getElementById(dossierdujeu+"button4").onclick = 0;
            document.getElementById(dossierdujeu+"button5").onclick = 0;
            document.getElementById(dossierdujeu+"button2").className = "Gbutton";
            document.getElementById(dossierdujeu+"button3").className = "Gbutton";
            document.getElementById(dossierdujeu+"button4").className = "Gbutton";
            document.getElementById(dossierdujeu+"button5").className = "Gbutton";
        }
        if (process.platform !== "win32")
        {
            document.getElementById(dossierdujeu+"button1").innerHTML = "Indisponible";
            document.getElementById(txtVID).innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById(dossierdujeu+"button1").onclick = 0;
            document.getElementById(dossierdujeu+"button2").onclick = 0;
            document.getElementById(dossierdujeu+"button3").onclick = 0;
            document.getElementById(dossierdujeu+"button4").onclick = 0;
            document.getElementById(dossierdujeu+"button5").onclick = 0;
            document.getElementById(dossierdujeu+"button1").className = "Gbutton";
            document.getElementById(dossierdujeu+"button2").className = "Gbutton";
            document.getElementById(dossierdujeu+"button3").className = "Gbutton";
            document.getElementById(dossierdujeu+"button4").className = "Gbutton";
            document.getElementById(dossierdujeu+"button5").className = "Gbutton";
        }
    }
    else
    {
        if (process.platform === "win32")
        {
           if (fs.readFileSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt).toString()===fs.readFileSync(__dirname+'/VersionsFiles/'+versionlcl).toString())
        {
            document.getElementById(dossierdujeu+"button1").innerHTML = "Jouer";
            document.getElementById(txtVID).innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt).toString();
        }
        else
        {
            document.getElementById(dossierdujeu+"button1").innerHTML = "Mettre à jour";
            document.getElementById(txtVID).innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt).toString()+" (Non à jour)";
            let myNotification = new Notification(gamename, {
                body: "Une mise à jour du jeu "+gamename+" est disponible !"
              })
        } 
        }
        if (process.platform !== "win32")
        {
            document.getElementById(dossierdujeu+"button1").innerHTML = "Indisponible";
            document.getElementById(txtVID).innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById(dossierdujeu+"button1").onclick = 0;
            document.getElementById(dossierdujeu+"button2").onclick = 0;
            document.getElementById(dossierdujeu+"button3").onclick = 0;
            document.getElementById(dossierdujeu+"button4").onclick = 0;
            document.getElementById(dossierdujeu+"button5").onclick = 0;
            document.getElementById(dossierdujeu+"button1").className = "Gbutton";
            document.getElementById(dossierdujeu+"button2").className = "Gbutton";
            document.getElementById(dossierdujeu+"button3").className = "Gbutton";
            document.getElementById(dossierdujeu+"button4").className = "Gbutton";
            document.getElementById(dossierdujeu+"button5").className = "Gbutton";
        }
    }
}

function detect(dossierdujeu,versiontxt,versionlcl,gamename,txtVID){
    if (fs.existsSync(__dirname+'/Games/'+dossierdujeu+"/"+versiontxt)===false)
    {
        if (process.platform === "win32" || process.platform === "linux" || process.platform === "darwin")
        {
            document.getElementById(dossierdujeu+"button1").innerHTML = "Installer";
            document.getElementById(txtVID).innerHTML = "Version : ?";
            document.getElementById(dossierdujeu+"button2").onclick = 0;
            document.getElementById(dossierdujeu+"button3").onclick = 0;
            document.getElementById(dossierdujeu+"button4").onclick = 0;
            document.getElementById(dossierdujeu+"button5").onclick = 0;
            document.getElementById(dossierdujeu+"button2").className = "Gbutton";
            document.getElementById(dossierdujeu+"button3").className = "Gbutton";
            document.getElementById(dossierdujeu+"button4").className = "Gbutton";
            document.getElementById(dossierdujeu+"button5").className = "Gbutton";
        }
        else
        {
            document.getElementById(dossierdujeu+"button1").innerHTML = "Indisponible";
            document.getElementById(txtVID).innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById(dossierdujeu+"button1").onclick = 0;
            document.getElementById(dossierdujeu+"button2").onclick = 0;
            document.getElementById(dossierdujeu+"button3").onclick = 0;
            document.getElementById(dossierdujeu+"button4").onclick = 0;
            document.getElementById(dossierdujeu+"button5").onclick = 0;
            document.getElementById(dossierdujeu+"button1").className = "Gbutton";
            document.getElementById(dossierdujeu+"button2").className = "Gbutton";
            document.getElementById(dossierdujeu+"button3").className = "Gbutton";
            document.getElementById(dossierdujeu+"button4").className = "Gbutton";
            document.getElementById(dossierdujeu+"button5").className = "Gbutton";
        }
    }
    else
    {
        if (process.platform === "win32" || process.platform === "darwin" || process.platform === "linux")
        {
            console.log(fs.readFileSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt).toString())
            console.log(fs.readFileSync(__dirname+'/VersionsFiles/'+versionlcl).toString())
           if (fs.readFileSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt).toString()===fs.readFileSync(__dirname+'/VersionsFiles/'+versionlcl).toString())
            {
                document.getElementById(dossierdujeu+"button1").innerHTML = "Jouer";
                document.getElementById(txtVID).innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt).toString();
            }
            else
            {
                document.getElementById(dossierdujeu+"button1").innerHTML = "Mettre à jour";
                document.getElementById(txtVID).innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt).toString()+" (Non à jour)";
                let myNotification = new Notification(gamename, {
                    body: "Une mise à jour du jeu "+gamename+" est disponible !"
                })
            } 
        }
        else
        {
            document.getElementById(dossierdujeu+"button1").innerHTML = "Indisponible";
            document.getElementById(txtVID).innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById(dossierdujeu+"button1").onclick = 0;
            document.getElementById(dossierdujeu+"button2").onclick = 0;
            document.getElementById(dossierdujeu+"button3").onclick = 0;
            document.getElementById(dossierdujeu+"button4").onclick = 0;
            document.getElementById(dossierdujeu+"button5").onclick = 0;
            document.getElementById(dossierdujeu+"button1").className = "Gbutton";
            document.getElementById(dossierdujeu+"button2").className = "Gbutton";
            document.getElementById(dossierdujeu+"button3").className = "Gbutton";
            document.getElementById(dossierdujeu+"button4").className = "Gbutton";
            document.getElementById(dossierdujeu+"button5").className = "Gbutton";
        }
    }
}
/*function detectlaatim(){
    if (fs.existsSync(__dirname+'/Games/LAATIM/LAIM_Version.txt')===false)
    {
        if (process.platform === "win32")
        {
            document.getElementById("LAATIMbutton1").innerHTML = "Installer";
            document.getElementById("text1").innerHTML = "Version : ?";
            document.getElementById("LAATIMbutton2").onclick = 0;
            document.getElementById("LAATIMbutton3").onclick = 0;
            document.getElementById("LAATIMbutton4").onclick = 0;
            document.getElementById("LAATIMbutton5").onclick = 0;
            document.getElementById("LAATIMbutton2").className = "Gbutton";
            document.getElementById("LAATIMbutton3").className = "Gbutton";
            document.getElementById("LAATIMbutton4").className = "Gbutton";
            document.getElementById("LAATIMbutton5").className = "Gbutton";
        }
        if (process.platform !== "win32")
        {
            document.getElementById("LAATIMbutton1").innerHTML = "Indisponible";
            document.getElementById("text1").innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById("LAATIMbutton1").onclick = 0;
            document.getElementById("LAATIMbutton2").onclick = 0;
            document.getElementById("LAATIMbutton3").onclick = 0;
            document.getElementById("LAATIMbutton4").onclick = 0;
            document.getElementById("LAATIMbutton5").onclick = 0;
            document.getElementById("LAATIMbutton1").className = "Gbutton";
            document.getElementById("LAATIMbutton2").className = "Gbutton";
            document.getElementById("LAATIMbutton3").className = "Gbutton";
            document.getElementById("LAATIMbutton4").className = "Gbutton";
            document.getElementById("LAATIMbutton5").className = "Gbutton";
        }
     
    }
    else
    {
        if (process.platform === "win32")
        {
           if (fs.readFileSync(__dirname+'/Games/LAATIM/LAIM_Version.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/LAIM_Version.txt').toString())
        {
            document.getElementById("LAATIMbutton1").innerHTML = "Jouer";
            document.getElementById("text1").innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/LAATIM/LAIM_Version.txt').toString();
        }
        else
        {
            document.getElementById("LAATIMbutton1").innerHTML = "Mettre à jour";
            document.getElementById("text1").innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/LAATIM/LAIM_Version.txt').toString()+" (Non à jour)";
            let myNotification = new Notification('Legend Adventure and the Infernal Maze', {
                body: "Le jeu Legend Adventure and the Infernal Maze a besoin d'une mise à jour !"
              })
        } 
        }
        if (process.platform !== "win32")
        {
            document.getElementById("LAATIMbutton1").innerHTML = "Indisponible";
            document.getElementById("text1").innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById("LAATIMbutton1").onclick = 0;
            document.getElementById("LAATIMbutton2").onclick = 0;
            document.getElementById("LAATIMbutton3").onclick = 0;
            document.getElementById("LAATIMbutton4").onclick = 0;
            document.getElementById("LAATIMbutton5").onclick = 0;
            document.getElementById("LAATIMbutton1").className = "Gbutton";
            document.getElementById("LAATIMbutton2").className = "Gbutton";
            document.getElementById("LAATIMbutton3").className = "Gbutton";
            document.getElementById("LAATIMbutton4").className = "Gbutton";
            document.getElementById("LAATIMbutton5").className = "Gbutton";
        }
    }
}
function detectla(){
    if (fs.existsSync(__dirname+'/Games/LA/VersionLA.txt')===false)
    {
        if (process.platform === "win32")
        {
            document.getElementById("LAbutton1").innerHTML = "Installer";
            document.getElementById("versiontxtla").innerHTML = "Version : ?";
            document.getElementById("LAbutton2").onclick = 0;
            document.getElementById("LAbutton3").onclick = 0;
            document.getElementById("LAbutton4").onclick = 0;
            document.getElementById("LAbutton5").onclick = 0;
            document.getElementById("LAbutton2").className = "Gbutton";
            document.getElementById("LAbutton3").className = "Gbutton";
            document.getElementById("LAbutton4").className = "Gbutton";
            document.getElementById("LAbutton5").className = "Gbutton";
        }
        if (process.platform !== "win32")
        {
            document.getElementById("LAbutton1").innerHTML = "Indisponible";
            document.getElementById("versiontxtLA").innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById("LAbutton1").onclick = 0;
            document.getElementById("LAbutton2").onclick = 0;
            document.getElementById("LAbutton3").onclick = 0;
            document.getElementById("LAbutton4").onclick = 0;
            document.getElementById("LAbutton5").onclick = 0;
            document.getElementById("LAbutton1").className = "Gbutton";
            document.getElementById("LAbutton2").className = "Gbutton";
            document.getElementById("LAbutton3").className = "Gbutton";
            document.getElementById("LAbutton4").className = "Gbutton";
            document.getElementById("LAbutton5").className = "Gbutton";
        }
     
    }
    else
    {
        if (process.platform === "win32")
        {
           if (fs.readFileSync(__dirname+'/Games/LA/VersionLA.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/LA_Version.txt').toString())
        {
            document.getElementById("LAbutton1").innerHTML = "Jouer";
            document.getElementById("versiontxtla").innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/LA/VersionLA.txt').toString();
        }
        else
        {
            document.getElementById("LAbutton1").innerHTML = "Mettre à jour";
            document.getElementById("versiontxtla").innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/LA/VersionLA.txt').toString()+" (Non à jour)";
            let myNotification = new Notification('Lutin Adventure', {
                body: "Le jeu Lutin Adventure a besoin d'une mise à jour !"
              })
        } 
        }
        if (process.platform !== "win32")
        {
            document.getElementById("LAbutton1").innerHTML = "Indisponible";
            document.getElementById("versiontxtLA").innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById("LAbutton1").onclick = 0;
            document.getElementById("LAbutton2").onclick = 0;
            document.getElementById("LAbutton3").onclick = 0;
            document.getElementById("LAbutton4").onclick = 0;
            document.getElementById("LAbutton5").onclick = 0;
            document.getElementById("LAbutton1").className = "Gbutton";
            document.getElementById("LAbutton2").className = "Gbutton";
            document.getElementById("LAbutton3").className = "Gbutton";
            document.getElementById("LAbutton4").className = "Gbutton";
            document.getElementById("LAbutton5").className = "Gbutton";
        }
    }
}
function detectsf(){
    if (fs.existsSync(__dirname+'/Games/SF/VersionSF.txt')===false)
    {
        if (process.platform === "win32")
        {
            document.getElementById("SFbutton1").innerHTML = "Installer";
            document.getElementById("versiontxtsf").innerHTML = "Version : ?";
            document.getElementById("SFbutton2").onclick = 0;
            document.getElementById("SFbutton3").onclick = 0;
            document.getElementById("SFbutton4").onclick = 0;
            document.getElementById("SFbutton5").onclick = 0;
            document.getElementById("SFbutton2").className = "Gbutton";
            document.getElementById("SFbutton3").className = "Gbutton";
            document.getElementById("SFbutton4").className = "Gbutton";
            document.getElementById("SFbutton5").className = "Gbutton";
        }
        if (process.platform !== "win32")
        {
            document.getElementById("SFbutton1").innerHTML = "Indisponible";
            document.getElementById("versiontxtsf").innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById("SFbutton1").onclick = 0;
            document.getElementById("SFbutton2").onclick = 0;
            document.getElementById("SFbutton3").onclick = 0;
            document.getElementById("SFbutton4").onclick = 0;
            document.getElementById("SFbutton5").onclick = 0;
            document.getElementById("SFbutton1").className = "Gbutton";
            document.getElementById("SFbutton2").className = "Gbutton";
            document.getElementById("SFbutton3").className = "Gbutton";
            document.getElementById("SFbutton4").className = "Gbutton";
            document.getElementById("SFbutton5").className = "Gbutton";
        }
     
    }
    else
    {
        if (process.platform === "win32")
        {
           if (fs.readFileSync(__dirname+'/Games/SF/VersionSF.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/SF_Version.txt').toString())
        {
            document.getElementById("SFbutton1").innerHTML = "Jouer";
            document.getElementById("versiontxtsf").innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/SF/VersionSF.txt').toString();
        }
        else
        {
            document.getElementById("SFbutton1").innerHTML = "Mettre à jour";
            document.getElementById("versiontxtsf").innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/SF/VersionSF.txt').toString()+" (Non à jour)";
            let myNotification = new Notification('ShootFighter', {
                body: "Le jeu ShootFighter a besoin d'une mise à jour !"
              })
        } 
        }
        if (process.platform !== "win32")
        {
            document.getElementById("SFbutton1").innerHTML = "Indisponible";
            document.getElementById("versiontxtsf").innerHTML = "Ce jeu n'est pas disponible pour cette plateforme.";
            document.getElementById("SFbutton1").onclick = 0;
            document.getElementById("SFbutton2").onclick = 0;
            document.getElementById("SFbutton3").onclick = 0;
            document.getElementById("SFbutton4").onclick = 0;
            document.getElementById("SFbutton5").onclick = 0;
            document.getElementById("SFbutton1").className = "Gbutton";
            document.getElementById("SFbutton2").className = "Gbutton";
            document.getElementById("SFbutton3").className = "Gbutton";
            document.getElementById("SFbutton4").className = "Gbutton";
            document.getElementById("SFbutton5").className = "Gbutton";
        }
    }
}*/
function DownlaodVersion(file_url,targetPath){
	var received_bytes = 0;
	var total_bytes = 0;
	var req = request({
		method:'GET',
		uri:file_url
	});
	var out = fs.createWriteStream(targetPath);
	req.pipe(out);
	req.on('response',function(data){
		total_bytes = parseInt(data.headers['content-length']);
	});
	req.on('data', function(chunk) {
        received_bytes += chunk.length;
        showProgress(received_bytes, total_bytes);
    });
}
var only_one = false
function DLVersions(){
    if (only_one===false){
        only_one===true
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJolpeqR1khuFIbpjA?e=dzHBIo",__dirname+'/VersionsFiles/SNRE_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JUXbjPwj1mBzrOuA?e=wVHkGU",__dirname+'/VersionsFiles/AE_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JT9OzEaq3ZoNfmnA?e=tR3RtZ",__dirname+'/VersionsFiles/FWD_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJJHH7sOlvHBfzY_GQ?e=bvxWKA",__dirname+'/VersionsFiles/LAIM_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IJkzYhtpbSxdBvQw?e=yFnUcs",__dirname+'/VersionsFiles/LA_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_EtKOdpt4-X1izIug?e=8L7yzS",__dirname+'/VersionsFiles/SF_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hIVslFrM3BD9n8EIVg?e=rUpNyY",__dirname+'/VersionsFiles/SGB_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JQY-iX8XEyRi1fKg?e=JjUTjN",__dirname+'/VersionsFiles/TB_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JS2t-rHXsxRfeY0Q?e=0bzJAo",__dirname+'/VersionsFiles/TTD_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IKXku5lt0MD19anw?e=r7XGjI",__dirname+'/VersionsFiles/VITF_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_JRLYRM7lR1-I5-4A?e=o4fHof",__dirname+'/VersionsFiles/WR_Version.txt');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IImCSAtlZSG31pPg?e=92fd99",__dirname+'/VersionsFiles/LauncherVersion.txt')
    }
}

function DoforWin(dossierdujeu,versiontxt,URL,zipname,versionlcl,nomexe,gamename)
{
    if (process.platform === "win32")
    {
        if (fs.existsSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt)===false)
        {
            DL(URL,dossierdujeu,zipname);
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/'+dossierdujeu+"/"+versiontxt).toString()===fs.readFileSync(__dirname+'/VersionsFiles/'+versionlcl).toString())
            {
                Open(dossierdujeu,nomexe);
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/'+dossierdujeu);
                DL(URL,dossierdujeu,zipname);
            }
        }
    }
    if (process.platform !== "win32")
    {
        alert(gamename + " n'est pas disponible pour votre système d'exploitation.")
    }
}
function Do(dossierdujeu,versiontxt,URLwin,zipname,versionlcl,nomexe,gamename,linuxexe,macosexe,URLinux,URLmac)
{
    if (process.platform === "win32")
    {
        if (fs.existsSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt)===false)
        {
            DL(URLwin,dossierdujeu,zipname);
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/'+dossierdujeu+"/"+versiontxt).toString()===fs.readFileSync(__dirname+'/VersionsFiles/'+versionlcl).toString())
            {
                Open(dossierdujeu,nomexe);
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/'+dossierdujeu);
                DL(URLwin,dossierdujeu,zipname);
            }
        }
    }
    if (process.platform === "linux")
    {
        if (fs.existsSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt)===false)
        {
            DL(URLinux,dossierdujeu,zipname);
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/'+dossierdujeu+"/"+versiontxt).toString()===fs.readFileSync(__dirname+'/VersionsFiles/'+versionlcl).toString())
            {
                
                Open(dossierdujeu,linuxexe);
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/'+dossierdujeu);
                DL(URLinux,dossierdujeu,zipname);
            }
        }
    }
    if (process.platform === "darwin")
    {
        if (fs.existsSync(__dirname+'/Games/'+dossierdujeu+'/'+versiontxt)===false)
        {
            DL(URLmac,dossierdujeu,zipname);
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/'+dossierdujeu+"/"+versiontxt).toString()===fs.readFileSync(__dirname+'/VersionsFiles/'+versionlcl).toString())
            {
                shell.openItem(__dirname+"/Games/"+dossierdujeu+"/Contents/MacOS/"+macosexe);
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/'+dossierdujeu);
                DL(URLmac,dossierdujeu,zipname);
            }
        }
    }
}
/*function DoLAATIM()
{
    if (process.platform === "win32")
    {
        if (fs.existsSync(__dirname+'/Games/LAATIM/LAIM_Version.txt')===false)
        {
            DL("https://1drv.ws/u/s!AkkqGntQc7Y5hJJILZuBLOlDQFoPlg?e=Ufggq4","LAATIM","LA_IM.zip");
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/LAATIM/LAIM_Version.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/LAIM_Version.txt').toString())
            {
                Open("LAATIM","LA_IM.exe");
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/LAATIM');
                DL("https://1drv.ws/u/s!AkkqGntQc7Y5hJJILZuBLOlDQFoPlg?e=Ufggq4","LAATIM","LA_IM.zip");
            }
        }
    }
    if (process.platform !== "win32")
    {
        alert("Ce jeu n'est pas disponible pour votre système d'exploitation.")
    }
}
function DoLA()
{
    if (process.platform === "win32")
    {
        if (fs.existsSync(__dirname+'/Games/LA/VersionLA.txt')===false)
        {
            DL("https://1drv.ws/u/s!AkkqGntQc7Y5g_IEdbfA3BO7-w0QVQ?e=LqX9l3","LA","Lutin_Adventure.zip");
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/LA/VersionLA.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/LA_Version.txt').toString())
            {
                Open("LA","Lutin_Adventure.exe");
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/LA');
                DL("https://1drv.ws/u/s!AkkqGntQc7Y5g_IEdbfA3BO7-w0QVQ?e=LqX9l3","LA","Lutin_Adventure.zip");
            }
        }
    }
    if (process.platform !== "win32")
    {
        alert("Ce jeu n'est pas disponible pour votre système d'exploitation.")
    }
}
function DoSF()
{
    if (process.platform === "win32")
    {
        if (fs.existsSync(__dirname+'/Games/SF/VersionSF.txt')===false)
        {
            DL("https://1drv.ws/u/s!AkkqGntQc7Y5g_I2LkrpytSs0dZC_g?e=ZLqh0N","SF","SF.zip");
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/SF/VersionSF.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/SF_Version.txt').toString())
            {
                Open("SF","ShootFighter.exe");
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/SF');
                DL("https://1drv.ws/u/s!AkkqGntQc7Y5g_I2LkrpytSs0dZC_g?e=ZLqh0N","SF","SF.zip");
            }
        }
    }
    if (process.platform !== "win32")
    {
        alert("Ce jeu n'est pas disponible pour votre système d'exploitation.")
    }
}*/
function refresh(){
    document.location.reload(true);
}
function repair(url,dossier,zip,urlinux,urlmac)
{
    console.log(__dirname+"/Games/"+dossier)
    deletefolderforrepair(__dirname+"/Games/"+dossier);
    setTimeout(function(){
        if (process.platform === 'win32')
        {
           DL(url,dossier,zip); 
        }
        if (process.platform === 'linux')
        {
           DL(urlinux,dossier,zip); 
        }
        if (process.platform === 'darwin')
        {
           DL(urlmac,dossier,zip); 
        }
    },5000); 
    
}

function deletefolderforrepair(folder2delete){
    rimraf(folder2delete, function () { console.log("done"); });
    setTimeout(function (){
    if (!fs.existsSync(__dirname+'/Games'))fs.mkdirSync(__dirname+'/Games', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/AE'))fs.mkdirSync(__dirname+'/Games/AE', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/SNRE'))fs.mkdirSync(__dirname+'/Games/SNRE', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/LAATIM'))fs.mkdirSync(__dirname+'/Games/LAATIM', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/LA'))fs.mkdirSync(__dirname+'/Games/LA', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/SGB'))fs.mkdirSync(__dirname+'/Games/SGB', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/SF'))fs.mkdirSync(__dirname+'/Games/SF', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/TTD'))fs.mkdirSync(__dirname+'/Games/TTD', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/TB'))fs.mkdirSync(__dirname+'/Games/TB', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/FWD'))fs.mkdirSync(__dirname+'/Games/FWD', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/VITF'))fs.mkdirSync(__dirname+'/Games/VITF', { recursive: true });
   if (!fs.existsSync(__dirname+'/Games/WR'))fs.mkdirSync(__dirname+'/Games/WR', { recursive: true });
   },500);
}
/*function detectsgb(){
    if (fs.existsSync(__dirname+'/Games/SGB/SGB_Version.txt')===false)
    {
        if (process.platform === "win32" || process.platform ==="linux" || process.platform === "darwin" || process.platform === "android" )
        {
            document.getElementById("SGBbutton1").innerHTML = "Installer";
            document.getElementById("versiontxtsgb").innerHTML = "Version : ?";
            document.getElementById("SGBbutton2").onclick = 0;
            document.getElementById("SGBbutton3").onclick = 0;
            document.getElementById("SGBbutton4").onclick = 0;
            document.getElementById("SGBbutton5").onclick = 0;
            document.getElementById("SGBbutton2").className = "Gbutton";
            document.getElementById("SGBbutton3").className = "Gbutton";
            document.getElementById("SGBbutton4").className = "Gbutton";
            document.getElementById("SGBbutton5").className = "Gbutton";
        } 
        else
        {
            document.getElementById("SGBbutton1").innerHTML = "Indisponible";
            document.getElementById("versiontxtsgb").innerHTML = "Le jeu n'est pas compatible avec votre plateforme";
            document.getElementById("SGBbutton2").onclick = 0;
            document.getElementById("SGBbutton3").onclick = 0;
            document.getElementById("SGBbutton4").onclick = 0;
            document.getElementById("SGBbutton5").onclick = 0;
            document.getElementById("SGBbutton1").onclick = 0;
            document.getElementById("SGBbutton1").className = "Gbutton";
            document.getElementById("SGBbutton2").className = "Gbutton";
            document.getElementById("SGBbutton3").className = "Gbutton";
            document.getElementById("SGBbutton4").className = "Gbutton";
            document.getElementById("SGBbutton5").className = "Gbutton";
        }
    }
    else
    {
        if (process.platform === "win32" || process.platform === "darwin" || process.platform==="android" || process.platform==="linux")
        {
           if (fs.readFileSync(__dirname+'/Games/SGB/SGB_Version.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/SGB_Version.txt').toString())
            {
                document.getElementById("SGBbutton1").innerHTML = "Jouer";
                document.getElementById("versiontxtsgb").innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/SGB/SGB_Version.txt').toString();
            }
            else
            {
                document.getElementById("SGBbutton1").innerHTML = "Mettre à jour";
                document.getElementById("versiontxtsgb").innerHTML = "Version : "+fs.readFileSync(__dirname+'/Games/SGB/SGB_Version.txt').toString()+" (Non à jour)";
                let myNotification = new Notification('Super Geoffrey Bros', {
                    body: "Super Geoffrey Bros a besoin d'une mise à jour !"
                })
            } 
        }
        else
        {
            document.getElementById("SGBbutton1").innerHTML = "Indisponible";
            document.getElementById("versiontxtsgb").innerHTML = "Le jeu n'est pas compatible avec votre plateforme";
            document.getElementById("SGBbutton2").onclick = 0;
            document.getElementById("SGBbutton3").onclick = 0;
            document.getElementById("SGBbutton4").onclick = 0;
            document.getElementById("SGBbutton5").onclick = 0;
            document.getElementById("SGBbutton1").onclick = 0;
            document.getElementById("SGBbutton1").className = "Gbutton";
            document.getElementById("SGBbutton2").className = "Gbutton";
            document.getElementById("SGBbutton3").className = "Gbutton";
            document.getElementById("SGBbutton4").className = "Gbutton";
            document.getElementById("SGBbutton5").className = "Gbutton";
        }
    }
}

function DoSGB()
{
    if (process.platform === "win32")
    {
        if (fs.existsSync(__dirname+'/Games/SGB/SGB_Version.txt')===false)
        {
            DL("https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz","SGB","SGB.zip");
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/SGB/SGB_Version.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/SGB_Version.txt').toString())
            {
                Open("SGB","nw.exe");
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/SGB');
                DL("https://1drv.ws/u/s!AkkqGntQc7Y5hIVjIheY_aPr1832Gg?e=bQLmFz","SGB","SGB.zip");
            }
        }
    }
    if (process.platform ==="linux"){
        if (fs.existsSync(__dirname+'/Games/SGB/SGB_Version.txt')===false)
        {
            DL("https://1drv.ws/u/s!AkkqGntQc7Y5hJoopV-SOJfhLYFSvA?e=BTtp3x","SGB","SGB.zip");
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/SGB/SGB_Version.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/SGB_Version.txt').toString())
            {
                Open("SGB","nw");
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/SGB');
                DL("https://1drv.ws/u/s!AkkqGntQc7Y5hJoopV-SOJfhLYFSvA?e=BTtp3x","SGB","SGB.zip");
            }
        }
    }
    if (process.platform ==="darwin"){
        if (fs.existsSync(__dirname+'/Games/SGB/SGB_Version.txt')===false)
        {
            DL("https://1drv.ws/u/s!AkkqGntQc7Y5hJopCrrDVVHteOUoaw?e=5SJHNR","SGB","SGB.zip");
        }
        else
        {
            if (fs.readFileSync(__dirname+'/Games/SGB/SGB_Version.txt').toString()===fs.readFileSync(__dirname+'/VersionsFiles/SGB_Version.txt').toString())
            {
                Open("SGB","nw.exe");
            }
            else
            {
                deletefolderforrepair(__dirname+'/Games/SGB');
                DL("https://1drv.ws/u/s!AkkqGntQc7Y5hJopCrrDVVHteOUoaw?e=5SJHNR","SGB","SGB.zip");
            }
        }
    }
    if (process.platform !== "win32" && process.platform !== "android" && process.platform !== "linux" && process.platform !== "darwin")
    {
        alert("Ce jeu n'est pas disponible pour votre système d'exploitation.")
    }
}*/
function RunWithoutInstall(url,gamejolt){
const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const path = require('path')
const win = new BrowserWindow({
    minHeight:480,
    minWidth : 720,
    height : 480,
    width:720,
    icon : path.join(__dirname,'Ressources/logoexp.png')
});
win.loadURL(url);
if (gamejolt === true)
{
    setTimeout(function (){
       window.quit()
    },5000)
}
}
function DLauncher(url){
	var received_bytes = 0;
	var total_bytes = 0;
	var req = request({
		method:'GET',
		uri:url
    });
        var out = fs.createWriteStream(__dirname+"/Nytuo.Launcher.zip");
	req.pipe(out);
	req.on('response',function(data){
		total_bytes = parseInt(data.headers['content-length']);
	});
	req.on('data', function(chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes);
    });
    extractzipgame( __dirname+"/Nytuo.Launcher.zip",__dirname);

};
var isUp2date = true;

var update = (function(){
    var executed = false;
    return function(){
        if (!executed){
            executed = true;
            console.log(window.require('electron').remote.app.getVersion().toString());
            console.log(fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString());
            if (window.require('electron').remote.app.getVersion().toString()<fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString())   
            {
                let myNotification = new Notification('Nytuo Launcher -- Updater', {
                    body: "Le launcher n'est pas à jour !"
                })
                console.log("You have to update the launcher !")
                isUp2date = false
            }
            if (window.require('electron').remote.app.getVersion().toString()>fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString())
            {
                console.log("Very UpToDate")
            }
            if (window.require('electron').remote.app.getVersion().toString()===fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString())
            {
                console.log("UpToDate")
            }
            if (isUp2date === false)
            {
                if (process.platform === "linux")
                {
                    DLauncher("https://github.com/nytuo/nytuo-launcher/release/latest/download/Nytuo.Launcher-linux-x64.zip");
                    isUp2date = true;
                }
                if (process.platform === "win32")
                {
                    DLauncher("https://github.com/nytuo/nytuo-launcher/release/latest/download/Nytuo.Launcher-win32-x64.zip");
                    isUp2date = true;
                }
                if (process.platform === "darwin")
                {
                    DLauncher("https://github.com/nytuo/nytuo-launcher/release/latest/download/Nytuo.Launcher-darwin-x64.zip");
                    isUp2date = true;
                }
            }
        }
    }
})();