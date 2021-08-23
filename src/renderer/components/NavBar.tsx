import React, { useState } from 'react';

const NavBar = () =>{

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

  return(
    <div>
      <button id = 'open-file'>Open File</button>
      <button id = 'test-button' onClick = {handleClick}>Click</button>
      <button id = 'open-folder'>Open Folder</button>
      <span id = 'demo'>dddd</span>
      <span id = 'hello'>Hello</span>
    </div>
  )
}

export default NavBar