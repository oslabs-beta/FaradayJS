import { configureStore } from '@reduxjs/toolkit';
import testResultsReducer from './testResultSlice'

export const store = configureStore({
    reducer:  { testResults: testResultsReducer },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch