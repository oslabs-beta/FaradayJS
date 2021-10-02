import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState={loading: false}


const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {

    updateLoading(state){
      state.loading=!state.loading
    },
  },
});

export const { updateLoading} = loadingSlice.actions;
export default loadingSlice.reducer;