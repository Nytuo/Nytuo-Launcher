const {shell,webContents} = require('electron');
const {ipcRenderer} = require('electron');
const rimraf = require("rimraf");
const extract=require('extract-zip');
var request = require('request');
var fs =require('fs');
var app = require('electron').remote;
var dialog = app.dialog; 
const ws = require('windows-shortcuts');
var bigupdate = false;
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
if (isUp2date === true)
{
    refresh();
}
else
{
 window.location.href = "./index.html"
}
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

var only_one = false
function DownlaodVersion(file_url,targetPath){
    if(only_one === false)
    {
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
        showProgress(received_bytes, total_bytes);
    });
}
}

function DLVersions(){
    if (only_one===false){
        only_one=true
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
                isUp2date = false;
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
                if (fs.readFileSync(__dirname+'/VersionsFiles/LauncherUpdateType.txt').toString==="yes")
                {
                    bigupdate = true;
                }
                window.location.href = './updater.html'
            }
        }
    }
})();

function Updater(){
    isUp2date = false;
    if (process.platform === "win32")
    {
        if (bigupdate === false)
        {
            DownlaodFile('https://1drv.ws/u/s!AkkqGntQc7Y5hJsEjXILLAN5SKmK7g?e=RbfebR',__dirname+'/Update.zip',__dirname)
        }
        else
        {
            DownlaodFile('https://1drv.ws/u/s!AkkqGntQc7Y5hJsDDGucJJ__2ryiUA?e=zeijLG',__dirname+'/Update.zip',__dirname)
            shell.openItem(__dirname+'/Nytuo Launcher Setup '+fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString()+'.exe')
        }
    } 
    if (process.platform === "linux")
    {
        if (bigupdate === false)
        {
            DL('https://1drv.ws/u/s!AkkqGntQc7Y5hJsFg8wgs12cJMiKWw?e=IFQjXJ',__dirname+'/Update.zip',__dirname)
        }
        else
        {
            DL('https://1drv.ws/u/s!AkkqGntQc7Y5hJsGgVJ-WINxz-jfVQ?e=AqpBKh',__dirname+'/Update.zip',__dirname)
            shell.openItem(__dirname+'/Nytuo Launcher Setup '+fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString()+'.appimage')
        }
    }
    if (process.platform === "darwin")
    {
        if (bigupdate === false)
        {
            DL('https://1drv.ws/u/s!AkkqGntQc7Y5hJsIU0MaYAVDrJa_ig?e=lX4Dnv',__dirname+'/Update.zip',__dirname)
        }
        else
        {
            DL('https://1drv.ws/u/s!AkkqGntQc7Y5hJsHrdjh7vcEs41iyw?e=d7euDn',__dirname+'/Update.zip',__dirname)
            shell.openItem(__dirname+'/Nytuo Launcher Setup '+fs.readFileSync(__dirname+'/VersionsFiles/LauncherVersion.txt').toString()+'.')
        }
    }
}