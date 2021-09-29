import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import openFolderIcon from '../../icons/openFolder.svg';
import icon from '../../icons/iconTransparent.svg';
import ResultDisplay from './ResultDisplay'

const NavBar = () =>{
  const history = useHistory();

  const [newData, setNewData] = useState<any[]>([]);
  const [testProp, setTestProp] = useState("");
  const [status, setStatus] = useState("");
  const [failValue, setFailValue] = useState("");
  const [fileName, setFileName] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [filePath, setFilePath] = useState("");
  
  // let ourData : { fileName: string, filePath: string, fileResults: { end: undefined, failValue: string, start: undefined, status: string, testProp: string } }[];
  // let newData:any = null
  const handleClickOpenFolder = () =>{
    //@ts-expect-error
    bridgeAPI.openFolder();

    // / data: { fileName: string, filePath: string, fileResults: { end: bool, failValue: string, start: bool, status: string, testProp: string } }[]
    //@ts-expect-error
    bridgeAPI.receiveData('preload:open-folder', (data: any)=>{
      //console.log('data: ', data);
      setNewData(data)
    });
  }

  return(
    <div>
      <div className="grid grid-cols-2" id="results">
        <div className="justify-self-start"><button className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id='open-folder' onClick={handleClickOpenFolder}>
          <img className="fill-current w-4 h-4 mr-2" src={openFolderIcon}/>
          <span>Run Tests</span></button>
        </div>
        <div className="justify-self-end">
          <img className="object-right-top h-16" src={icon}/>
        </div>
      </div>
      <ResultDisplay newData = {newData}/>
    </div>
    
  )
}

export default withRouter(NavBar);