import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { expandResult } from '../testResultSlice';



interface fileResult{
  start: number
  status: string
  end: number
  testProp: string
  description: string
  failValue: boolean
}

const ResultDisplay = (): JSX.Element => {

  const newData = useSelector((state: RootState) => state.testResults.testResults);
  const expandBools = useSelector((state: RootState) => state.testResults.expansionStatus);
  const dispatch = useDispatch();
  
  const handleClickChangeValue = async (args:[string, string, string, boolean, number, string])=>{
    //@ts-expect-error
    bridgeAPI.changeValue(args);

    //@ts-expect-error
    bridgeAPI.refreshCode(args);

    //@ts-expect-error
    bridgeAPI.receiveData('preload:refreshed-obj', (data: any)=>{
      //console.log('data: ', data);
      // let items:{fileName:string, filePath:string, fileResults:fileResult}[] = [...arrItems]
      // let item:{fileName:string, filePath:string, fileResults:fileResult} = {fileName: args[1], filePath:args[0], fileResults: data};
      // if(item) items[args[4]] = item;
      // if(items) setArrItems([...items])
      // setSimpleBool(!simpleBool);
    });
  }

  const conditional: Array<JSX.Element> = [];

  for (let i = 0; i < newData.length; i++) {
    const fileName:string = newData[i].fileName;
    const filePath:string = newData[i].filePath;
    const {start, status, end, testProp, failValue, description}:fileResult = newData[i].fileResults;

    conditional.push(
    <div className="w-full p-3" key={i}>
        <button onClick={() => dispatch(expandResult(i))} className="flex flex-col rounded overflow-auto h-auto border border-transparent border-shadow shadow-lg p-3 hover:bg-blueGray-500 hover:border-gray-darkest">
        <div>
          <strong>Test: </strong>{testProp}
        </div>
        <div className={status.includes('pass') ? "text-green-700" : "text-red-700"}>
          <strong>Status: </strong>{status}
        </div>
        {status.includes('fail') && 
        <div>
          <strong>Issue: </strong>{`${testProp} is set to ${failValue}`}
        </div>}
        <div>
          <strong>File Name: </strong>{fileName}
        </div>
        {start>0 && <div><strong>Line Number: </strong>{start}</div>}
        {/* {end>0 && <div><strong>End Line: </strong>{end}</div>} */}
        <div>
          <strong>File Path: </strong>{filePath}
        </div>
        <br></br>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
      </button>
      {expandBools[i] && <div className="m-5 flex flex-col rounded overflow-auto h-auto border border-transparent border-shadow shadow-lg p-3">
          <strong>Details: </strong>{description} 
          {status.includes('fail') && <button className="bg-blue-500 float-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick = {()=>handleClickChangeValue([filePath, fileName, testProp, !failValue, i, description])}> 
            Change the setting
          </button>}
          </div>}
    </div>);
  }

  return (
    <div className='col-span-6'>
      {conditional}
    </div>
  );
};

export default withRouter(ResultDisplay);
