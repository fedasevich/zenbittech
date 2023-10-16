import { User } from '#/libs/types/User/User.type';
import { api } from '#/store/api';

export interface UserResponse {
  user: User;
  token: string;
}

export type SignRequest = Pick<User, 'email'> & {
  password: string;
};

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<UserResponse, SignRequest>({
      query: (body) => ({
        body,
        url: '/auth/sign-in',
        method: 'POST'
      })
    }),
    signUp: builder.mutation<UserResponse, SignRequest>({
      query: (body) => ({
        body,
        url: '/auth/sign-up',
        method: 'POST'
      })
    }),
    check: builder.query<User, void>({
      query: () => ({
        url: '/auth/check'
      })
    })
  })
});
