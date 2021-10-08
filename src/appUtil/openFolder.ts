const fs = require('fs')
import { dialog } from 'electron';

const OpenFolder = async (win:any, doInclude:string[], doNotInclude:string[]) => {
  try {
    const folders: Promise<Electron.OpenDialogReturnValue> | Boolean | String = dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    });
    
    const folder = await folders; // // returns {canceled: false, filePaths: [ 'D:\\Codesmith\\Projects\\TestElectron' ]}

    const returnValue: any = {};
    returnValue.fileObjectArray = [];
    returnValue.packageJsonContents = '';

    const readAllFolder = async (dirMain: string) => {
      
      const readDirMain = fs.readdirSync(dirMain);

      readDirMain.forEach(async (dirNext: string) => {
        const nextDirectory = dirMain + "/" + dirNext;
        if (fs.lstatSync(nextDirectory).isDirectory()) {
          readAllFolder(nextDirectory);
        } else {
          if (doInclude.some(el=>nextDirectory.includes(el)) && !doNotInclude.some(el=>nextDirectory.includes(el))){
            const fileContent = fs.readFileSync(nextDirectory).toString();
            const fileObj: any = {
              path: dirMain + '/', //process.platform === 'darwin' ? '/' : '\\',
              fileName: dirNext,
              contents: fileContent
            }
            returnValue.fileObjectArray.push(fileObj);
          } else if (nextDirectory.includes('package.json')){
            returnValue.packageJsonContents = await fs.readFileSync(nextDirectory).toString();
          }
        }
      });
      return returnValue;
    }

    if(folder.canceled){
      return
    }else{
      return await readAllFolder(folder.filePaths[0]);
    }

  } catch(err){
    console.log('Open Folder Error: ', err);
  }
}

export default OpenFolder