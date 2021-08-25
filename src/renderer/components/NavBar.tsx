import React, { useState, useEffect } from 'react';



const NavBar = () =>{
  
  const handleClick = () => {
  //@ts-expect-error
    API.incrementCount();

    //@ts-expect-error
    API.receiveCount("preload:test", (data) => {
      console.log(`Received ${data} from main process`);
      
  });
  }

  const handleClickOpenFile = () =>{
    //@ts-expect-error
    bridgeAPI.openFile();  
  }

  const handleClickOpenFolder = () =>{
    //@ts-expect-error
    bridgeAPI.openFolder();

    //@ts-expect-error
    bridgeAPI.receiveData('preload:open-folder', (data)=>{
      console.log(data)
    })
  }


  return(
    <div>
      <button id = 'open-file'>Open File</button>
      <button id = 'test-button' onClick = {handleClick}>Click</button>
      <button id = 'open-folder' onClick = {handleClickOpenFolder}>Open Folder</button>
      <span id = 'demo'>dddd</span>
      <span id = 'hello'>Hello</span>
    </div>
  )
}

export default NavBar