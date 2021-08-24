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
    //console.log('this is main')
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

  const template: any = [...menuTemplate]
  

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
    
    const temparr:string[] = [];
    const tempHTMLarr:string[] = [];
    let tempPackageJsonarr:string = '';
    const folderLoc:string[] = [];

    const folder = await folders; // // returns {canceled: false, filePaths: [ 'D:\\Codesmith\\Projects\\TestElectron' ]}
      
    const readAllFolder = (dirMain:string) =>{
      const readDirMain = fs.readdirSync(dirMain);
      

      readDirMain.forEach(async (dirNext:string)=>{
        //console.log(dirNext, fs.lstatSync(dirMain + "/" + dirNext).isDirectory());
        if (fs.lstatSync(dirMain + "/" + dirNext).isDirectory()) {
          readAllFolder(dirMain + "/" + dirNext);
        }else{
          if(
            ((dirMain + "/" + dirNext).includes('.js') ||
            (dirMain + "/" + dirNext).includes('.jsx') ||
            (dirMain + "/" + dirNext).includes('.ts') ||
            (dirMain + "/" + dirNext).includes('.tsx')) &&
            !(dirMain + "/" + dirNext).includes(".vscode") &&
            !(dirMain + "/" + dirNext).includes(".json") && 
            !(dirMain + "/" + dirNext).includes("node_modules") &&
            !(dirMain + "/" + dirNext).includes(".txt") &&
            !(dirMain + "/" + dirNext).includes("dist") && // Hard coded to ignore dist and build folder. Gotta find a way to not hard code
            !(dirMain + "/" + dirNext).includes("build")
          ){
            folderLoc.push(dirMain+"/"+dirNext)
            const fileContent = fs.readFileSync(dirMain + "/" + dirNext).toString();
            temparr.push(fileContent)
          }else if((dirMain + "/" + dirNext).includes('.html')){
            const fileContentHTML = fs.readFileSync(dirMain + "/" + dirNext).toString();
            tempHTMLarr.push(fileContentHTML)
          }else if ((dirMain + "/" + dirNext).includes('package.json')){
            const fileContentPackageJson = await fs.readFileSync(dirMain + "/" + dirNext).toString();
            tempPackageJsonarr = fileContentPackageJson
          }
        }
      })
      return temparr;
    }

    await readAllFolder(folder.filePaths[0])

    let resultObj;


    for(let i = 0; i<temparr.length;i++){
        const ast = parser(temparr[i])
        ast.location = folderLoc[i]
        //console.log(ast)
        resultObj = await traverser(ast)
        //console.log(resultObj)
        checker(resultObj, 10) // [config, your electron config, default safe one]
    }
    for(let i = 0; i<tempHTMLarr.length; i++){
      const astHTML = htmlparser(tempHTMLarr[i])
    }

    //const astPackageJson = JSON.parse(tempPackageJsonarr);
    const version = versionFinder(JSON.parse(tempPackageJsonarr));

    return 'Compiled List';
  }catch(err){
    console.log(err)
  }
}

