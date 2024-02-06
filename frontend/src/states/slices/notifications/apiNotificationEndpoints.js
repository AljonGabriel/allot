import { apiNotificationSlice } from './apiNotificationSlice';

const BASE_URL = '/api/v1/notifications/';
export const apiNotificationEndpoints = apiNotificationSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotification: builder.query({
      query: (feLoggedInUserId) => ({
        url: `${BASE_URL}/`,
        method: 'GET',
        params: feLoggedInUserId,
      }),
    }),
  }),
});

export const { useFetchNotificationQuery } = apiNotificationEndpoints;
