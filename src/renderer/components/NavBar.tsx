import React, { useState, useEffect, useCallback, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import path from 'path';
import openFolderIcon from '../../icons/openFolder.svg';
import icon from '../../icons/iconTransparent.svg';

import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { newTestResults, expandResult } from '../testResultSlice';


const NavBar: () => JSX.Element = () => {
  // const history = useHistory();
  //console.log("history: ", history);
  // const sacrificeToTheTSGods:any=[]

  //const [newData, setNewData] = useState<any[]>([]);

  //const [expandBools, setExpandBools] = useState<boolean[]>([]);

  const name = useSelector((state: RootState) => state.testResults.projectName);

  const newData = useSelector((state: RootState) => state.testResults.testResults);
  const expandBools = useSelector((state: RootState) => state.testResults.expansionStatus);
  const dispatch = useDispatch();

  // const handleClick = () => {
  // //@ts-expect-error
  //   API.incrementCount();

  //   //@ts-expect-error
  //   API.receiveCount("preload:test", (data) => {
  //     console.log(`Received ${data} from main process`);
      
  // });
  // }

  // let ourData : { fileName: string, filePath: string, fileResults: { end: undefined, failValue: string, start: undefined, status: string, testProp: string } }[];
  // let newData:any = null
  const handleClickOpenFolder = () => {
    
    //@ts-expect-error
    bridgeAPI.openFolder();

    // / data: { fileName: string, filePath: string, fileResults: { end: bool, failValue: string, start: bool, status: string, testProp: string } }[]
    //@ts-expect-error
    bridgeAPI.receiveData('preload:open-folder', (data: any)=>{
      console.log('data: ', data);
      dispatch(newTestResults(data));
      // console.log('newData: ',newData)
      // const newBools: Array<boolean> = []
      // for (let i = 0; i < newData.length; i += 1) {
      //   newBools[i] = false;
      // }
      // setExpandBools(newBools);
    });

  }
  // const handleClickForTestResults = useCallback((event: any, testRes: any) => {
  // }, []);

  useEffect(() => {
    console.log(name);
    console.log('newData: ',newData)
    // setTestResult(ourData)
    // window.addEventListener('click', handleClickForTestResults);
  }, [name, newData]);
  //newData[i].fileResults.status==='fail' || newData[i].fileResults.status ==='fail by default'

  // const handleExpandClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
  //   console.log(index);
  //   let updatedBools = expandBools;
  //   updatedBools[index] = !updatedBools[index];
  //   setExpandBools(updatedBools);
  //   console.log(expandBools);
  // }

const handleShowState = () => {
  console.log("State is:");
  console.log(name);
  console.log(newData);
  console.log(newData[0]);
}

  const conditional: Array<JSX.Element> = [];
  for(let i = 0; i<newData.length; i++){
    conditional.push(
      <div className="w-full p-3" key={i}>
        {/* lg:h-32 border border-gray-other*/}
        <button onClick={() => dispatch(expandResult(i))} className="flex flex-col rounded overflow-auto h-auto border border-transparent border-shadow shadow-lg p-3 hover:bg-blueGray-500 hover:border-gray-darkest">
          {/* <div>{i}</div> */}
          <div><strong>Test: </strong>{newData[i].fileResults.testProp}</div> 
          <div className={newData[i].fileResults.status.includes('pass') ? "text-green-700" : "text-red-700"}><strong>Status: </strong>{newData[i].fileResults.status}</div>
          {newData[i].fileResults.status.includes('fail') && <div><strong>Issue: </strong>{`${newData[i].fileResults.testProp} is set to ${newData[i].fileResults.failValue}`}</div>}
          <div><strong>File Name: </strong>{newData[i].fileName}</div>
          {newData[i].fileResults.start>0 && <div><strong>Start: </strong>{newData[i].fileResults.start}</div>}
          {newData[i].fileResults.end>0 && <div><strong>End: </strong>{newData[i].fileResults.end}</div>}
          <div><strong>File Path: </strong>{newData[i].filePath}</div>
          <br></br>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        {expandBools[i] && <button className="m-5 flex flex-col rounded overflow-auto h-auto border border-transparent border-shadow shadow-lg p-3">
          <strong>Details: </strong>This matters because... 
          </button>}
    </div>);
  }

  return(
    <div>
      {/* "sm:container sm :mx-auto px-4 overflow-contain border-double border-4 border-peach-light" */}
      {/* "/Users/Rosio/Desktop/code/codesmithCode/projects/production-project/electron-security-app/catsnake-electron-security/src/icons/open-folder-with-document.svg" */}
      {/* grid grid-cols-7 md:grid-cols-7 gap-4 */}
      <div className="grid grid-cols-2" id="results">
        <div className="justify-self-start"><button className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id='open-folder' onClick={handleClickOpenFolder}>
          <img className="fill-current w-4 h-4 mr-2" src={openFolderIcon}/>
          <span>Run Tests</span></button>
        </div>
        <div className="justify-self-end">
          <img className="object-right-top h-16" src={icon}/>
        </div>
      </div>
      <div className='col-span-6'>{conditional}</div>
      {/* <button onClick={handleShowState}>See State</button> */}
    </div>
  );
}

export default withRouter(NavBar);