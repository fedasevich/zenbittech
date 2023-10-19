import { User } from '#/libs/types/User/User.type';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

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
    setCredentials: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      const user = jwt_decode<User>(token);
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
