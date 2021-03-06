const settingsInfo :  { [key: string]: any } = {
    // https://www.electronjs.org/docs/api/browser-window

    // ***************************************************************************
    // Found in HTML
    "allowpopups": {
        "failValue": true,
        "description": "New windows will open a BrowserWindow using window.open() when nativeWindowOpen is set to true and create a BrowserWindowProxy when nativeWindowOpen is set to false. BrowserWindow by default has complete access to the Node API. Allowing popups and loading insecure content in your application can pose security risks. Node Integration and Javascript will be disabled in the new window if it is also disabled in the parent window. Similarly, context isolation will be enabled if it is enabled in the parent window. It is best to only allow websites to create new popups if you are sure it is necessary. "
    },
    "disablewebsecurity": {
        "failValue": true,
        "description": "Related to webSecurity. This allows the execution of insecure code from different domains. It allows CORS requests (an origin is considered the same origin if it has the same protocol, port (if specified) and host), and ignores X-Frame-Options which serve to indicate whether or not, and in what context a browser is allowed to render a page. Enabling this setting disables the same-origin policy and sets allowRunningInsecureContent to true."
    },
    // ***************************************************************************
    // Found in JS/TS Files
    "webSecurity": {
        "failValue": false,
        "description": "Related to disablewebsecurity. This allows the execution of insecure code from different domains. It allows CORS requests (an origin is considered the same origin if it has the same protocol, port (if specified) and host), and ignores X-Frame-Options which serve to indicate whether or not, and in what context a browser is allowed to render a page. Enabling this setting disables the same-origin policy and sets allowRunningInsecureContent to true."
    },
    // https://slack.engineering/the-app-sandbox/
    "sandbox": {
        // best to enable
        "failValue": null,
        "description": "Sandboxing is a Chromium feature that uses the operating system to significantly limit what renderer processes have access to, which essentially becomes only the ability to send messages to the main process. Enabling this feature means that your renderer process cannot use Node or any external module that depends on any of the core modules of Node. It is a feature used to mitigate the many potential security risks we cannot account for. "
    },
    "allowRunningInsecureContent": {
        "failValue": true,
        "description": "Setting this to true disables the default electron settings that prohibit websites loaded over secure sources (HTTPS), to load and execute scripts, CSS, or plugins from insecure sources (HTTP). Depending on the content you load onto your page, this could pose varying levels of security risks."
    },
    "enableBlinkFeatures": {
        // Can have many different values. Property is ideally not declared in files unless there's a clear purpose
        // If this is declared in application then it fails this test, regardless of what it's set to
        "failValue": true, 
        "description": "Blink is Chromium's rendering engine and setting this property to true enables features which had been previously disabled, by default, for security purposes. Some blink feratures are the following: KeyboardEventKey and ExecCommandInJavaScript. You should fully understand the security risks of the features you are enanbling and try your best to safeguard your application."
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
    // best if its disabled but its typically enabled by default, might be necessary
    "webgl": {
        "failValue": null,
        "description": "WebGL is a JS API used to render interactive graphics. It allows direct access to the GPU, so while it can be a potential security concern, most browsers ensure that running your code will not be a major security issue."
    },
    // Disabled as of Version 5>=
    // <webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
    // <webview src="http://www.google.com/" nodeintegration></webview>
    // can also set within this tag: plugins, preload, disablewebsecurity, allowpopups, webpreferences, partition, useragent
    // enableblinkfeatures, disableblinkfeatures
    // has methods: loadURL(), downloadURL(), getURL(), getTitle(), isLoading(), isLoadingMainFraim(), isWaitingForResponse(),
    // stop(), reload(), reloadIgnoringCache(),......... and MANY MORE
    // https://stackoverflow.com/questions/37602759/what-is-the-difference-between-browserwindow-and-webview-tag-in-electron-and-w
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
    // ,
    // "needToUpdateVersion": {
    //     "failValue": true,
    //     "description": "It is recommended that you update to the latest version of Electron as Electron is continuiously implementing updates and changes that make your application more secure."
    // }

}
export default settingsInfo