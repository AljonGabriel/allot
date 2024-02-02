import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiNotificationSlice = createApi({
  reducerPath: 'apiNotifications',
  baseQuery,
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({}),
});
