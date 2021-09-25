import { StringToken } from '@typescript-eslint/types/dist/ast-spec';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';

interface fileResult{
  start: number
  status: string
  end: number
  testProp: string
  failValue: boolean
}

const ResultDisplay = (props: any): JSX.Element => {
  
  const handleClickChangeValue = (arg:[string, string, boolean])=>{
    //@ts-expect-error
    bridgeAPI.changeValue(arg);
  }

  const conditional = [];

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
        {status.includes('fail') && <div><strong>Issue: </strong>{`${testProp} is set to ${failValue}`}</div>}
        {status.includes('fail') && 
          <button onClick = {()=>handleClickChangeValue([filePath+fileName, 'dd', !failValue])}> 
            Change the setting
          </button>}
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
