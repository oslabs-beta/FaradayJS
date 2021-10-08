import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ignoreItemsState, removeIgnoreArr } from '../Slices/ignoreItemsSlice';

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
    <div>
      <h1>
        {x}
        <button onClick={()=>handleDelete(x)}>X</button>
      </h1>
    </div>
  )})

  return(
    <div>
      {renderArr}
    </div>
  )
}

export default IgnoreCards