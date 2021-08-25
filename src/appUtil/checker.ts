import defaultConfig from './defaultConfig'


const checker = (propertiesObj:{[key:string]:any}, version:number) =>{
  const versionDefaults = Object.values(defaultConfig)[2]      

  const testProp = 'webSecurity';
  const failValue:boolean = false;
  const testResult = {
    testProp: testProp,
    failValue: failValue,
    status: 'unknown',
    start: undefined,
    end: undefined
  };

  if (propertiesObj.hasOwnProperty(testProp)) {
    testResult.start = propertiesObj[testProp].start;
    testResult.end = propertiesObj[testProp].end;
    if (propertiesObj[testProp].value === failValue) {
      testResult.status = 'fail';
    } else if (propertiesObj[testProp].value === !failValue) {
      testResult.status = 'pass';
    }
  } else if (versionDefaults[testProp] === failValue) {
    testResult.status = 'fail by default';
  } else { //if (versionDefaults[testProp] === !failValue) {
    testResult.status = 'pass by default';
  }
  return testResult;
};


export default checker