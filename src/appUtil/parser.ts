const parse = require('@typescript-eslint/typescript-estree')

const parser = async (obj:string) =>{
  try {
  //console.log(renderAst(obj))
    const parsed = await parse.parse(obj, { loc: true });
    return parsed;
  } catch (e) {
    console.log("Parse Error: ", e);
  }
};

export default parser