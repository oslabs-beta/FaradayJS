import defaultConfig from './defaultConfig'


const checker = (propertiesObj:{[key:string]:any}, version:number) => {
  const versionDefaults = Object.values(defaultConfig)[2];      
  // let tempArr = [];
  // for(let i = 0; i<Object.keys(node).length; i++){
  //   if(JSON.stringify(Object.keys(keyFromDefaultConfigOver10_0_0)).includes(JSON.stringify(Object.keys(node)[i]))){
  //     let key:string = Object.keys(node)[i]
  //     //@ts-expect-error      
  //     tempArr.push([Object.keys(node)[i], Object.values(node)[i], Object.values(defaultConfig)[2][key]])
  //   }
  // }
  // return tempArr;

  // Note for later: if multiple BrowserWindow configurations are defined in the same file, then current implementation would overwrite duplicate properties.

  // declare const webSecurity string at testProp
  // declare const failValue equal to value that would mean they failed the test
  // declare const testResult as an object with properties - testProp, failValue, status (can be pass or fail or unknown)
  // if propertiesObj includes a key equal to testProp
    // check if propertiesObj at testProp === failValue
      // if true, set testResult status to fail
    // else if propertiesObj at testProp = opposite of failValue
      // set testResult status to pass
    // else set status to pass/fail based on default

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