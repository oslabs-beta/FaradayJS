import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

interface fileResult{
  start: number
  status: string
  end: number
  testProp: string
  failValue: boolean
}

const ResultDisplay = (props: any): JSX.Element => {
  const conditional:any = [];
  
  const handleClickChangeValue = async (args:[string, string, string, boolean, number])=>{
    //@ts-expect-error
    bridgeAPI.changeValue(args);

    //@ts-expect-error
    bridgeAPI.refreshCode(args);

    //@ts-expect-error
    bridgeAPI.receiveData('preload:refreshed-obj', (data: any)=>{
      //console.log('data: ', data);
    });
  }

  for (let i = 0; i < props.newData.length; i++) {
    const fileName:string = props.newData[i].fileName;
    const filePath:string = props.newData[i].filePath;
    const {start, status, end, testProp, failValue}:fileResult = props.newData[i].fileResults;

    let components = 
    <div className="w-full p-3">
      <div className="flex flex-col rounded overflow-auto h-auto border border-transparent border-shadow shadow-lg p-3 hover:bg-blueGray-500 hover:border-gray-darkest">
        <div>
          <strong>Test: </strong>{testProp}
        </div>
        <div className={status.includes('pass') ? "text-green-700" : "text-red-700"}>
          <strong>Status: </strong>{status}
        </div>
        {status.includes('fail') && 
        <div>
          <strong>Issue: </strong>{`${testProp} is set to ${failValue}`}
          <button className="bg-blue-500 float-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick = {()=>handleClickChangeValue([filePath, fileName, testProp, !failValue, i])}> 
            Change the setting
          </button>
        </div>}
        <div>
          <strong>File Name: </strong>{fileName}
        </div>
        {start>0 && <div><strong>Start: </strong>{start}</div>}
        {end>0 && <div><strong>End: </strong>{end}</div>}
        <div>
          <strong>File Path: </strong>{filePath}
        </div>
        <br></br>
      </div>
    </div>
    conditional.push(components)
  }

  return (
    <div className='col-span-6'>
      {conditional}
    </div>
  );
};

export default withRouter(ResultDisplay);
