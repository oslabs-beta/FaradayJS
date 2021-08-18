import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')

let win: BrowserWindow;

const createWindow = (): void => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  //Both methods work
  win.loadFile(path.join(__dirname, './index.html'));
  //win.loadURL(`file://${path.join(__dirname, "index.html")}`)



  ipcMain.on('main:open-file', async (event, payload)=>{
    try{
      const result = await OpenFile();
      //console.log(result)

      event.reply('preload:open-file', result)

    }catch(err){
      console.log(err)
    }
  })

  ipcMain.on('main:test', (event, payload)=>{
    console.log('this is main')
    //dialog.showErrorBox('Hello', "This is a test")
    //win.webContents.on('dom-ready', ()=>{
      event.sender.send('preload:test', 'sdsdsdsdsdsd')
      //win.webContents.send('preload:test', 'dfjifodff')
    // })
  })

  ipcMain.on('main:open-folder', async (event, payload)=>{

      const result = await OpenFolder();
      event.sender.send('preload:open-folder', result)

  })


  const isMac = process.platform === 'darwin'  

  const template: any = [
    {
      label: 'File',
      submenu: [
        {
          label: "Open File",
          accelerator: 'CmdOrCtrl+O',
          click: ()=>{
             OpenFile();
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
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startSpeaking' },
              { role: 'stopSpeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    },
    {
      label: 'Developer',
      submenu:[
        {
          label: 'Toggle Developer Tools', 
          accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: ()=>{
            win.webContents.toggleDevTools();
          }
        }
      ]
    }
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
      name: 'JS/TS files',
      extensions: ['ts', 'tsx', 'js', 'jsx']
    }]
  })

  // If no files
  if(!files) return;

  const file = await files ; // Grabbing first item in the array. files(dialog.showOpenDialog) returns the absoulte path to the selected file
  if(file) { // !! ensures the resulting type is a boolean
    const fileContent = fs.readFileSync(file.filePaths[0]).toString() //toString() to read contents as string
    return fileContent;
  }; 
}

const OpenFolder = async()=>{
  try{
    
    const folders: Promise<Electron.OpenDialogReturnValue> | Boolean | String = dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    })
    if(!folders) return;
    const folder = await folders; // // returns {canceled: false, filePaths: [ 'D:\\Codesmith\\Projects\\TestElectron' ]}

    const readAllFolder = (dirMain:string) =>{
      const readDirMain = fs.readdirSync(dirMain);
      const temparr:string[] = [];
      //console.log(dirMain);
      //console.log(readDirMain);

      readDirMain.forEach((dirNext:string)=>{
        //console.log(dirNext, fs.lstatSync(dirMain + "/" + dirNext).isDirectory());
        if (fs.lstatSync(dirMain + "/" + dirNext).isDirectory()) {
          readAllFolder(dirMain + "/" + dirNext);
        }else{
          const fileContent = fs.readFileSync(dirMain + "/" + dirNext).toString();
          //console.log(fileContent)
          temparr.push(fileContent)
        }
      })
      return temparr;
    }

    const result = await readAllFolder(folder.filePaths[0])
    return result;
  }catch(err){
    console.log(err)
  }
}

