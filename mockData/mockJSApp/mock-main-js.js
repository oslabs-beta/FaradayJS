const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

const windows = new Set();
const openFiles = new Map();

let mainWindow = null;

const createWindow = exports.createWindow = () => {
    let x, y;

    const currentWindow = BrowserWindow.getFocusedWindow();

    if (currentWindow) {
        const [ currentWindowX, currentWindowY ] = currentWindow.getPosition();
        x = currentWindowX + 20;
        y = currentWindowY + 20;
    }
    
    let newWindow = new BrowserWindow({ 
        x,
        y,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    newWindow.loadFile('app/index.html');

    newWindow.once('ready-to-show', () => {
        newWindow.show();
        //mainWindow.webContents.openDevTools();
        //getFileFromUser();
    });

    newWindow.on('closed', () => {
        windows.delete(newWindow);
        stopWatchingFile(newWindow);
        newWindow = null;
    });

    newWindow.on('close', async event => {
        if (newWindow.isDocumentEdited()) {
            event.preventDefault();

            const result = await dialog.showMessageBox(newWindow, {
                type: 'warning',
                title: 'Quit with Unsaved Changes?',
                message: 'Your changes will be lost if you do not save.',
                buttons: [
                    'Quit Anyway',
                    'Cancel',
                ],
                defaultId: 0,
                cancelId: 1,
            });

            if (result.response === 0) newWindow.destroy();
        }
    });

    windows.add(newWindow);
    return newWindow;
}

app.on('ready', () => {
    createWindow();
});


const openFile = exports.openFile = (targetWindow, file) => {
    const content = fs.readFileSync(file).toString();
    startWatchingFile(targetWindow, file);
    app.addRecentDocument(file);
    targetWindow.setRepresentedFilename(file);
    if (!savedBySelfFlag) targetWindow.webContents.send('file-opened', file, content);
    else { savedBySelfFlag = false; }
};

const getFileFromUser = exports.getFileFromUser = async (targetWindow) => {
    const files = await dialog.showOpenDialog(targetWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'Markdown Files', extensions: ['md', 'markdown'] }
        ]
        // BUG: in macOS, only allows opening of Text Files unless user changes options
    });

    if (!files.canceled) { openFile(targetWindow, files.filePaths[0]); };
};

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        return false;
    }
    app.quit();
});

app.on('activate', (event, hasVisibleWindows) => {
    if (!hasVisibleWindows) createWindow();
});

app.on('will-finish-launching', () => {
    app.on('open-file', (event, file) => {
        const win = createWindow();
        win.once('ready-to-show', () => {
            openFile(win, file);
        })
    });
});

const saveHtml = exports.saveHtml = async (targetWindow, content) => {
    const file = await dialog.showSaveDialog(targetWindow, {
        title: 'Save HTML',
        defaultPath: app.getPath('documents'),
        filters: [
            { name: 'HTML Files', extensions: ['html', 'htm'] }
        ]
    });
    if (!file) return;

    fs.writeFileSync(file.filePath, content);
}

let savedBySelfFlag = false;

const saveMarkdown = exports.saveMarkdown = async (targetWindow, file, content) => {
    savedBySelfFlag = true;

    if (!file) {
        file = await dialog.showSaveDialog(targetWindow, {
            title: 'Save Markdown',
            defaultPath: app.getPath('documents'),
            filters: [
                { name: 'Markdown Files', extensions: ['md', 'markdown'] }
            ]
        });
        file = file.filePath;
    }
    if (!file) return;

    savedBySelfFlag = true;
    console.log('about to save', savedBySelfFlag);
    fs.writeFileSync(file, content);
    openFile(targetWindow, file);
};

let fsWait = false;

const startWatchingFile = (targetWindow, file) => {
    stopWatchingFile(targetWindow);
    console.log('watching', savedBySelfFlag);
    const watcher = fs.watch(file, (event) => {
        if (savedBySelfFlag) return;

        console.log(event, savedBySelfFlag);
        if (event === 'change') {
            if (fsWait) return;
            fsWait = true;
            setTimeout(() => {
                fsWait = false;
            }, 300);
            const content = fs.readFileSync(file).toString();
            targetWindow.webContents.send('file-changed', file, content);
        }
    });

    openFiles.set(targetWindow, watcher);
};

const stopWatchingFile = targetWindow => {
    if (openFiles.has(targetWindow)) {
        openFiles.get(targetWindow).close();
        console.log('stopped now');
        openFiles.delete(targetWindow);
    }
};