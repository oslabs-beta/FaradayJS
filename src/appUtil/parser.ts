const parse = require('@typescript-eslint/typescript-estree');
const htmlparser2 = require('htmlparser2');

<<<<<<< HEAD
export const parser = (obj: string) => {
  const options = {
    jsx: true,
  };
  const parsed = parse.parse(obj, options);
  //console.log(parsed)
  return parsed;
};

export const htmlparser = (obj: string) => {
  //const dom = htmlparser2.parseDocument(obj); // you can see the whole DOM
  let tempCache: { [key: string]: boolean} = {};
=======
const parser = async (obj:string) =>{
  try {
  //console.log(renderAst(obj))
    const parsed = await parse.parse(obj, { loc: true });
    return parsed;
  } catch (e) {
    console.log("Parse Error: ", e);
  }
};
>>>>>>> 438ffe18859ea9286b19f2390a28c169f8d5dde7

  const parsed = new htmlparser2.Parser({
    onopentag(name: string, attribute: { [key: string]: string | number | boolean | undefined | null }) {
      if (name === 'webview' && attribute.hasOwnProperty('disablewebsecurity')) {
         return tempCache['disablewebsecurity'] = true
      }else if(name === 'webview' && !attribute.hasOwnProperty('disablewebsecurity')){
        return tempCache['disablewebsecurity'] = false
      }
    },
    ontext(text: string) {},
    onclosetag(tagname: string) {},
  });

  parsed.write(obj);

  parsed.end();

  return tempCache;
};
