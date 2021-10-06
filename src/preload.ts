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
            let validChannels = ['preload:open-folder', 'preload:refreshed-obj'];
            if(validChannels.includes(channel)){
                ipcRenderer.once(channel, (event, ...args)=>func(...args))
            }
        },
        changeValue: (args:any) =>{
            ipcRenderer.send('main:change-value', args)
        },
        refreshCode: (args:any) =>{
            ipcRenderer.send('main:refresh-code', args)
        },
        addIgnore:(args:any)=>{
            ipcRenderer.send('main:addIgnore', args)
        },
        removeIgnore:(args:string)=>{
            ipcRenderer.send('main:removeIgnore', args)
        }
    }
)
