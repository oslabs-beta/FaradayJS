const traverser = (node:any, level:number) =>{
let tempCache: {[key:string]:string|number|boolean|undefined|null} = {};


  const traverse = (node:any, level:number) =>{
    //const indent = Array(level+1).join(" ");
    //console.log(indent, "type:", node.type)
    switch(node.type){
      case "Program":
        for(let child of node.body){
          traverse(child, level+1);
        }
        break;
      case "ImportDeclaration":
        break;
      case "VariableDeclaration":
        for(let child of node.declarations){
          traverse(child, level+1)
        }
        break;
      case "VariableDeclarator":
        if(node.id !== null){
          traverse(node.id, level+1);
        }
        if(node.init !== null){
          traverse(node.init, level+1)
        }
        break;
      case "Literal":
        //console.log(indent, node.value)
        break;
      case "Identifier":
        //console.log(indent, node.name)
        break;
      case "ArrowFunctionExpression":
        traverse(node.body, level+1);
        break;  
      case "BinaryExpression":
        traverse(node.left, level+1);
        traverse(node.right, level+1);
        break;
      case "CallExpression":
        traverse(node.callee, level+1);
        break;
      case "MemberExpression":
        traverse(node.object, level+1);
        traverse(node.property, level+1);
        break;
      case "BlockStatement":
        for(let child of node.body){
          traverse(child, level+1);
        }
        break; 
      case "ExpressionStatement":
        traverse(node.expression, level+1)
        break; 
      case "AssignmentExpression":
        traverse(node.left, level+1);
        traverse(node.right, level+1);
        break; 
      case "NewExpression":
        traverse(node.callee, level+1);
        for(let child of node.arguments){
          traverse(child, level+1)
        }
        break;
      case "ObjectExpression":
        for(let child of node.properties){
          traverse(child, level+1);
        }
        break;
      case "Property":
        traverse(node.key, level+1)
        traverse(node.value, level+1)
        tempCache[node.key.name] = node.value.value
        break;
      default:
        throw new Error("Node type not handled")
    }
  }

  traverse(node, level);
  return tempCache
}


export default traverser
