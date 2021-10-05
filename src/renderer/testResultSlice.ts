import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {updateLoading} from'./loadingSlice'

interface fileResult {
    start: number
    status: string
    end: number
    testProp: string
    failValue: boolean
  }

  interface testResult {
    fileName: string,
    filePath: string,
    fileResults: fileResult
  }

export interface TestResultState {
    projectName: string,
    testResults: testResult[],
    expansionStatus: boolean[],
    fixedStatus: boolean[],
    morphBools: boolean[],
    simpleBool: boolean,
}

const initialState = {
    projectName: '',
    testResults: [],
    expansionStatus: [],
    fixedStatus: [],
    morphBools: [],
    simpleBool: false,
} as TestResultState;

const testResultSlice = createSlice({
    name: 'testresult',
    initialState,
    reducers: {
        // resetResults(state){state.testResults=[]},

        newTestResults(state, action: PayloadAction<any>) {
            console.log('payload: ',action.payload);
            state.testResults = action.payload;
            state.fixedStatus=[]
            // console.log(state.testResults);
            // for (let i = 0; i < state.testResults.length; i += 1) {
            //     state.expansionStatus.push(false);
            //     state.fixedStatus.push(false)
            // }
            


        },
        expandResult(state, action: PayloadAction<number>) {
            state.expansionStatus[action.payload] = !state.expansionStatus[action.payload];
        },
        updateResult(state, action: PayloadAction<number>) {
          // console.log('action.payload: ',action.payload)
          state.fixedStatus[action.payload] = true
      },
    },
});

export const { newTestResults, expandResult, updateResult} = testResultSlice.actions;
export default testResultSlice.reducer;