import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    morphBools: boolean[],
    simpleBool: boolean
}

const initialState = {
    projectName: '',
    testResults: [],
    expansionStatus: [],
    morphBools: [],
    simpleBool: false
} as TestResultState;

const testResultSlice = createSlice({
    name: 'testresult',
    initialState,
    reducers: {
        newTestResults(state, action: PayloadAction<any>) {
            // console.log(action.payload[0]);
            state.testResults = action.payload;
            console.log(state.testResults);
            for (let i = 0; i < state.testResults.length; i += 1) {
                state.expansionStatus.push(false);
            }
        },
        expandResult(state, action: PayloadAction<number>) {
            state.expansionStatus[action.payload] = !state.expansionStatus[action.payload];
        },
    },
});

export const { newTestResults, expandResult } = testResultSlice.actions;
export default testResultSlice.reducer;