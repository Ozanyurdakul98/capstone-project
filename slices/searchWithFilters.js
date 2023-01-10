import { createSlice } from '@reduxjs/toolkit';

const searchWithFilters = createSlice({
  name: 'searchWithFilters',
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

export const { updatePoints, updateResults } = searchWithFilters.actions;

export default searchWithFilters;
