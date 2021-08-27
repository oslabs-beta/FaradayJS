import defaultConfig from './defaultConfig'

const checker = (propertiesObj: { [key: string]: any }, version: number) => {

  const tests: any = {
    webSecurity: {
      failValue: false
    },
    nodeIntegration: {
      failValue: true
    },
    nodeIntegrationInWorker: {
      failValue: true
    },
    allowRunningInsecureContent: {
      failValue: true
    }
  }

  const versionDefaults: any = Object.values(defaultConfig)[2]
  const testResults: any = [];

  for (let test in tests) {
    //console.log(tests[test].failValue);

    if (tests[test].hasOwnProperty('failValue')) {
      const testProp: any = test;
      const testFailValue: any = tests[test].failValue;
      const testResult = {
        testProp: testProp,
        failValue: testFailValue,
        status: 'unknown',
        start: 0,
        end: 0
      };

      if (propertiesObj.hasOwnProperty(testProp)) {
        testResult.start = propertiesObj[testProp].start;
        testResult.end = propertiesObj[testProp].end;
        if (propertiesObj[testProp].value === testFailValue) {
          testResult.status = 'fail';
        } else if (propertiesObj[testProp].value === !testFailValue) {
          testResult.status = 'pass';
        }
      } else if (versionDefaults[testProp] === testFailValue) {
        testResult.status = 'fail by default';
      } else { //if (versionDefaults[testProp] === !failValue) {
        testResult.status = 'pass by default';
      }
      //console.log('Single Test Result: ', testResult);
      testResults.push(testResult);
    }
  }
  //console.log('Checker results: ', testResults);
  return testResults;
};


export default checker