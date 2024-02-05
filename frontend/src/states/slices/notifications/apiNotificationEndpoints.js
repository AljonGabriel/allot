import { apiNotificationSlice } from './apiNotificationSlice';

const BASE_URL = '/api/v1/notifications/';
export const apiNotificationEndpoints = apiNotificationSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotification: builder.query({
      query: () => ({
        url: `${BASE_URL}/`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchNotificationQuery } = apiNotificationEndpoints;
