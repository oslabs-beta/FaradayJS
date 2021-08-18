const { contextBridge, ipcRenderer, dialog } = require('electron')

contextBridge.exposeInMainWorld(
    'bridgeAPI',
    {
        incrementCount: () => {
            ipcRenderer.send('main:test', {})
        },
        openFile: () =>{
            ipcRenderer.send('main:open-file')
        }
    }
)

ipcRenderer.on('preload:open-file', (event, arg) => {
    console.log('preload:open-file')
    //@ts-expect-error
    document.getElementById('hello').innerHTML = arg
})

ipcRenderer.on('preload:test', (event, arg)=>{
    console.log('this is preload3')
    //dialog.showErrorBox('Hello', "This is a test")
    //@ts-expect-error
    document.getElementById('hello').innerHTML = "dasdsdsds5gh45g5"
})