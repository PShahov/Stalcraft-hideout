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
            preload: __dirname + "/const.js"
        }
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

    
	globalShortcut.register('r', function() {
		console.log('f5 is pressed');
		win.reload();
	})
}

app.on("ready", createWindow);

app.on("window-all-closed",()=>{
    app.quit();
})