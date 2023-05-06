import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { dataSlice } from './dataSlice';

const reducers = {
  [dataSlice.name]: dataSlice.reducer,
};

const reducer = combineReducers(reducers);

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
