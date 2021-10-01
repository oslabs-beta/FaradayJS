import * as parse from '@typescript-eslint/typescript-estree'
const htmlparser2 = require('htmlparser2');

export const parser = async (obj: string) => {
  try {
    const options = {
      jsx: true,
      loc: true,
    };
    const parsed = await parse.parse(obj, options);
    return parsed;
  } catch (e) {
    console.log('Parse Error: ', e);
  }
};

export const htmlparser = (obj: string) => {
  //const dom = htmlparser2.parseDocument(obj); // you can see the whole DOM
  const tests: any = {
    disablewebsecurity: {
      default: false,
      description: "Related to webSecurity. This allows the execution of insecure code from different domains. It allows CORS requests (an origin is considered the same origin if it has the same protocol, port (if specified) and host), and ignores X-Frame-Options which serve to indicate whether or not, and in what context a browser is allowed to render a page. Enabling this setting disables the same-origin policy and sets allowRunningInsecureContent to true.",
      failValue: true,
    },
    allowpopups: {
      default: false,
      description: "New windows will open a BrowserWindow using window.open() when nativeWindowOpen is set to true and create a BrowserWindowProxy when nativeWindowOpen is set to false. BrowserWindow by default has complete access to the Node API. Allowing popups and loading insecure content in your application can pose security risks. Node Integration and Javascript will be disabled in the new window if it is also disabled in the parent window. Similarly, context isolation will be enabled if it is enabled in the parent window. It is best to only allow websites to create new popups if you are sure it is necessary. ",
      failValue: true
    }
  }
  const testResults: any = [];

  const parsed = new htmlparser2.Parser({
    onopentag(
      name: string,
      attribute: { [key: string]: string | number | boolean | undefined | null }
    ) {
      for (let test in tests) {
        const testResult = {
          testProp: test,
          failValue: tests[test].failValue,
          description: "none",
          status: 'unknown',
          start: 0,
          end: 0
        };
        if (tests[test].hasOwnProperty('failValue')) {
          if (name === 'webview' &&
            attribute.hasOwnProperty(test)
          ) {
            testResult.status = 'fail';
            testResult.description = tests[test].description;
            console.log('testResult.description: ', testResult.description);
            testResults.push(testResult);
          } else if (name === 'webview' &&
            !attribute.hasOwnProperty(test)
            ) {
              testResult.status = 'pass by default';
              testResult.description = tests[test].description;
              console.log('testResult.description: ', testResult.description);
              testResults.push(testResult);
          }
        }
      }
    },
    ontext(text: string) {},
    onclosetag(tagname: string) {},
  });

  parsed.write(obj);

  parsed.end();

  // loop through keys in tests obj
  // checking if that key does NOT exist in testResults
  //  then push to testResults a testResult obj defined here that has a status of 'pass by default'


  for (let test in tests) {
    // const isResultPresent = testResults.reduce((accum: boolean, currVal: any) => {
    //   if (currVal.testProp === test) return accum = true;
    // }, false); 
    let isResultPresent: boolean = false;

    testResults.forEach((obj:any) =>{
      if(obj.testProp === test){
        isResultPresent = true
      }
    })

    if(!isResultPresent) {
      testResults.push({
        testProp: test,
        failValue: tests[test].failValue,
        description: tests[test].description,
        status: 'pass by default',
        start: 0,
        end: 0
      });
    }
  }
  
  return testResults;
};
