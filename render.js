
const db = require('./const.js');
const helper = require('./helper.js');
module.exports.db = db;
module.exports.helper = helper;


const ipcRenderer = require("electron").ipcRenderer;

// renderer
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  if(e.target.hasAttribute("craft-item-id")){
    ipcRenderer.send('show-context-menu', "craftable-item", e.target.getAttribute("craft-item-id"))
    
  }
})
  
ipcRenderer.on('craftable-item--context-menu-command', (e, command, ...args) => {
  switch(command){
      case "wiki":{
          helper.openWiki(args[0]);
        break;
      }
    }
})
