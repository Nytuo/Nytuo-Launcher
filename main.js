const { app, BrowserWindow,ipcMain,ipcRenderer,webContents} = require('electron')
const {autoUpdater} = require('electron-updater')
const {download}= require('electron-dl')
const path = require('path')
var fs=require('fs')
var request = require('request')
function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    
    minWidth: 980,
    minHeight:480,
    width: 980,
    height: 480,
    icon : path.join(__dirname,'Ressources/logoexp.png'),
    webPreferences: {
      nodeIntegration: true
    },

  })

  // and load the index.html of the app.
  win.loadFile('index.html')
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
  if (!fs.existsSync(__dirname+'/VersionsFiles'))fs.mkdirSync(__dirname+'/VersionsFiles', { recursive: true });
  if (process.platform === "linux"){alert("Pour lancer un jeu vous devez lui accorder des permisions(pour chaque jeu) et l'ouvrir par defaut avec l'émulateur de terminale(une seul fois).Référer vous à l'aide disponible sur mon site.")}
}

app.on('ready', createWindow,function(){
  console.log(app.getVersion())
  autoUpdater.checkForUpdatesAndNotify()
})
let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
app.setAsDefaultProtocolClient('Nytuo');
app.once('before-quit',()=>{ipcRenderer.removeAllListeners('close');});