const versionFinder = (obj:any) =>{
  let version = 0;
  // Rather than using loops to locate electron version, I think hard-coding might be faster here, since this is O(1)

  if(obj.devDependencies && obj.devDependencies.electron){
    let tempLiteral = obj.devDependencies.electron.replace('^', '').split(".")
    tempLiteral.pop();
    version = Number(tempLiteral.join('.'))
  }else if (obj.dependencies && obj.dependencies.electron){
    let tempLiteral = obj.dependencies.electron.replace('^', '').split(".")
    tempLiteral.pop();
    version = Number(tempLiteral.join('.'))
  }
  return version;
}

export default versionFinder