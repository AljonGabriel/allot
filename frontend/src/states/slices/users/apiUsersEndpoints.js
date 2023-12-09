import { apiUsersSlice } from './apiUsersSlice';
const USERS_URL = '/api/users';

export const apiUsersEndpoints = apiUsersSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify`,
        method: 'POST',
        body: data,
      }),
    }),
    create: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    uploadProfilePic: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile-upload`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyMutation,
  useCreateMutation,
  useLogoutMutation,
  useUploadProfilePicMutation,
} = apiUsersEndpoints;
