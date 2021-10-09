import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ignoreItemsState, removeIgnoreArr } from '../Slices/ignoreItemsSlice';
import deleteIcon from '../../icons/deleteIcon.svg';

const IgnoreCards = (props:any) => {
  const state = useSelector(ignoreItemsState)
  const dispatch = useDispatch();
  
  const handleDelete = (x:string)=>{
    dispatch(removeIgnoreArr(x))
    //@ts-expect-error
    bridgeAPI.removeIgnore(x);
  }

  useEffect(()=>{
    //@ts-expect-error
    bridgeAPI.addIgnore(state.ignoreArr);
  }, [state.ignoreArr])

  const renderArr = state.ignoreArr.map(x=>{
    return(
    <div className="grid grid-cols-2 gap-6 justify-items-center rounded overflow-auto h-auto border border-transparent border-shadow shadow-lg p-1 hover:bg-blueGray-500 hover:border-gray-dark">
      <h1>
        {x}
      </h1>
      {/* className="border border-transparent pl-4 pr-4 hover:bg-blueGray-500 hover:border-white"  */}
      <button className="border border-transparent pl-4 pr-4 hover:bg-blueGray-500 hover:border-white" onClick={()=>handleDelete(x)}>
        <img className="fill-current w-4 h-4" src={deleteIcon}/>
      </button>
    </div>
  )})

  return(
    <div>
      {renderArr}
    </div>
  )
}

export default IgnoreCards