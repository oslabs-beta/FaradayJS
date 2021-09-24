import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import testResultsReducer from './testResultsReducer.ts'

const reducer =  combineReducers({testResults:testResultsReducer})
const initialState: Array<boolean> = []
const store = createStore(reducer, initialState, composeWithDevTools()) 


export default store