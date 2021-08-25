const parse = require('@typescript-eslint/typescript-estree');
const htmlparser2 = require('htmlparser2');

export const parser = async (obj: string) => {
  try {
    const options = {
      jsx: true,
      loc: true,
    };
    const parsed = await parse.parse(obj, options);
    //console.log(parsed)
    return parsed;
  } catch (e) {
    console.log('Parse Error: ', e);
  }
};

export const htmlparser = (obj: string) => {
  //const dom = htmlparser2.parseDocument(obj); // you can see the whole DOM
  let tempCache: { [key: string]: boolean } = {};

  const parsed = new htmlparser2.Parser({
    onopentag(
      name: string,
      attribute: { [key: string]: string | number | boolean | undefined | null }
    ) {
      if (
        name === 'webview' &&
        attribute.hasOwnProperty('disablewebsecurity')
      ) {
        return (tempCache['disablewebsecurity'] = true);
      } else if (
        name === 'webview' &&
        !attribute.hasOwnProperty('disablewebsecurity')
      ) {
        return (tempCache['disablewebsecurity'] = false);
      }
    },
    ontext(text: string) {},
    onclosetag(tagname: string) {},
  });

  parsed.write(obj);

  parsed.end();

  return tempCache;
};
