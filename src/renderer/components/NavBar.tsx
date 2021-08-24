import React, { useState, useEffect } from 'react';



const NavBar = () =>{

  useEffect(() => {
    
  },)
  
  const handleClick = () => {
  //@ts-expect-error
    API.incrementCount();
    //bridgeAPI.incrementCount();

    //@ts-expect-error
    API.receiveCount("preload:test", (data) => {
      console.log(`Received ${data} from main process`);
      
  });
  //   bridgeAPI.receiveCount("preload:test", (data) => {
  //     console.log(`Received ${data} from main process`);
  // });
  }

  const handleClickOpenFile = () =>{
    //@ts-expect-error
    bridgeAPI.openFile();

    //@ts-expect-error
    bridgeAPI.receiveData()
  }

  const handleClickOpenFolder = () =>{
    //@ts-expect-error
    bridgeAPI.openFolder();

    //@ts-expect-error
    bridgeAPI.receiveData()
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