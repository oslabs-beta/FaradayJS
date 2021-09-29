import {Project, Node } from 'ts-morph'

const tsmorph = async (path: string, property:string, value:any) =>{
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(path);
  
  sourceFile.forEachDescendant(node=>{
    if(Node.isPropertyAssignment(node)){
      if(node.getName() === `${property}`){
        node.replaceWithText(`${property}: ${value}`)
      }
    }
  })

  await sourceFile.save()
  await project.save()
}

export default tsmorph