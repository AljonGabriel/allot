import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiUploadsSlice = createApi({
  reducerPath: 'apiUploads',
  baseQuery,
  tagTypes: ['Uploads'],
  endpoints: (builder) => ({}),
});
