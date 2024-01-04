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
    cancelRequest: builder.mutation({
      query: (feData) => ({
        url: `${BASE_URL}/delete`,
        method: 'DELETE',
        body: feData,
      }),
    }),
    acceptRequest: builder.mutation({
      query: (feRequesteeId, feRequesterId) => ({
        url: `${BASE_URL}/accept`,
        method: 'POST',
        body: feRequesteeId,
        feRequesterId,
      }),
    }),
  }),
});

export const {
  useAddMutation,
  useCheckRequestQuery,
  useCancelRequestMutation,
  useAcceptRequestMutation,
} = apiUploadsEndpoints;
