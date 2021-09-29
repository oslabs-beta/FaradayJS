const settingsInfo :  { [key: string]: any } = {
    // https://www.electronjs.org/docs/api/browser-window

    // ***************************************************************************
    // Found in HTML
    "allowpopups": {
        "failValue": true,
        "description": "New windows will use BrowserWindows using window.open(). If you are not using them, it's best not to enable them."
    },
    "disablewebsecurity": {
        "failValue": true,
        "description": "Disables same-origin policy and sets allwRunningInsecureContent to true."
    },
    // ***************************************************************************
    // Found in JS/TS Files
    "webSecurity": {
        "failValue": false,
        "description": "Disables same-origin policy and sets allwRunningInsecureContent to true."
    },
    "sandbox": {
        "failValue": false,
        "description": "Chromium feature that uses the operating system to significantly limit what renderer processes have access to."
    },
    "allowRunningInsecureContent": {
        "failValue": true,
        "description": "Disables default electron settings that prohibit websites loaded over secure sources (HTTPS) to load and execute scripts, CSS, or plugins from insecure sources (HTTP)."
    },
    "enableBlinkFeatures": {
        // Can have many different values. Property is ideally not declared in files unless there's a clear purpose
        // If this is declared in application then it fails this test, regardless of what it's set to
        "failValue": true, 
        "description": "Blink is Chromium's rendering engine which enables security features previously disabled by default for security purposes."
    },
    "experimentalFeatures": {
        "failValue": true,
        "description": "The impact of experimentalFeatures on Electron applications has not been tested. If not strictly required do not enable."
    },
    // ********************************************************************************************************
    // TO RESEARCH

    // Enabled by default since Electron 12>=
    "contextIsolation": {
        "failValue": false,
        "description": "Ensures that the preload scripts and the internal logic of your app run in a separate context to the websites loaded in webContents."
    },
    // Disabled by default since Electron 10>=
    "enableRemoteModule": {
        "failValue": true,
        "description": "Renders sandboxing your renderer useless. Renderer is only as secure as the main process keeps it in check."
    },

    "images": {
        "failValue": null,
        "description": "none"
    },
    "javascript": {
         "failValue": null,
         "description": "none"
    },
    "nativeWindowOpen": {
        "failValue": null,
        "description": "When set to false window.open results in the creation of a BrowserWindowProxy wrapper around BrowserWindow. Electron pairs the native Chrome window with a BrowserWindow under the hood."
    },
    "navigateOnDragDrop": {
        "failValue": null,
        "description": "none"
    },
    "nodeIntegration": {
        "failValue": true,
        "description": "Enables/disables the use of NodeJS "
    },
    "nodeIntegrationInWorker": {
        "failValue": true,
        "description": "none"
    },
    "offscreen": {
        "failValue": null,
        "description": "none"
    },
    "plugins": {
        "failValue": true,
        "description": "none"
    },
    "safeDialogs": {
        "failValue": true,
        "description": "none"
    },
    "spellcheck": {
        "failValue": null,
        "description": "none"
    },
    "textAreasAreResizable": {
        "failValue": null,
        "description": "none"
    },
    // https://security.stackexchange.com/questions/13799/is-webgl-a-security-concern
    "webgl": {
        "failValue": true,
        "description": "WebGL is a JS API used to render interactive graphics. It allows direct access to the GPU, so while it can be a potential security  concern, most browsers ensure that running your code will not be a major security issue."
    },
    // Disabled as of Version 5>=
    // <webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
    // <webview src="http://www.google.com/" nodeintegration></webview>
    // can also set within this tag: plugins, preload, disablewebsecurity, allowpopups, webpreferences, partition, useragent
    // enableblinkfeatures, disableblinkfeatures
    // has methods: loadURL(), downloadURL(), getURL(), getTitle(), isLoading(), isLoadingMainFraim(), isWaitingForResponse(),
    // stop(), reload(), reloadIgnoringCache(),......... and MANY MORE
    // https://www.electronjs.org/docs/api/webview-tag
    "webviewTag": {
        "failValue": true,
        "description": "Used to embed guest content in your application, this tags runs in a separate process than your application and would normally be safe to use, but as it is based on Chromiums webview, which is undergoing major structural changes it is not recommended to use this tag at this time."
    },
    "enableWebSQL": {
        "failValue": null,
        "description": "none"
    },
    "nodeIntegrationInSubFrames": {
        "failValue": true,
        "description": "none"
    }

}
export default settingsInfo