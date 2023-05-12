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
  headers: string;
}

const initialState: DataState = {
  editorText: '',
  responseText: 'There will be a response',
  variables: '',
  headers: '',
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
    setHeaders: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        headers: action.payload,
      };
    },
    setVariables: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        variables: action.payload,
      };
    },
  },
});

export const { setEditorText, setHeaders, setVariables } = dataSlice.actions;

export const selectEditorText = (state: AppState) => state.data.editorText;
export const selectEditorData = (state: AppState) => {
  return {
    editorText: state.data.editorText,
    variables: state.data.variables,
    headers: state.data.headers,
  };
};

export default dataSlice.reducer;
