import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {testResultsReducer} from './testResultsReducer'

const reducer =  combineReducers({testResults:testResultsReducer})
const initialState: boolean[] = []
const store = createStore(reducer, initialState, composeWithDevTools()) 


export default store