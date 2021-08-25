import React, { useState } from 'react';
// import { ipcRenderer } from 'electron';

const NavBar = () =>{

  // ipcRenderer.on('preload:test', ()=>{
  //   console.log('ddd')
  // })

  return(
    <div>
      <button id = 'open-file'>Open File</button>
      <button id = 'test-button'>Click</button>
      <button id = 'open-folder'>Open Folder</button>
      <span id = 'demo'>dddd</span>
      <span id = 'hello'>Hello</span>
      <h4 id='results'>Results...</h4>
    </div>
  )
}

export default NavBar