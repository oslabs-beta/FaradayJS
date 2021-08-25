const estraverse = require('estraverse-jsx')

const traverser = async (ast:any) =>{
  try {
  let cache:{[key:string]: object} = {}
  await estraverse.traverse(ast, {
    enter:function(node:any, parent:any){
      if(node.type=='VariableDeclaration'){
        return estraverse.VisitorOption.skip;
      }
    },
    leave: function (node:any, parent:any) {
      if (node.type == 'Property') {
        // console.log(node);
        cache[node.key.name] =  { 
          value: node.value.value,
          start: node.loc.start.line,
          end: node.loc.end.line,
        }
      }
    },
    keys:{
      'ClassProperty': ['key', 'value']
    }
  });
  return cache;
} catch (e) {
  console.log('Traverse Error: ', e);
}
}

export default traverser