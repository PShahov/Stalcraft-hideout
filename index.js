const path = require('path');
const url = require('url');
const electron = require('electron')
const {app, BrowserWindow, screen, globalShortcut, Menu} = electron;

const w = "wasd";

const _INDEV = false;

let win;


  
const ipcMain = require("electron").ipcMain;
// main
ipcMain.on('show-context-menu', (event, ...args) => {
    console.log(args);
    switch(args[0]){
        case "craftable-item":{
            console.log("1");
            const template = [
                {
                    label: 'Wiki',
                    click: () => { event.sender.send('craftable-item--context-menu-command', "wiki", args[1]) }
                },
                {
                    label: 'Крафт-карта',
                    click: () => { event.sender.send('craftable-item--context-menu-command', 'map', args[1]) }
                },
            ]
            const menu = Menu.buildFromTemplate(template)
            menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
            break;
        }
        default:{
            console.log("2");
            const template = [
                {
                    label: 'Menu Item 1',
                    click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
                },
                { type: 'separator' },
                { label: 'Menu Item 2', type: 'checkbox', checked: true }
            ]
            const menu = Menu.buildFromTemplate(template)
            menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
            break;
        }
    }
})

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
        globalShortcut.register('f5', function() {
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