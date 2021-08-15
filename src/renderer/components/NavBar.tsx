import React, { useState } from 'react';

const NavBar = () =>{

  ipcRenderer.on('preload:test', ()=>{
    console.log('ddd')
  })

  return(
    <div>
      <button id = 'open-file'>Open File</button>
      <button id = 'test-button'>Click</button>
      <span id = 'demo'>dddd</span>
      <span id = 'hello'>Hello</span>
    </div>
  )
}

export default NavBar