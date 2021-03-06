import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { parser, htmlparser } from './appUtil/parser'
import checker from './appUtil/checker'
import traverser from './appUtil/tsestraverse';
import versionFinder from './appUtil/versionFinder';
import menuTemplate from './appUtil/menuTemplate';
import tsmorph from './appUtil/tsmorph';
import OpenFolder from './appUtil/openFolder';
import {doInclude, doNotInclude} from './appUtil/ignoreArr'

const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')

let win: BrowserWindow;

const options = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: false,
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
      event.reply('preload:open-file', result)
    }catch(err){
      console.log(err)
    }
  })

  ipcMain.on('main:change-value', async(event, payload)=>{
    tsmorph(payload[0]+payload[1], payload[2], payload[3])
  })

  ipcMain.on('main:open-folder', async (event, payload)=>{
    try{
      const rawResult: any = await OpenFolder(win, doInclude,doNotInclude);
      let processedResult;
      if(rawResult) processedResult = await processCodeBase(rawResult);
      event.sender.send('preload:open-folder', processedResult);
    } catch (e) {
      console.log('Open Folder Error: ', e);
    }
  })

  ipcMain.on('main:refresh-code', async (event, payload)=>{
    try{
      let refreshedObj = await refreshCode(payload[0]+payload[1], payload[2]);
      event.sender.send('preload:refreshed-obj', refreshedObj)
    }catch(e){
      console.log('Refresh Error ', e)
    }
  })

  ipcMain.on('main:addIgnore', async(event, payload:string[])=>{
    payload.forEach(x=>{
      if(!doNotInclude.includes(x) && x !== undefined){
        doNotInclude.push(x)
      }
    })
  })

  ipcMain.on('main:removeIgnore', async(event, payload:string)=>{
    const index = doNotInclude.indexOf(payload);
    doNotInclude.splice(index, 1);
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
    properties: ['openFile', 'multiSelections'],
  })

  // If no files
  if (!files) return;

  const file = await files; // Grabbing first item in the array. files(dialog.showOpenDialog) returns the absoulte path to the selected file
  if (file) { // !! ensures the resulting type is a boolean
    //console.log(file)
  };

}

const reOrderTests = async (resultsArr: any) => {
  const reorderedTests: Array<any> = [];
  for(let i = 0; i < resultsArr.length; i++){
    if(resultsArr[i].fileResults["status"] == "fail" || resultsArr[i].fileResults["status"] == "fail by default") {
      reorderedTests.push(resultsArr[i]);
    }
  }
  for(let i = 0; i < resultsArr.length; i++){
    if(resultsArr[i].fileResults["status"] == "pass" || resultsArr[i].fileResults["status"] == "pass by default") {
      reorderedTests.push(resultsArr[i]);
    }
  }
  return reorderedTests;
}

const processCodeBase = async (codebaseObj:any) => {
  try {
    let version = 13;
    if(codebaseObj.packageJsonContents){
      version = await versionFinder(JSON.parse(codebaseObj.packageJsonContents))
    }
    let rawTestResults: any[] = [];
    let traversedAstNodes: any = {};

    const addFileNamesToResultsArray: any = (resultsArray: any, file: number) => {
      resultsArray.forEach((resultObj: any) => {
        rawTestResults.push({
          fileResults: resultObj,
          fileName: codebaseObj.fileObjectArray[file].fileName,
          filePath: codebaseObj.fileObjectArray[file].path
        });
      });
    }
    
    for (let i = 0; i < codebaseObj.fileObjectArray.length; i++) {
      if(codebaseObj.fileObjectArray[i].fileName.includes('.html')){
        const htmlFileResultsArray: any = await htmlparser(codebaseObj.fileObjectArray[i].contents);
        addFileNamesToResultsArray(htmlFileResultsArray, i);
      }else{
        const ast: any = await parser(codebaseObj.fileObjectArray[i].contents);
        traversedAstNodes = await traverser(ast);
        if(traversedAstNodes.hasOwnProperty('webPreferences')){
          const fileResultsArray: any = checker(traversedAstNodes, version);
          addFileNamesToResultsArray(fileResultsArray, i);
        }
      }
   }

   const reorderedTests: any = await reOrderTests(rawTestResults);
  return reorderedTests;
  }catch(err){
    console.log('ProcessCodeBase: ', err)
  }
} 

const refreshCode = async (path:string, passedTestProp:string) => {
  let version = 13;
  const fileContent = await fs.readFileSync(path).toString();
  const ast:any = await parser(fileContent);
  let traversedAstNodes  = await traverser(ast);
  const fileResultsArray: any = await checker([traversedAstNodes], version);
  for(let i = 0; i<fileResultsArray.length; i++){
    if(fileResultsArray[i].testProp === passedTestProp){
      var refreshedResult = fileResultsArray[i];
    }
  }
  return refreshedResult;
}