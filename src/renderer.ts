const button = document.getElementById('test-button')
const demo = <HTMLElement | null> document.getElementById('demo')
const openFileButton = document.getElementById('open-file');
const openFolderButton = document.getElementById('open-folder');
const resultsH4 = document.getElementById('results');

button?.addEventListener('click', ()=>{
  
  //@ts-expect-error
  demo?.innerHTML = 'dddasfasfd';

  //@ts-expect-error
  bridgeAPI.incrementCount();
});

openFileButton?.addEventListener('click', ()=>{
  //@ts-expect-error
  bridgeAPI.openFile();
});

openFolderButton?.addEventListener('click', ()=>{
  //@ts-expect-error
  bridgeAPI.openFolder();
});
