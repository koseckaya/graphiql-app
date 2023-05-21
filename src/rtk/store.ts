import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { api } from './apiSlice';
import { dataSlice } from './dataSlice';
import { userSlice } from './userSlice';

const persistConfig = {
  type: REGISTER,
  key: 'root',
  storage,
  timeout: 1000,
  whitelist: [userSlice.name],
};

const reducers = {
  [dataSlice.name]: dataSlice.reducer,
  [api.reducerPath]: api.reducer,
  [userSlice.name]: userSlice.reducer,
};

const reducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, reducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });

type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
