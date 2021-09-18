import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TestResultState {
    projectName: string,
    testResults: any[],
    expansionStatus: boolean[];
}

const initialState = {
    projectName: '',
    testResults: [],
    expansionStatus: []
} as TestResultState;

export const testResultSlice = createSlice({
    name: 'testresult',
    initialState,
    reducers: {
        newTestResults(state, action: PayloadAction<any>) {
            state.testResults = action.payload;
            for (let i = 0; i < state.testResults.length; i += 0) {
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