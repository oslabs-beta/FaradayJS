import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')
const {arr} = require('./appUtil/menu')

let win: BrowserWindow;

const createWindow = (): void => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  });

  //Both methods work
  win.loadFile(path.join(__dirname, './index.html'));
  //win.loadURL(`file://${path.join(__dirname, "index.html")}`)

  ipcMain.on('main:test', ()=>{
    dialog.showErrorBox('Hello', "This is a test")
  })

  ipcMain.on('main:open-file', ()=>{
    OpenFile();
  })


  const isMac = process.platform === 'darwin'  

  const template: any = [
    {
      label: 'File',
      submenu: [
        {
          label: "Open File",
          accelerator: 'CmdOrCtrl+O',
          click:()=>{
            OpenFile()
          }
        },
        {label: "Open Folder"},
        isMac ? { role: 'close' } : { role: 'quit' },
        {type:'separator'},
        {
          label: 'test-1',
          submenu: [{label: 'test-2'}]
        }
      ]
    },
    ...arr
  ]
  

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

}




app.on('ready', createWindow);


// Open File Function
const OpenFile = async () =>{
  // Opens file dialog looking for markdown extension
  const files: Promise<Electron.OpenDialogReturnValue> | Boolean | String = dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [{
      name: 'Markdown',
      extensions: ['md', 'markdown', 'txt']
    }]
  })

  // If no files
  if(!files) return;



  const file = await files ; // Grabbing first item in the array. files(dialog.showOpenDialog) returns the absoulte path to the selected file
  if(file) { // !! ensures the resulting type is a boolean
    const fileContent = fs.readFileSync(file.filePaths[0]).toString() //toString() to read contents as string
    console.log(fileContent)
  }; 
}