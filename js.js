const {shell,webContents} = require('electron');
const {ipcRenderer} = require('electron');
const rimraf = require("rimraf");
const extract=require('extract-zip');
var request = require('request');
var fs =require('fs');
const os = require('os');
var homedir = os.homedir();
const app = require('electron').remote.app;
var dialog = app.dialog; 
const ws = require('windows-shortcuts');
var updatedownloaded = false;
var path = require('path');
function achivement(){

    const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const path = require('path')
let display = remote.screen.getPrimaryDisplay();
let width = display.bounds.width;
let height = display.bounds.height;
const ach = new BrowserWindow({
    frame : false,
    resizable: false,
    height : 100,
    width:350,
    alwaysOnTop: true,
    icon : path.join(__dirname,'Ressources/logoexp.png'),
    x: width -380,
    y: height-150,
    webPreferences: {
        nodeIntegration: true
      },
});

ach.loadFile("./achivement.html");
ach.setAlwaysOnTop(true, "floating", 1);
ach.setVisibleOnAllWorkspaces(true);
}
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
    console.log(filepath)
if (fs.existsSync(filepath)) {
    fs.unlink(filepath, (err) => {
        if (err) {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Erreur : "+err.message+" \nLogoexp.png");
                    achivement();
            console.log(err);
            return;
            
        }});
        
} else {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Le vidage du cache a rencontré une erreur \nLogoexp.png");
    achivement();
}
if (file2delete === __dirname+"/Games/LAATIM/LA_IM.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Legend Adventure and the Infernal Maze est maintenant jouable \nLogoLAATIM.png");
                    achivement();
        }
        if (file2delete === __dirname+"/Games/SF/SF.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","ShootFighter est maintenant jouable \nLogoSF.png");
            achivement();
        }
        if (file2delete === __dirname+"/Games/LA/LA.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Lutin Adventure est maintenant jouable \nLogoLA.png");
                    achivement();
        }
        if (file2delete === __dirname+"/Games/AE/AE.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","AstéroidEscape est maintenant jouable ! \nLogoAE.png");
            achivement();
        }
        if (file2delete === __dirname+"/Games/SNRE/SNRE.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","SansNom Réédition est maintenant jouable \nLogoSN.png");
            achivement();
        }
        if (file2delete === __dirname+"/Games/SGB/SGB.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Super Geoffrey Bros est maintenant jouable \nLogoSGB.png");
            achivement();
        }
        if (file2delete === __dirname+"/Games/TTD/TTD.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","The Tardis Defender est maintenant jouable \nLogoTTD.png");
            achivement();
        }
        if (file2delete === __dirname+"/Games/TB/TB.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","TanksBattle est maintenant jouable \nLogoTB.png");
            achivement();
        }
        if (file2delete === __dirname+"/Games/FWD/FWD.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","FireWall Defender est maintenant jouable \nLogoFWD.png");
                    achivement();
        }
        if (file2delete === __dirname+"/Games/VITF/VITF.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Vincent In The Forest est maintenant jouable \nLogoVITF.png");
            achivement();
        }
        if (file2delete === __dirname+"/Games/WR/WR.zip")
        {
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","WinRun est maintenant jouable \nLogoWR.png");
            achivement();
        }
        if (file2delete === __dirname+"/Update.zip")
        {
            window.location.href = "./index.html"
        }

        setTimeout(function (){
if (isUp2date === true)
{
    refresh();
}
else
{
 window.location.href = "./index.html"
}
},2000);

}
function OpenEmpl(emplacement){
    console.log(emplacement);
    shell.openItem(emplacement)
}
function redm(){
    exec(process.execPath);
    appl.quit();
}
function deletefolder(folder2delete){
    rimraf(folder2delete, function () { console.log("done"); });
    if (folder2delete === __dirname+"/Games/LAATIM")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Legend Adventure and the Infernal Maze est maintenant supprimer \nLogoLAATIM.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/SF")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Shootfighter est maintenant supprimer \nLogoSF.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/LA")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Lutin Adventure est maintenant supprimer \nLogoLA.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/AE")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","AstéroidEscape est maintenant supprimer \nLogoAE.png");
                    achivement();   
   }
   if (folder2delete === __dirname+"/Games/SNRE")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","SansNom Réédition est maintenant supprimer \nLogoSN.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/SGB")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Super Geoffrey Bros est maintenant supprimer \nSGB1.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/TTD")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","The Tardis Defender est maintenant supprimer \nLogoTTD.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/TB")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","TanksBattle est maintenant supprimer\nLogoTB.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/FWD")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","FireWall Defender est maintenant supprimer \nLogoFWD.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/VITF")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Vincent In The Forest est maintenant supprimer \nLogoVITF.png");
    achivement();
   }
   if (folder2delete === __dirname+"/Games/WR")
   {
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","WinRun est maintenant Supprimer \nLogoWR.png");
    achivement();
   }
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
    
    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Tous les jeux ont été supprimer \nLogoexp.png");
                    achivement();
      refresh();
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
            var logo;
            if (gamename === "Lutin Adventure"){
                logo = "LogoLA"
            }
            if (gamename === "ShootFighter"){
                logo = "LogoSF"
            }
            if (gamename === "Super Geoffrey Bros"){
                logo = "SGB1"
            }
            if (gamename === "Legend Adventure and the Infernal Maze"){
                logo = "LogoLAATIM"
            }
            if (gamename === "Vincent In The Forest"){
                logo = "LogoVITF"
            }
            if (gamename === "The Tardis Defender"){
                logo = "LogoTTD"
            }
            if (gamename === "FireWall Defender"){
                logo = "LogoFWD"
            }
            if (gamename === "TanksBattle"){
                logo = "LogoTB"
            }
            if (gamename === "WinRun"){
                logo = "LogoWR"
            }
            if (gamename === "AsteroidEscape"){
                logo = "LogoAE"
            }
            if (gamename === "SansNom Réédition"){
                logo = "LogoSN"
            }
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Une mise à jour du jeu "+gamename+" est disponible \n"+logo+".png");
                    achivement();
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
                var logo;
            if (gamename === "Lutin Adventure"){
                logo = "LogoLA"
            }
            if (gamename === "ShootFighter"){
                logo = "LogoSF"
            }
            if (gamename === "Super Geoffrey Bros"){
                logo = "SGB1"
            }
            if (gamename === "Legend Adventure and the Infernal Maze"){
                logo = "LogoLAATIM"
            }
            if (gamename === "Vincent In The Forest"){
                logo = "LogoVITF"
            }
            if (gamename === "The Tardis Defender"){
                logo = "LogoTTD"
            }
            if (gamename === "FireWall Defender"){
                logo = "LogoFWD"
            }
            if (gamename === "TanksBattle"){
                logo = "LogoTB"
            }
            if (gamename === "WinRun"){
                logo = "LogoWR"
            }
            if (gamename === "AsteroidEscape"){
                logo = "LogoAE"
            }
            if (gamename === "SansNom Réédition"){
                logo = "LogoSN"
            }
            fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Une mise à jour du jeu "+gamename+" est disponible \n"+logo+".png");
                    achivement();
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

var only_one = false
function DownlaodVersion(file_url,targetPath){

        only_one = true
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
    });
}
function choose(){
    let random = Math.floor(Math.random()*(10-0+1)+0);
    if (random===0){
        document.getElementById("loadertxt").innerHTML = "Connecting to the TARDIS's database..."
    }
    if (random===1){
        document.getElementById("loadertxt").innerHTML = "Toss a coin to your Programer..."
    }
    if (random===2){
        document.getElementById("loadertxt").innerHTML = "To Be or not to Be, why not Be a Launcher ?"
    }
    if (random===3){
        document.getElementById("loadertxt").innerHTML = "Nothing is true, everything is permitted !"
    }
    if (random===4){
        document.getElementById("loadertxt").innerHTML = "Darth Vader is Immortal !"
    }
    if (random===5){
        document.getElementById("loadertxt").innerHTML = "Thanos kill half of univers population..."
    }
    if (random===6){
        document.getElementById("loadertxt").innerHTML = "Checking for upgrade..."
    }
    if (random===7){
        document.getElementById("loadertxt").innerHTML = "Loading..."
    }
    if (random===8){
        document.getElementById("loadertxt").innerHTML = "Avengers Assemble ! "
    }
    if (random===9){
        document.getElementById("loadertxt").innerHTML = "The Nytuo Launcher is loading..."
    }
    if (random===10){
        document.getElementById("loadertxt").innerHTML = "I turn myself into a Launcher, Morty ! I'm Launcher Riiiick !!"
    }

    
}
function DLVersions(){
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJolpeqR1khuFIbpjA?e=wTgArs",__dirname+'/VersionsFiles/SNRE_Version.txt');
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
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5g_IImCSAtlZSG31pPg?e=92fd99",__dirname+'/VersionsFiles/LauncherVersion.txt');
        DownlaodVersion("https://1drv.ws/u/s!AkkqGntQc7Y5hJpf7fm6Vp75nfiuYQ?e=PM7c0S",__dirname+'/news.html');
        DownlaodVersion("https://1drv.ws/t/s!AkkqGntQc7Y5hJp0was2tokc6t75-w?e=jrD2Nu",__dirname+'/VersionsFiles/LauncherUpdateType.txt');
        if (fs.readFileSync(__dirname+'/VersionsFiles/LauncherUpdateType.txt') === "1")
        {
            document.getElementById("updatetext1").innerHTML = "Mise à jour manuelle requise : visiter le site web pour plus d'information..."
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


function achivementanim(){

}
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
var isUp2date = true;
var parentfolder1 = require('path').dirname(__dirname);
var parentfolder2 = require('path').dirname(parentfolder1)+"/";
var update = (function(){
    var executed = false;
    return function(){
        if (!executed){
            setTimeout(function (){
                executed = true;
                console.log(window.require('electron').remote.app.getVersion().toString());

                console.log(parentfolder2);
                console.log(fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString());
                if (window.require('electron').remote.app.getVersion().toString()<fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString())   
                {
                    fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du Nytuo Launcher Disponible\nLogoexp.png");
                    achivement();
                    console.log("You have to update the launcher !")
                    isUp2date = false;
                }
                if (window.require('electron').remote.app.getVersion().toString()>fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString())
                {
                    console.log("Very UpToDate")
                    console.log(app.getAppPath())
                    verif_gameVersionLoading();
                }
                if (window.require('electron').remote.app.getVersion().toString()===fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString())
                {                    
                    console.log("UpToDate")
                    verif_gameVersionLoading();
                }
                if (isUp2date === false)
                {
                    window.location.href = './updater.html'
                }

            },5000)
        }
    }
})();

function Updater(){
    isUp2date = false;
    if (process.platform === "win32")
    {
            DownlaodFile('https://1drv.ws/u/s!AkkqGntQc7Y5hJsDDGucJJ__2ryiUA?e=zeijLG',__dirname+'/Update.zip',parentfolder2)
    } 
    if (process.platform === "linux")
    {
        
            DownlaodFile('https://1drv.ws/u/s!AkkqGntQc7Y5hJsGgVJ-WINxz-jfVQ?e=AqpBKh',__dirname+'/Update.zip',parentfolder2)
        
    }
    if (process.platform === "darwin")
    {
        
            DownlaodFile('https://1drv.ws/u/s!AkkqGntQc7Y5hJsHrdjh7vcEs41iyw?e=d7euDn',__dirname+'/Update.zip',parentfolder2)
    }
}
function verif_gameVersionLoading(){

if (window.require('electron').remote.app.getVersion().toString()>=fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString())
{


    setTimeout(function (){
       if (fs.existsSync(__dirname+'/Games/LAATIM/LAIM_Version.txt').toString === true)
       { if(fs.readFileSync(__dirname+'/Games/LAATIM/LAIM_Version.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/LAIM_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu Legend Adventure and the Infernal Maze Disponible\nLogoLAATIM.png");
        achivement();
       }
    }
    if (fs.existsSync(__dirname+'/Games/SF/VersionSF.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/SF/VersionSF.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/SF_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu ShootFighter Disponible\nLogoSF.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/LA/VersionLA.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/LA/VersionLA.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/LA_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu Lutin Adventure Disponible\nLogoLA.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/AE/VersionAE.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/AE/VersionAE.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/AE_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu Astéroid Escape Disponible\nLogoAE.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/SNRE/SNRE_Version.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/SNRE/SNRE_Version.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/SNRE_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu SansNom Réédition Disponible\nLogoSN.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/SGB/SGB_Version.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/SGB/SGB_Version.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/SGB_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu Super Geoffrey Bros Disponible\nSGB1.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/TTD/TTD_Version.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/TTD/TTD_Version.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/TTD_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu The Tardis Defender Disponible\nLogoTTD.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/TB/VersionTB.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/TB/VersionTB.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/TB_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du TanksBattle Disponible\nLogoTB.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/FWD/VersionFWD.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/FWD/VersionFWD.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/FWD_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du FireWall Defender Disponible\nLogoFWD.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/VITF/VersionVITF.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/VITF/VersionVITF.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/VITF_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu Vincent In The Forest Disponible\nLogoVITF.png");
        achivement();
       }}
       if (fs.existsSync(__dirname+'/Games/WR/VersionWR.txt').toString === true){
       if (fs.readFileSync(__dirname+'/Games/WR/VersionWR.txt').toString()<fs.readFileSync(__dirname+'/VersionsFiles/WR_Version.txt').toString())
       {
        fs.writeFileSync(__dirname+"/Ach_Notif_TXT.txt","Mise à jour du jeu WinRun Disponible\nLogoWR.png");
        achivement();
       }}

       window.location.href = "./index.html"    
       },4000);
    }   
}

function compare(array1,array2){
    var temp = [];
    array1 = array1.toString().split(',').map(String);
    array2 = array2.toString().split(',').map(String);
    
    for (var i in array1) {
    if(array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    return temp.sort((a) => a);
}
function LoadAchivements(){
   console.log(homedir)
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page === "SGBAch.html" || page === "AchivementPage.html"){
        var AchlistSGB = require('fs').readFileSync(__dirname+'/Achievements/SGB/AllAchievements.txt','utf-8').split('\n');
        let AchListSGBDone2 =require('fs').readFileSync(homedir+"/Nytuo/Achievements/SGB/AchDone.txt",'utf-8').split('\n');
        console.log(AchListSGBDone2);
        let temp = AchListSGBDone2.sort();
        let AchListSGBDone=  Array.from(new Set(temp));
        console.log(AchListSGBDone);
        var percentage = ((AchListSGBDone.length-2) * 100) / (AchlistSGB.length-1);
         if (percentage < "0"){
                percentage = 0
            }
        console.log(percentage);
        var elem = document.getElementById("BarAchSGB");   
        var width = 0;
        elem.style.width = percentage + "%"; 
        elem.innerHTML = percentage.toFixed() + "%";
        var AchListSGBTab = AchListSGBDone.slice(1,(AchListSGBDone.length));
        var AchListSGBTXT = AchListSGBTab.toString().split(",").join("<br/>");
        if (page==="SGBAch.html"){
            document.getElementById('SGBachDone').innerHTML = AchListSGBTXT.toString();
            var SGBLock = compare(AchlistSGB,AchListSGBDone);
           
            if (percentage <= "0"){
                document.getElementById('SGBachDone').innerHTML = "Aucun Achievements n'a encore était débloquer pour ce jeu"
            }
            if (percentage != "100")
            {
                document.getElementById('SGBach').innerHTML = SGBLock.toString().split(",").join('<br/>');
            } 
            else{
                document.getElementById('SGBach').innerHTML = "All Achievements are Unlocked"
            }
        }
    }
    if (page === "LAATIMAch.html" || page === "AchivementPage.html"){
        var AchlistLAATIM = require('fs').readFileSync(__dirname+'/Achievements/LAATIM/AllAchievements.txt','utf-8').split('\n');
        let AchListLAATIMDone2 =require('fs').readFileSync(__dirname+"/Games/LAATIM/Achievements.txt",'utf-8').split('\n');
        console.log(AchListLAATIMDone2);
        let temp = AchListLAATIMDone2.sort();
        let AchListLAATIMDone=  Array.from(new Set(temp));
        console.log(AchListLAATIMDone);
        var percentage = ((AchListLAATIMDone.length-2) * 100) / (AchlistLAATIM.length-1);
         if (percentage < "0"){
                percentage = 0
            }
        console.log(percentage);
        var elem = document.getElementById("BarAchLAATIM");   
        var width = 0;
        elem.style.width = percentage + "%"; 
        elem.innerHTML = percentage.toFixed() + "%";
        var AchListLAATIMTab = AchListLAATIMDone.slice(1,(AchListLAATIMDone.length));
        var AchListLAATIMTXT = AchListLAATIMTab.toString().split(",").join("<br/>");
        if (page==="LAATIMAch.html"){
            document.getElementById('LAATIMachDone').innerHTML = AchListLAATIMTXT.toString();
            var LAATIMLock = compare(AchlistLAATIM,AchListLAATIMDone);
           
            if (percentage <= "0"){
                document.getElementById('LAATIMachDone').innerHTML = "Aucun Achievements n'a encore était débloquer pour ce jeu"
            }
            if (percentage != "100")
            {
                document.getElementById('LAATIMach').innerHTML = LAATIMLock.toString().split(",").join('<br/>');
            } 
            else{
                document.getElementById('LAATIMach').innerHTML = "All Achievements are Unlocked"
            }
        }
    }
    if (page === "SNREAch.html" || page === "AchivementPage.html"){
        var AchlistSNRE = require('fs').readFileSync(__dirname+'/Achievements/SNRE/AllAchievements.txt','utf-8').split('\n');
        let AchListSNREDone2 =require('fs').readFileSync(homedir+"/Nytuo/Achievements/SNRE/AchDone.txt",'utf-8').split('\n');
        console.log(AchListSNREDone2);
        let temp = AchListSNREDone2.sort();
        let AchListSNREDone=  Array.from(new Set(temp));
        console.log(AchListSNREDone);
        var percentage = ((AchListSNREDone.length-2) * 100) / (AchlistSNRE.length-1);
         if (percentage < "0"){
                percentage = 0
            }
        console.log(percentage);
        var elem = document.getElementById("BarAchSNRE");   
        var width = 0;
        elem.style.width = percentage + "%"; 
        elem.innerHTML = percentage.toFixed() + "%";
        var AchListSNRETab = AchListSNREDone.slice(1,(AchListSNREDone.length));
        var AchListSNRETXT = AchListSNRETab.toString().split(",").join("<br/>");
        if (page==="SNREAch.html"){
            document.getElementById('SNREachDone').innerHTML = AchListSNRETXT.toString();
            var SNRELock = compare(AchlistSNRE,AchListSNREDone);
           
            if (percentage <= "0"){
                document.getElementById('SNREachDone').innerHTML = "Aucun Achievements n'a encore était débloquer pour ce jeu"
            }
            if (percentage != "100")
            {
                document.getElementById('SNREach').innerHTML = SNRELock.toString().split(",").join('<br/>');
            } 
            else{
                document.getElementById('SNREach').innerHTML = "All Achievements are Unlocked"
            }
        }
    }
}