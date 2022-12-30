import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    mapPoints: [],
  },
  reducers: {
    updateResults: (state, action) => {
      state.results = action.payload;
    },
    updatePoints: (state, action) => {
      state.mapPoints = action.payload;
    },
  },
});

export const { updateResults, updatePoints } = searchSlice.actions;

export default searchSlice;
