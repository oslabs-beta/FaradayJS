const estraverse = require('estraverse')
// const { BoolAstNodeWLocKelsey } = require('../types');


const traverser = (ast:any) =>{
  let cache:{[key:string]: object} = {}
  estraverse.traverse(ast,{
    enter:function(node:any, parent:any){
      if(node.type=='VariableDeclaration'){
        return estraverse.VisitorOption.skip;
      }
    },
    leave: function (node:any, parent:any) {
      if (node.type == 'Property') {
        console.log(node);
        cache[node.key.name] =  { 
          value: node.value.value,
          start: node.loc.start.line,
          end: node.loc.end.line,
        }
      }
    }
  })
  return cache;
}

export default traverser