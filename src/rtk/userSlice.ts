import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AppState } from './store';

export interface UserState {
  email: string;
  id: string;
  fullName?: string;
  token: string;
}

const initialState: UserState = {
  email: '',
  id: '',
  fullName: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.email = '';
      state.id = '';
      state.fullName = '';
      state.token = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
