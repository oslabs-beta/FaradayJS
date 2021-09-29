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
  let tempCache: { [key: string]: boolean } = {};
  const tests: any = {
    disablewebsecurity: {
      default: false,
      description: "Disables same-origin policy and sets allwRunningInsecureContent to true.",
      failValue: true,
    },
    allowpopups: {
      default: false,
      description: "New windows will use BrowserWindows using window.open(). If you are not using them, it's best not to enable them.",
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
