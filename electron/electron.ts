// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const electronReload = require('electron-reload')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    webPreferences: {
      preload: path.join(__dirname, '/preload.ts'),   

      nodeIntegration: true, //Electron applications can display remote websites. 
      //This gives a remote web page access to your local resources and potentially allows them to perform malicious activities.
      //That's why nodeIntegration is disabled. For fully offline applications, we need to enable Node.js support explicitly

      enableRemoteModule: true,
      contextIsolation: false,
    },
    //frame: false, // For snipping tools you don't want a frame
    //transparent: true,
    //titleBarStyle: 'hidden'
  })

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../index.html")}`
  )

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.