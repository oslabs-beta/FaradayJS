const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'bridgeAPI',
    {
        incrementCount: () => {
            ipcRenderer.send('main:test')
        },
        openFile: () =>{
            ipcRenderer.send('main:open-file')
        },
        recieve: (channel:any, func:any) =>{
            let validChannels = ['preload:test'];
            console.log(validChannels)
            console.log(channel)
        }
    }
)


ipcRenderer.on('preload:open-file', (event, arg) => {
    console.log('preload:open-file')
    console.log(arg);
})