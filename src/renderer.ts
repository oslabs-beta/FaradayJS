const button = document.getElementById('test-button')
const demo = <HTMLElement | null> document.getElementById('demo')
const openFileButton = document.getElementById('open-file');

button?.addEventListener('click', ()=>{
  
  //@ts-expect-error
  demo?.innerHTML = 'dddasfasfd'

  //@ts-expect-error
  bridgeAPI.incrementCount();
})

openFileButton?.addEventListener('click', ()=>{
  //@ts-expect-error
  bridgeAPI.openFile();
})