import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import parser from './appUtil/parser'
//import traverser from './appUtil/traverse'
import checker from './appUtil/checker'
import traverser from './appUtil/tsestraverse';

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
    try{
      const rawResult: any = await OpenFolder();
      const finalResult = JSON.stringify(interpretRawTestResults(rawResult));
      event.sender.send('preload:open-folder', finalResult);
    } catch (e) {
      console.log('Open Folder Error: ', e);
    }

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
const OpenFile = async () => {
  // Opens file dialog looking for markdown extension
  const files: Promise<Electron.OpenDialogReturnValue> | Boolean | String = dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [{
      name: 'JS/TS files',
      extensions: ['ts', 'tsx', 'js', 'jsx']
    }]
  })

  // If no files
  if (!files) return;

  const file = await files; // Grabbing first item in the array. files(dialog.showOpenDialog) returns the absoulte path to the selected file
  if (file) { // !! ensures the resulting type is a boolean
    const fileContent = fs.readFileSync(file.filePaths[0]).toString() //toString() to read contents as string
    return fileContent;
  };
}

const OpenFolder = async () => {
  try {

    const folders: Promise<Electron.OpenDialogReturnValue> | Boolean | String = dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    });

    if (!folders) return;

    const temparr: any[] = [];

    const folder = await folders; // // returns {canceled: false, filePaths: [ 'D:\\Codesmith\\Projects\\TestElectron' ]}

    //console.log("made it this far.....");

    const readAllFolder = async (dirMain: string) => {
      const readDirMain = fs.readdirSync(dirMain);

      //console.log(dirMain);
      //console.log(readDirMain);

      readDirMain.forEach((dirNext: string) => {
        //console.log(dirNext, fs.lstatSync(dirMain + "/" + dirNext).isDirectory());
        if (fs.lstatSync(dirMain + "/" + dirNext).isDirectory()) {
          readAllFolder(dirMain + "/" + dirNext);
        } else {
          if ((!(dirMain + "/" + dirNext).includes('.eslintrc')) && (!(dirMain + "/" + dirNext).includes('.html'))) {
            //console.log(dirMain+"/"+dirNext)
            const fileContent = fs.readFileSync(dirMain + "/" + dirNext).toString();
            const fileObj: any = {
              name: dirNext,
              contents: fileContent
            }
            temparr.push(fileObj);
          }
        }
        //console.log(dirMain+"/"+dirNext)
      });
      return temparr;
    }

    const result: any[] = await readAllFolder(folder.filePaths[0]);
   // console.log("made it this far too.....");

    let rawTestResults: any[] = [];
    let resultObj: any = {};
    for (let i = 0; i < result.length; i++) {
      //   //console.log(parser(result[i]))
      //   if(!result[i].includes("react")){
          const ast: any = parser(result[i].contents);
         // console.log("ast here");
          resultObj = traverser(ast);
          rawTestResults.push({
            fileResults: checker(resultObj, 10),
            filename: result[i].name,
          });
          //console.log("checked this one");
    }
    console.log('Raw: ', rawTestResults);
    return rawTestResults;
  } catch(err) {
    console.log(err);
    return [];
  }
}

const interpretRawTestResults = (rawResults: any[]) => {
  const finalTestResults: any = {};

  // Step 1: consolidate results by test
  rawResults.forEach(test => {
    if (!finalTestResults.hasOwnProperty(test.fileResults.testProp)) {
      finalTestResults[test.fileResults.testProp] = test;
    } else if (finalTestResults[test.fileResults.testProp].status !== 'fail') { // TO THINK ABOUT: what if it fails the same test in multiple files?
      if (test.fileResults.status === 'fail') {
        finalTestResults[test.fileResults.testProp] = test; // overwrite file result with different status
      }
    }
  });
  // Step 3: Push final result object to finalTestResults
  // Step 4: return finalTestResults array to pass to react rendering side of application
 // console.log(finalTestResults);
  return finalTestResults;
}