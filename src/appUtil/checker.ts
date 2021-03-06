import defaultConfig from './defaultConfig'
import settingsInfo from './securitySettingsInfo';
import groupSettings from './groupSettings';
// console.log("settings: ", settingsInfo);

const checker = (propertiesObj: { [key: string]: any }, version: number) => {
  const versionDefaults: any = groupSettings(version)
  const testResults: any = [];

  for (let test in versionDefaults) {

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
      // Check if the properties that were grabbed from the users codebase includes this 
      // setting that was in our default configuration object
      if (propertiesObj.hasOwnProperty(testProp)) {
        // it was in that object
        //identify the lines for start and end
        testResult.start = propertiesObj[testProp].start;
        testResult.end = propertiesObj[testProp].end;

        // if the value of that setting is equal to the testFail value
        // give it a fail status and description
        if (propertiesObj[testProp].value === testFailValue) {
          testResult.description = versionDefaults[testProp].description;
          testResult.status = 'fail';
        } else if (propertiesObj[testProp].value === !testFailValue) {
          // else if is not equal to the testFail value
          //  give it a pass status and description
          testResult.description = versionDefaults[testProp].description;
          testResult.status = 'pass';
        } 
      } else if (versionDefaults[testProp].default == testFailValue) {
        // Case that the setting was not in the files 
        // Check if the default value for the version # is equal to the testFail value
        //  if so, assign it a fail by default value and description 
        testResult.status = 'fail by default';
        testResult.description = versionDefaults[testProp].description;
      } else { //if (versionDefaults[testProp] === !failValue) {
        // Case assumes that the setting was not in the files and that
        // the default value is not equal to the testFail value
        // assign it a pass by default and description
        testResult.status = 'pass by default';
        testResult.description = versionDefaults[testProp].description;
        // continue;
      }
      testResults.push(testResult);
    }
  }
  return testResults;
};


export default checker