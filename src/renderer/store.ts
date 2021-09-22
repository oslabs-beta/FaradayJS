import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';    
import testResultsReducer from './testResultSlice'

// export const store = configureStore({
//     reducer:  { testResults: testResultsReducer },
// });

const reducer = combineReducers({ testResults: testResultsReducer });

export const store = createStore(reducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch