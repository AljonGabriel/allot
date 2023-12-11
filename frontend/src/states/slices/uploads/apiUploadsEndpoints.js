import { apiUploadsSlice } from './apiUploadsSlice';
const UPLOAD_URL = '/api/uploads';

export const apiUploadsEndpoints = apiUploadsSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
    getUploads: builder.query({
      query: () => `${UPLOAD_URL}/view`,
    }),
    CreateProfilePic: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/createProfilePic`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useGetUploadsQuery,
  useCreateProfilePicMutation,
} = apiUploadsEndpoints;