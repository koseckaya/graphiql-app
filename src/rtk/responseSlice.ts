import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AppState } from './store';

export interface ResponseState {
  data: object | null;
}

const initialState: ResponseState = {
  data: null,
};

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponse: (state, action: PayloadAction<object>) => {
      console.log('action.payload', action.payload);
      return {
        ...state,
        data: action.payload,
      };
    },
    clearResponse: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setResponse, clearResponse } = responseSlice.actions;

export const selectResponse = (state: AppState) => state.response.data;

export default responseSlice.reducer;
