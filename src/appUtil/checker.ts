import defaultConfig from './defaultConfig'
import settingsInfo from './securitySettingsInfo';
import groupSettings from './groupSettings';
// console.log("settings: ", settingsInfo);

const checker = (propertiesObj: { [key: string]: any }, version: number) => {
  
  // console.log('propertiesObj: ', propertiesObj);
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

  const versionDefaults: any = groupSettings(version)

  const testResults: any = [];

  for (let test in versionDefaults) {
    // console.log('test: ', test);
    // console.log('versionDefaults[test]: ', versionDefaults[test]);

    if (versionDefaults[test].hasOwnProperty('failValue')) {
      const testProp: any = test;
      const testFailValue: any = versionDefaults[test].failValue;
      const testResult = {
        testProp: testProp,
        failValue: testFailValue,
        status: 'unknown',
        description: 'none',
        start: 0,
        end: 0
      };
      
      if (propertiesObj.hasOwnProperty(testProp)) {
        testResult.start = propertiesObj[testProp].start;
        testResult.end = propertiesObj[testProp].end;
        if (propertiesObj[testProp].value === testFailValue) {
          testResult.description = versionDefaults[testProp].description;
          testResult.status = 'fail';
        } else if (propertiesObj[testProp].value === !testFailValue) {
          testResult.description = versionDefaults[testProp].description;
          testResult.status = 'pass';
        }
      } else if (versionDefaults[testProp].default == testFailValue) {
        testResult.status = 'fail by default';
        testResult.description = versionDefaults[testProp].description;
      } else { //if (versionDefaults[testProp] === !failValue) {
        testResult.status = 'pass by default';
        testResult.description = versionDefaults[testProp].description;
        continue;
      }

      // console.log('testProp: ', testProp);
      // console.log('versionDefaults[testProp].default: ', versionDefaults[testProp].default);
      // console.log("versionDefaults[testProp].failValue: ", versionDefaults[testProp].failValue);
      // console.log("testFailValue: ", testFailValue);
      // console.log('Single Test Result: ', testResult);
      testResults.push(testResult);
    }
  }
  // console.log('Checker results: ', testResults);
  return testResults;
};


export default checker