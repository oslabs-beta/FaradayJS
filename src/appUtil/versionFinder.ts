

const versionFinder: (obj:any) => number = (obj:any) => {
  let version: number = 0; //should this be 13?
  // Rather than using loops to locate electron version, I think hard-coding might be faster here, since this is O(1)

  if((obj.devDependencies && obj.devDependencies.electron) || (obj.dependencies && obj.dependencies.electron)){
    let tempLiteral: [string] = obj.devDependencies.electron.replace('^', '').split(".");
    tempLiteral.pop();
    version = Number(tempLiteral.join('.'));
  // }else if (){
  //   let tempLiteral: [string] = obj.dependencies.electron.replace('^', '').split(".")
  //   tempLiteral.pop();
  //   version = Number(tempLiteral.join('.'))
  }
  return version;
};

export default versionFinder;