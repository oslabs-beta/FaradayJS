const button = document.getElementById('test-button')
const demo = <HTMLElement | null> document.getElementById('demo')

button?.addEventListener('click', ()=>{
  
  //@ts-expect-error
  demo?.innerHTML = 'dddasfasfd'

  //@ts-expect-error
  bridgeAPI.incrementCount();
})