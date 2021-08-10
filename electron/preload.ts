// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {ipcRenderer, contextBridge} = require('electron');
window.require = require;

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string|undefined) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text ?? ''; // 2 question makrs are called Nullish Coalescing.
      //Think of it as a way to "fall back" to a default value when dealing iwth null or undefined
      // let x = foo ?? bar() is equivalent as let x = foo !== null && foo !== undefined ? foo : bar();
      // If foo is not null AND not undefined, then x = foo, if foo is either null or undefined, x = bar() 
      // If text is not null AND not undefined, element.innerText = text, otherwise element.innerText = ''
    }
  }

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
})