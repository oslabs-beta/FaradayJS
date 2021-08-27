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
      failValue: true,
    },
    allowpopups: {
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
          status: 'unknown',
          start: 0,
          end: 0
        };
        if (tests[test].hasOwnProperty('failValue')) {
          if (name === 'webview' &&
            attribute.hasOwnProperty(test)
          ) {
            testResult.status = 'fail'
            testResults.push(testResult);
          } else if (name === 'webview' &&
            !attribute.hasOwnProperty(test)
            ) {
              testResult.status = 'pass by default';
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
        status: 'pass by default',
        start: 0,
        end: 0
      });
    }
  }
  
  return testResults;
};
