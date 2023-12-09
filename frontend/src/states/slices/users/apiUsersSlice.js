import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiUsersSlice = createApi({
  reducerPath: 'apiUsers',
  baseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({}),
});
