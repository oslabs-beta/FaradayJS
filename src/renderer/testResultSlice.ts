import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TestResultState {
    projectName: string,
    testResults: any[],
    expansionStatus: boolean[];
}

const initialState = {
    projectName: 'Joe',
    testResults: [],
    expansionStatus: []
} as TestResultState;

const testResultSlice = createSlice({
    name: 'testresult',
    initialState,
    reducers: {
        newTestResults(state, action: PayloadAction<any>) {
            // console.log(action.payload[0]);
            state.testResults = action.payload;
            console.log(state.testResults);
            for (let i = 0; i < state.testResults.length; i += 0) {
                state.expansionStatus.push(false);
            }
            state.projectName = 'Fred';
        },
        expandResult(state, action: PayloadAction<number>) {
            state.expansionStatus[action.payload] = !state.expansionStatus[action.payload];
        },
    },
});

export const { newTestResults, expandResult } = testResultSlice.actions;
export default testResultSlice.reducer;