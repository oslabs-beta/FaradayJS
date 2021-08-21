

2. webSecurity (#5)
    - in a .ts | .js | .jsx | .tsx file
    - when creating new instance of 
        - BrowserWindow or 
        - BrowserView
    - look in first argument to constructor (should be an object)
    - in argument object, look for webPreferences property
    - in webPreferences property value (should be an object), look for  webSecurity key
    - if webSecurity's value is false, then: failed our test
    - if webSecurity's value is true, then: continue test
    - otherwise, webSecurity is set to default, //check that default has always been true, if so then default continues test, if not then pass/fail depends on version of electron
    - if reach end of input of specified file types, then passes the test

3. allowRunningInsecureContent (#7)
    - in a .ts | .js | .jsx | .tsx file
    - when creating new instance of 
        - BrowserWindow or 
        - BrowserView
    - look in first argument to constructor (should be an object)
    - in argument object, look for webPreferences property
    - in webPreferences property value (should be an object), look for  webSecurity key
    - if allowRunningInsecureContent's value is true, then: failed our test
    - if allowRunningInsecureContent's value is false, then: continue test
    - otherwise, allowRunningInsecureContent is set to default, //check that default has always been true, if so then default continues test, if not then pass/fail depends on version of electron
    - if reach end of input of specified file types, then passes the test

4. experimentalFeatures (#8)
    - in a .ts | .js | .jsx | .tsx file
    - when creating new instance of 
        - BrowserWindow or 
        - BrowserView
    - look in first argument to constructor (should be an object)
    - in argument object, look for webPreferences property
    - in webPreferences property value (should be an object), look for  webSecurity key
    - if experimentalFeatures's value is true, then: failed our test
    - if experimentalFeatures's value is false, then: continue test
    - otherwise, experimentalFeatures is set to default, //check that default has always been true, if so then default continues test, if not then pass/fail depends on version of electron
    - if reach end of input of specified file types, then passes the test

5. enableBlinkFeatures (#8)
    - in a .ts | .js | .jsx | .tsx file
    - when creating new instance of 
        - BrowserWindow or 
        - BrowserView
    - look in first argument to constructor (should be an object)
    - in argument object, look for webPreferences property
    - in webPreferences property value (should be an object), look for webSecurity key
    - if enableBlinkFeatures's value is truthy, then: failed our test
    - otherwise, enableBlinkFeatures is set to default or not in use, //check that default has always been true, if so then default continues test, if not then pass/fail depends on version of electron
    - if reach end of input of specified file types, then passes the test

6. disablewebsecurity (#5)
    - in a .html | .jsx | .tsx file
    -check if webview element exists //first check if webview exists in case they are referencing disablewebsecurity for some reason in a string  or something similar
      -if it doesn't exist, break out of test
    -if webview element exists
      -look in opening tab for disablewebsecurity attribute
      -if disablewebsecurity is present, then: failed our test
      -if disablewebsecurity isn't present, then: continue test
    -if test ran through all .html | .jsx | .tsx files and did not find disablewebsecurity attribute on webview elements, then: test passes


