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
      failValue: true
    },
    allowpopups: {
      failValue: true
    }
  }
  const testResults: any = [];
  //   testProp: testProp,
  //   failValue: testFailValue,
  //   status: 'unknown',
  //   start: undefined,
  //   end: undefined
  // };
  const parsed = new htmlparser2.Parser({
    onopentag(
      name: string,
      attribute: { [key: string]: string | number | boolean | undefined | null }
    ) {
      for (let test in tests) {
        const testResult = {
          testProp: tests[test],
          failValue: tests[test].failValue,
          status: 'unknown',
          start: 0,
          end: 0
        };
        if (tests[test].hasOwnProperty('failValue')) {
          if (name === 'webview' &&
            attribute.hasOwnProperty(tests[test])
          ) {
            testResult.status = 'fail'
          } else if (name === 'webview' &&
            !attribute.hasOwnProperty(tests[test])
            ) {
            testResult.status = 'pass by default';
          } else {
            testResult.status = 'pass by default';
          }
          testResults.push(testResult);
        }
      }
    },
    ontext(text: string) {},
    onclosetag(tagname: string) {},
  });

  parsed.write(obj);

  parsed.end();

  return testResults;
};
