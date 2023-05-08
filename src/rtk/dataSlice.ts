import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AppState } from './store';
// import { HYDRATE } from 'next-redux-wrapper';

export type Headers = {
  [key: string]: string;
};

export interface DataState {
  editorText: string;
  responseText: string;
  variables: string;
  headers: Headers;
}

const initialState: DataState = {
  editorText: '',
  responseText: 'There will be a response',
  variables: '{}',
  headers: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setEditorText: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        editorText: action.payload,
      };
    },
  },
});

export const { setEditorText } = dataSlice.actions;

export const selectEditorText = (state: AppState) => state.data.editorText;

export default dataSlice.reducer;
