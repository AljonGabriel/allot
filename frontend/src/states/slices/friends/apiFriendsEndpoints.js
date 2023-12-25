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
  }),
});

export const { useAddMutation } = apiUploadsEndpoints;
