import defaultConfig from './defaultConfig'


const checker = (node:{[key:string]:string|number|boolean|undefined|null}, version:number) =>{
  const keyFromDefaultConfigOver10_0_0 = Object.values(defaultConfig)[2]      
  let tempArr = [];
  for(let i = 0; i<Object.keys(node).length; i++){
    if(JSON.stringify(Object.keys(keyFromDefaultConfigOver10_0_0)).includes(JSON.stringify(Object.keys(node)[i]))){
      let key:string = Object.keys(node)[i]
      //@ts-expect-error      
      tempArr.push([Object.keys(node)[i], Object.values(node)[i], Object.values(defaultConfig)[2][key]])
    }
  }
  return tempArr;
}


export default checker