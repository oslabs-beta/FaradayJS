const { contextBridge, ipcRenderer, dialog, ipcMain } = require('electron')

contextBridge.exposeInMainWorld(
    'bridgeAPI',
    {
        openFile: () =>{
            ipcRenderer.send('main:open-file')
        },
        openFolder: ()=>{
            ipcRenderer.send('main:open-folder')
        },
        receiveData: (channel:any, func:any) =>{
            let validChannels = ['preload:open-folder'];
            if(validChannels.includes(channel)){
                ipcRenderer.once(channel, (event, ...args)=>func(...args))
            }
        },
        changeValue: (args:any) =>{
            ipcRenderer.send('main:change-value', args)
        }
    }
)
