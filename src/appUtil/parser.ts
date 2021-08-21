const parse = require('@typescript-eslint/typescript-estree')

const parser = (obj:string) =>{

  //console.log(renderAst(obj))
    const parsed = parse.parse(obj);
    return parsed
}

export default parser