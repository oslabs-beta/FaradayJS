import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState={gettingData: true}


const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {

    updateLoading(state){
      state.gettingData=!state.gettingData
    },
  },
});

export const { updateLoading} = loadingSlice.actions;
export default loadingSlice.reducer;