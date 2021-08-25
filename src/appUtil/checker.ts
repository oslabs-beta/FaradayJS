import defaultConfig from './defaultConfig'


const checker = (propertiesObj:{[key:string]:string|number|boolean|undefined|null}, version:number) =>{
  const versionDefaults = Object.values(defaultConfig)[2]      

  const testProp = 'webSecurity';
  const failValue = false;
  const testResult = {
    testProp: testProp,
    failValue: failValue,
    status: 'unknown'
  };

  if (propertiesObj.hasOwnProperty(testProp)) {
    if (propertiesObj[testProp] === failValue) {
      testResult.status = 'fail';
    } else if (propertiesObj[testProp] === !failValue) {
      testResult.status = 'pass';
    }
  } else if (versionDefaults[testProp] === failValue) {
    testResult.status = 'fail by default';
  } else { //if (versionDefaults[testProp] === !failValue) {
    testResult.status = 'pass by default'
  }
  return testResult;
}


export default checker