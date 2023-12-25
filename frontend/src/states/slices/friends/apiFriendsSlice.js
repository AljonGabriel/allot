import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiFriendsSlice = createApi({
  reducerPath: 'apiFriends',
  baseQuery,
  tagTypes: ['Friends'],
  endpoints: (builder) => ({}),
});
