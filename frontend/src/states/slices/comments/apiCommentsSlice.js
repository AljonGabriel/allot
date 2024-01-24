import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiCommentsSlice = createApi({
  reducerPath: 'apiComments',
  baseQuery,
  tagTypes: ['Comments'],
  endpoints: (builder) => ({}),
});
