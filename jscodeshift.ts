import { API, FileInfo } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const variableDeclarators = root.findBooleanLiteral('pineapple');
  variableDeclarators.renameTo('bannana');

  return root.toSource();
}

/*  terminal command:
    jscodeshift -t jscodeshift.ts --extensions=ts --parser=ts ./src --print
*/