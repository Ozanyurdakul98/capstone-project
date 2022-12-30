import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    mapPoints: [],
    clusters: [],
  },
  reducers: {
    updateClusters: (state, action) => {
      state.clusters = action.payload;
    },
    updateResults: (state, action) => {
      state.results = action.payload;
    },
    updatePoints: (state, action) => {
      state.mapPoints = action.payload;
    },
  },
});

export const { updateClusters, updateResults, updatePoints } = searchSlice.actions;

export default searchSlice;
