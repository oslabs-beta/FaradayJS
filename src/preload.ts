const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'bridgeAPI',
    {
        incrementCount: () => {
            ipcRenderer.send('main:test')
        },
    }
)

ipcRenderer.on('preload:set-count', (event, newCount) => {
    console.log("preload:set-count")
})