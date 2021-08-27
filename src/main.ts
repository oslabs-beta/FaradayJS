import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import {parser, htmlparser} from './appUtil/parser'
import checker from './appUtil/checker'
import traverser from './appUtil/tsestraverse';
import versionFinder from './appUtil/versionFinder';
import menuTemplate from './appUtil/menuTemplate';

const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')

let win: BrowserWindow;

const options = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, "preload.js")
  }
}

const createWindow = (): void => {
  win = new BrowserWindow(options
  );

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
    event.sender.send('preload:test', 'sdsdsdsdsdsd')

  })



  ipcMain.on('main:open-folder', async (event, payload)=>{
    try{
      const rawResult: any = await OpenFolder();
      const processedResult = await processCodeBase(rawResult);
      const jsondResult = JSON.stringify(processedResult);
      console.log('ProcessedResult: ', processedResult);
      event.sender.send('preload:open-folder', processedResult);
    } catch (e) {
      console.log('Open Folder Error: ', e);
    }

  })


  const isMac = process.platform === 'darwin'  
  const template: any = menuTemplate(win);
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

    
    const folder = await folders; // // returns {canceled: false, filePaths: [ 'D:\\Codesmith\\Projects\\TestElectron' ]}
    const returnValue: any = {};
    returnValue.fileObjectArray = [];
    returnValue.packageJsonContents = '';

    const readAllFolder = async (dirMain: string) => {
      
      const readDirMain = fs.readdirSync(dirMain);

      readDirMain.forEach(async (dirNext: string) => {
        if (fs.lstatSync(dirMain + "/" + dirNext).isDirectory()) {
          readAllFolder(dirMain + "/" + dirNext);
        } else {
          if (
            ((dirMain + "/" + dirNext).includes('.js') ||
            (dirMain + "/" + dirNext).includes('.jsx') ||
            (dirMain + "/" + dirNext).includes('.ts') ||
            (dirMain + "/" + dirNext).includes('.tsx') ||
            (dirMain + "/" + dirNext).includes('.html')) &&
            !(dirMain + "/" + dirNext).includes(".vscode") &&
            !(dirMain + "/" + dirNext).includes(".json") && 
            !(dirMain + "/" + dirNext).includes("node_modules") &&
            !(dirMain + "/" + dirNext).includes(".txt") &&
            !(dirMain + "/" + dirNext).includes("dist") &&
            !(dirMain + "/" + dirNext).includes("build")
            ){
            const fileContent = fs.readFileSync(dirMain + "/" + dirNext).toString();
            const fileObj: any = {
              path: dirMain + "/",
              fileName: dirNext,
              contents: fileContent
            }
            returnValue.fileObjectArray.push(fileObj);
          } else if ((dirMain + "/" + dirNext).includes('package.json')){
            returnValue.packageJsonContents = await fs.readFileSync(dirMain + "/" + dirNext).toString();
          }
        }
      });
      return returnValue;
    }

    return await readAllFolder(folder.filePaths[0]);
  } catch(err){
    console.log('Open Folder Error: ', err);
  }
}

const processCodeBase = async (codebaseObj:any) => {
  try {
    const version = await versionFinder(JSON.parse(codebaseObj.packageJsonContents));  
    let rawTestResults: any[] = [];
    let traversedAstNodes: any = {};
    for (let i = 0; i < codebaseObj.fileObjectArray.length; i++) {
      if(codebaseObj.fileObjectArray[i].fileName.includes('.html')){
        htmlparser(codebaseObj.fileObjectArray[i].contents)
      }else{
        const ast: any = await parser(codebaseObj.fileObjectArray[i].contents);
        traversedAstNodes = await traverser(ast);
        if(traversedAstNodes.hasOwnProperty('webPreferences')){
          rawTestResults.push({
            fileResults: checker(traversedAstNodes, version),
            fileName: codebaseObj.fileObjectArray[i].fileName,
            filePath: codebaseObj.fileObjectArray[i].path
          });
        }
      }
   }
   //console.log('Raw After ProcessCodeBase: ', rawTestResults);
   return rawTestResults;
  }catch(err){
    console.log('ProcessCodeBase: ', err)
  }

} 