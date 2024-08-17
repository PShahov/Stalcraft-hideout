const path = require('path');
const url = require('url');
const electron = require('electron')
const {app, BrowserWindow, screen, globalShortcut} = electron;

const w = "wasd";

const _INDEV = false;

let win;

function createWindow(){
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    win = new BrowserWindow({
        width,
        height,
        icon: __dirname + "/img/icon.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: __dirname + "/const.js",
            
            enableRemoteModule: true,
            nodeIntegrationInSubFrames:true, //for subContent nodeIntegration Enable
            webviewTag:true //for webView
        }
        // webPreferences: {
        //     nodeIntegration: true,
        //     contextIsolation: false,
        //     nativeWindowOpen: true,
        //     enableRemoteModule: true,
        //     sandbox:false,
        //     nodeIntegrationInSubFrames:true, //for subContent nodeIntegration Enable
        //     webviewTag:true //for webView
        //   }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, "perks.html"),
        protocol: "file",
        slashes: true
    }));

    // win.removeMenu();
    win.maximize();

    if(_INDEV)
        win.webContents.openDevTools();

    win.on("closed",()=>{
        win = null;
    });

    
}

app.on('browser-window-focus', () => {
    if(!_INDEV){
        globalShortcut.register('r', function() {
            win.reload();
        })
    }
  })
  
  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })

app.on("ready", createWindow);

app.on("window-all-closed",()=>{
    app.quit();
})