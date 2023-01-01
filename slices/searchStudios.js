import { createSlice } from '@reduxjs/toolkit';

const searchStudio = createSlice({
  name: 'searchStudio',
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

export const { updatePoints, updateResults } = searchStudio.actions;

export default searchStudio;
