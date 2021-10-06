import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, createStore } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';    
import testResultsReducer from './Slices/testResultSlice'
import ignoreItemsSlice from './Slices/ignoreItemsSlice';

export const store = configureStore({
    reducer:  { 
      testResults: testResultsReducer,
      ignoreItems: ignoreItemsSlice
     },

});

//const reducer = combineReducers({ testResults: testResultsReducer });
//export const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

