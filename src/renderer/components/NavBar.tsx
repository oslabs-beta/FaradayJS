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
    bridgeAPI.receiveData('preload:open-folder', (data: string)=>{
      console.log(data);
    })
  }

  return(
    <div className="inline-flex">
      {/* <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" id='open-file'><img className="fill-current w-4 h-4 mr-2" src="/Users/Rosio/Desktop/code/codesmithCode/projects/production-project/electron-security-app/catsnake-electron-security/src/icons/google-docs.svg"/>Open File</button> */}
      {/* <button className="bg-gray-medium hover:bg-gray-darkest text-white font-bold py-1 px-2 rounded-l inline-flex items-center" id='open-file' onClick={handleClickOpenFile}><img className="fill-current w-4 h-4 mr-2" src="/Users/Rosio/Desktop/code/codesmithCode/projects/production-project/electron-security-app/catsnake-electron-security/src/icons/google-docs.svg"/>Open File</button>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 inline-flex items-center" id='test-button'><svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Test2</span></button>
      <button className="bg-gray-medium hover:bg-gray-darkest text-white font-bold py-1 px-2 inline-flex items-center" id='test-button' onClick={handleClickOpenFolder}><img className="fill-current w-4 h-4 mr-2" src="/Users/Rosio/Desktop/code/codesmithCode/projects/production-project/electron-security-app/catsnake-electron-security/src/icons/testing.svg"/><span>Test</span></button> */}
      <button className="bg-gray-medium hover:bg-gray-darkest text-white font-bold py-1 px-2 rounded inline-flex items-center" id='open-folder' onClick={handleClickOpenFolder}><img className="fill-current w-4 h-4 mr-2" src="/Users/Rosio/Desktop/code/codesmithCode/projects/production-project/electron-security-app/catsnake-electron-security/src/icons/open-folder-with-document.svg"/><span>Run Tests</span><span className="text-sm leading-tight text-grey-dark">Open Project Root Directory</span></button>
    </div>
  )
}

export default NavBar