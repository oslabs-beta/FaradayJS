import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';

const NavBar = () =>{
  const history = useHistory();
  //console.log("history: ", history);

  const [testProp, setTestProp] = useState("");
  const [status, setStatus] = useState("");
  const [failValue, setFailValue] = useState("");
  const [fileName, setFileName] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [filePath, setFilePath] = useState("");
  
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
  // let ourData : { fileName: string, filePath: string, fileResults: { end: undefined, failValue: string, start: undefined, status: string, testProp: string } }[];
  const handleClickOpenFolder = () =>{
    //@ts-expect-error
    bridgeAPI.openFolder();

    // / data: { fileName: string, filePath: string, fileResults: { end: bool, failValue: string, start: bool, status: string, testProp: string } }[]
    //@ts-expect-error
    bridgeAPI.receiveData('preload:open-folder', (data: string)=>{
      console.log('data: ', data);
      const unstringifiedData= JSON.parse(data)
      
      setTestProp(unstringifiedData[0].fileResults.testProp)
      setStatus(unstringifiedData[0].fileResults.status)
      setFailValue(unstringifiedData[0].fileResults.failValue)
      setFileName(unstringifiedData[0].fileName)
      setStart(unstringifiedData[0].fileResults.start)
      setEnd(unstringifiedData[0].fileResults.end)
      setFilePath(unstringifiedData[0].filePath)
      // ourData = data
    });

  }

  const handleClickForTestResults = useCallback((event: any, testRes: any) => {
   


  }, []);

  useEffect(() => {
    // setTestResult(ourData)
    // window.addEventListener('click', handleClickForTestResults);
  }, [ handleClickForTestResults]);

  return(
    <div>
      

      <div className="inline-flex">
        {/* "sm:container sm :mx-auto px-4 overflow-contain border-double border-4 border-peach-light" */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 overflow-contain border-double border-4 border-peach-light" id="results">
         <div><button className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id='open-folder' onClick={handleClickOpenFolder}><img className="fill-current w-4 h-4 mr-2" src="/Users/Rosio/Desktop/code/codesmithCode/projects/production-project/electron-security-app/catsnake-electron-security/src/icons/open-folder-with-document.svg"/><span>Run Tests</span></button></div>
         <div col-span-2>
           <div><strong>Test: </strong>{testProp}</div>
            <div><strong>Status: </strong>{status}</div>
            {failValue && <div><strong>Issue: </strong>{failValue}</div>}
            <div><strong>File Name: </strong>{fileName}</div>
            {start>0 && <div><strong>Start: </strong>{start}</div>}
            {end>0 && <div><strong>End: </strong>{end}</div>}
            <div><strong>File Path: </strong>{filePath}</div>
        </div>
        </div>
      </div>
    </div>
    
  )
}

export default withRouter(NavBar);