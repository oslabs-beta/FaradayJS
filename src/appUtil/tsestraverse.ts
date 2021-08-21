const estraverse = require('estraverse')

const traverser = (ast:any) =>{
  let cache:{[key:string]:string|number|boolean|undefined|null} = {}
  estraverse.traverse(ast,{
    enter:function(node:any, parent:any){
      if(node.type=='VariableDeclaration'){
        return estraverse.VisitorOption.skip;
      }
    },
    leave: function (node:any, parent:any) {
      if (node.type == 'Property') {
        //console.log(node.key.name, node.value.value);
        cache[node.key.name] = node.value.value
      }
    }
  })
  return cache;
}

export default traverser