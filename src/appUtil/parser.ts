const parse = require('@typescript-eslint/typescript-estree');
const htmlparser2 = require('htmlparser2');

export const parser = (obj: string) => {
  const options = {
    jsx: true,
  };
  const parsed = parse.parse(obj, options);
  return parsed;
};

export const htmlparser = (obj: string) => {
  //const dom = htmlparser2.parseDocument(obj); // This way you can see the whole DOM
  let tempCache: { [key: string]: boolean} = {};

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
