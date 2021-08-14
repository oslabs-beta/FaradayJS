const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'bridgeAPI',
    {
        incrementCount: () => {
            ipcRenderer.send('main:test')
        },
        openFile: () =>{
            ipcRenderer.send('main:open-file')
        }
    }
)

ipcRenderer.on('preload:set-count', (event, newCount) => {
    console.log("preload:set-count")
})