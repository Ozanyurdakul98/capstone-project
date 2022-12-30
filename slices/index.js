import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import searchSlice from './searchSlice';

const rootReducer = combineReducers({
  search: searchSlice.reducer,
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
