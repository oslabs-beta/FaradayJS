import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { expandResult, updateResult } from '../testResultSlice';


interface fileResult{
  start: number
  status: string
  end: number
  testProp: string
  failValue: boolean
}

const ResultDisplay = (): JSX.Element => {

  const newData = useSelector((state: RootState) => state.testResults.testResults);
  const expandBools = useSelector((state: RootState) => state.testResults.expansionStatus);
  const fixedBools = useSelector((state: RootState) => state.testResults.fixedStatus);
  const dispatch = useDispatch();
  
  const handleClickChangeValue = async (args:[string, string, string, boolean, number])=>{
    //@ts-expect-error
    bridgeAPI.changeValue(args);

    //@ts-expect-error
    bridgeAPI.refreshCode(args);

    //@ts-expect-error
    bridgeAPI.receiveData('preload:refreshed-obj', (data: any)=>{
      // if(data.status.includes('pass')) console.log(data); 
      // data['id']=args[4]
      if(data.status.includes('pass')){
        dispatch(updateResult(args[4])); 
        dispatch(expandResult(args[4]))
      }
      // conditional[args[4]]=data
    });
  }

  useEffect(()=>{

  },[newData])

  const conditional: Array<JSX.Element> = [];

  for (let i = 0; i < newData.length; i++) {
    const fileName:string = newData[i].fileName;
    const filePath:string = newData[i].filePath;
    const {start, status, end, testProp, failValue}:fileResult = newData[i].fileResults;

    conditional.push(
    <div className="w-full p-3" key={i}>
        <button onClick={() => dispatch(expandResult(i))} className="flex flex-col rounded overflow-auto h-auto border border-transparent border-shadow shadow-lg p-3 hover:bg-blueGray-500 hover:border-gray-darkest">
        <div>
          <strong>Test: </strong>{testProp}
        </div>
        {status.includes('pass') &&
           <div>
           <strong>Status: <span className={"text-green-900"}>{status}</span></strong>
         </div>
        }
        {(!status.includes('pass')&&!fixedBools[i])&&
        <div>
          <strong>Status: <span className={"text-red-700"}>{status}</span></strong>
        </div>}
        {fixedBools[i]&&<div>
          <strong>Status: <span className={"text-green-900"}>pass</span></strong>
        </div>}
        {(status.includes('fail')&&!fixedBools[i]) && 
        <div>
          <strong>Issue: </strong>{`${testProp} is set to ${failValue}`}
        </div>}
        <div>
          <strong>File Name: </strong>{fileName}
        </div>
        {(start>0&&!fixedBools[i]) && <div><strong>Line Number: </strong>{start}</div>}
        {/* {end>0 && <div><strong>End Line: </strong>{end}</div>} */}
        <div>
          <strong>File Path: </strong>{filePath}
        </div>
        <br></br>
        {fixedBools[i] &&
          <div className="m-15 mb-15 bg-green-100 border-t-4 border-green-500 rounded-b text-teal-900 px-4 py-3 shadow-md">
            <div className="flex">
              <div className="py-1"><svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p className="font-bold">The setting has been changed</p>
                <p className="text-sm">The previous setting was <strong>{`${failValue}`}</strong>.</p>
              </div>
            </div>
          </div>}
          <br></br>
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-15 h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>

      </button>
      {expandBools[i] && <div className="m-5 flex flex-col rounded overflow-auto h-auto border border-transparent border-shadow shadow-lg p-3">
          <strong>Details: </strong>This matters because... 
          {(status.includes('fail')&& !fixedBools[i]) && <button className="bg-blue-500 float-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick = {()=>handleClickChangeValue([filePath, fileName, testProp, !failValue, i])}> 
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
