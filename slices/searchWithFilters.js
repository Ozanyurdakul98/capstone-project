import { createSlice } from '@reduxjs/toolkit';

const searchWithFilters = createSlice({
  name: 'searchWithFilters',
  initialState: {
    results: [],
    mapPoints: [],
    //searchQuery is a boundingBox or center coordinates
    bbox: [],
    center: [],
  },
  reducers: {
    updateResults: (state, action) => {
      state.results = action.payload;
    },
    updatePoints: (state, action) => {
      state.mapPoints = action.payload;
    },
    updateBBox: (state, action) => {
      state.bbox = action.payload;
      state.center = [];
    },
    updateCenter: (state, action) => {
      state.bbox = [];
      state.center = action.payload;
    },
  },
});

export const { updatePoints, updateResults, updateBBox, updateCenter } = searchWithFilters.actions;

export default searchWithFilters;
