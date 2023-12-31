import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;

export type FetchError = FetchBaseQueryError & {
  data: {
    statusCode: number;
    error: string;
    message: string;
  };
};

export const api = createApi({
  tagTypes: ['Buildings'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: 'same-origin',
    // mode: 'cors',
    // credentials: 'include',
    // mode: 'cors',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      // headers.set('Access-Control-Allow-Origin', '*');
      console.log(headers);

      return headers;
    }
  }),
  endpoints: () => ({})
});
