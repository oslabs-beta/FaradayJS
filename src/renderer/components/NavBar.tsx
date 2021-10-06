import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import openFolderIcon from '../../icons/openFolder.svg';
import icon from '../../icons/iconTransparent.svg';
import ResultDisplay from './ResultDisplay'
import { RootState } from '../store';
import { newTestResults } from '../Slices/testResultSlice';
import IgnoreCards from './IgnoreCards'
import { setReduxTextInput, removeReduxTextInput, addIgnoreArr, ignoreItemsState } from '../Slices/ignoreItemsSlice';

const NavBar: () => JSX.Element = () => {
  const [textInput, setTextInput] = useState('');

  const state = useSelector(ignoreItemsState)
  const name = useSelector((state: RootState) => state.testResults.projectName);
  const dispatch = useDispatch();

  const handleClickOpenFolder = () => {
    //@ts-expect-error
    bridgeAPI.openFolder();

    //@ts-expect-error
    bridgeAPI.receiveData('preload:open-folder', (data: any)=>{
      console.log('data: ', data);
      dispatch(newTestResults(data));
    });
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    dispatch(setReduxTextInput(textInput));
    dispatch(addIgnoreArr(textInput));
    setTextInput('')
    dispatch(removeReduxTextInput());
  }

  useEffect(()=>{
    //console.log(state.ignoreArr);

    //@ts-expect-error
    bridgeAPI.addIgnore(state.ignoreArr);

  }, [state.ignoreArr])

  return(
    <div>
      <div className="grid grid-cols-2" id="results">
        <div className="justify-self-start"><button className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id='open-folder' onClick={handleClickOpenFolder}>
          <img className="fill-current w-4 h-4 mr-2" src={openFolderIcon}/>
          <span>Run Tests</span></button>
          <form>
            <input type='text' value={textInput} onChange={e=>setTextInput(e.target.value)}></input>
            <button onClick={e=>handleSubmit(e)}>submit</button>
          </form>
        <IgnoreCards/>
        </div>
        <div className="justify-self-end">
          <img className="object-right-top h-16" src={icon}/>
        </div>
      </div>
      <ResultDisplay />
    </div>
  );
}

export default withRouter(NavBar);