import { createSlice } from '@reduxjs/toolkit';
import {TestResultState} from './testResultSlice'

interface Ostate{
  testresult: TestResultState,
  ignoreItems: IState
}

interface IState{
  textInput:string,
  ignoreArr: string[]
}

interface addIgnoreState{
    payload: string;
    type: string;
}


export const ignoreItems = createSlice({
  name: 'ignoreItems',
  initialState:{
    textInput: '',
    ignoreArr: []
  },
  reducers:{
    setReduxTextInput: (state, action) =>{
      state.textInput = action.payload;
    },
    removeReduxTextInput: (state)=>{
      state.textInput = '';
    },
    addIgnoreArr: (state:IState, action:addIgnoreState) =>{
      state.ignoreArr = [...state.ignoreArr, action.payload]
    },
    removeIgnoreArr: (state:IState, action:addIgnoreState)=>{
      let tempArr = [...state.ignoreArr];
      const index = tempArr.indexOf(action.payload);
      tempArr.splice(index, 1); // Remove 1 element at index
      state.ignoreArr = tempArr;
    }
  }

})

export const { setReduxTextInput, removeReduxTextInput, addIgnoreArr, removeIgnoreArr } = ignoreItems.actions;
export default ignoreItems.reducer;
export const ignoreItemsState = (state:Ostate) => state.ignoreItems;