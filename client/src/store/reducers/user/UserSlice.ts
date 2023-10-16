import { User } from '#/libs/types/User/User.type';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string }>) => {
      state.user = user;
      localStorage.setItem('token', token);
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    }
  }
});

export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;
