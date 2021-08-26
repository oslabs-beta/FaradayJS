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
        }
    }
)

contextBridge.exposeInMainWorld(
    'API',
    {
        incrementCount:()=>{
            ipcRenderer.send('main:test',{})
            
        },
        receiveCount: (channel:any, func:any) =>{
            let validChannels = ["preload:test"];
            if (validChannels.includes(channel)) {
                ipcRenderer.once(channel, (event, ...args) => func(...args))
            }
        },
    }
)

// ipcRenderer.on('preload:open-file', (event, arg) => {
//     console.log('preload:open-file')
//     //@ts-expect-error
//     document.getElementById('hello').innerHTML = arg
// })

// ipcRenderer.on('preload:open-folder', (event, arg)=>{
//     console.log('arg is ', arg);
//     //@ts-expect-error
//     document.getElementById('results').innerHTML = arg;
// })
