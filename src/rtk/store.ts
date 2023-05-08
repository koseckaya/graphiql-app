import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { api } from './apiSlice';
import { dataSlice } from './dataSlice';

const reducers = {
  [dataSlice.name]: dataSlice.reducer,
  [api.reducerPath]: api.reducer,
};

const reducer = combineReducers(reducers);

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
