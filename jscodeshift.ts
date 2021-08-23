import { API, FileInfo } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ObjectExpression)  // Find a list of object literals
    .forEach(obj =>            // For each object literal …
      obj.value.properties.forEach(property => {
        // … go through each property …
        // if (property.type !== 'Property') return;
        if (property.key.name === 'webSecurity') property.value.value=true;
        if (property.key.name=== 'allowRunningInsecureContent') property.value.value=false
        if (property.key.name=== 'experimentalFeatures') property.value.value=false
        if (property.key.name=== 'enableBlinkFeatures') property.value.value=''
        
      })
    )
    .toSource();
};

// export default function transformer(file: FileInfo, api: API) {
//   const j = api.jscodeshift;
//   const root = j(file.source);

//   const variableDeclarators = root.findVariableDeclarators('createWindow.BrowserWindow');
//   variableDeclarators.renameTo('bannana');

//   return root.toSource();
// }

/*  terminal command:
    jscodeshift -t jscodeshift.ts --extensions=ts --parser=ts ./src --print
*/