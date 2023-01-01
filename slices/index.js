import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import searchStudio from './searchStudios';
import searchStudioService from './searchStudioServices';
import addStudio from './addStudioForm';

const rootReducer = combineReducers({
  searchStudio: searchStudio.reducer,
  searchStudioService: searchStudioService.reducer,
  addStudio: addStudio.reducer,
  // any other reducers here
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredPaths: [],
      },
    }).concat(),
});
