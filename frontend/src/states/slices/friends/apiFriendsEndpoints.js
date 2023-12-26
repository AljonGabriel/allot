import { apiFriendsSlice } from './apiFriendsSlice';

const BASE_URL = '/api/friends/';
export const apiUploadsEndpoints = apiFriendsSlice.injectEndpoints({
  endpoints: (builder) => ({
    add: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    checkRequest: builder.query({
      query: ({ feRequesteeId, feRequesterId }) => ({
        url: `${BASE_URL}/check`,
        method: 'GET',
        params: { feRequesterId, feRequesteeId },
      }),
    }),
  }),
});

export const { useAddMutation, useCheckRequestQuery } = apiUploadsEndpoints;
