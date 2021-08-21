const parse = require('@typescript-eslint/typescript-estree')

const parser = (obj:{}) =>{
  const parsed = parse.parse(obj);
  return parsed
}

export default parser