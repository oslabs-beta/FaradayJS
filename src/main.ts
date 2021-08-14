import { app, BrowserWindow, ipcMain, dialog } from 'electron';
const path = require('path')

const createWindow = (): void => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  });

  win.loadFile(path.join(__dirname, './index.html'));

  ipcMain.on('main:test', ()=>{
    dialog.showErrorBox('Hello', "This is a test")
  })
}

app.on('ready', createWindow);

