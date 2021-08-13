import { app, BrowserWindow } from 'electron';
const path = require('path')

const createWindow = (): void => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  //console.log(path.join(__dirname, './renderer/index.html'))
  win.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.on('ready', createWindow);