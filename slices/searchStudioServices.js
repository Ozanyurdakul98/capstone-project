import { createSlice } from '@reduxjs/toolkit';

const searchStudioService = createSlice({
  name: 'searchStudioService',
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

export const { updateResults, updatePoints } = searchStudioService.actions;

export default searchStudioService;
