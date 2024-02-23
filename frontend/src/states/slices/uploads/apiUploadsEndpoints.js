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
    createProfilePic: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/createProfilePic`,
        method: 'POST',
        body: data,
      }),
    }),
    getUploadsById: builder.query({
      query: ({ id }) => ({
        url: `${UPLOAD_URL}/viewById`,
        method: 'GET',
        params: { id },
      }),
    }),

    getSpecificUploadsById: builder.query({
      query: ({ img }) => ({
        url: `${UPLOAD_URL}/viewSpecificById`,
        method: 'GET',
        params: { img },
      }),
    }),
    deleteOwnPost: builder.mutation({
      query: (postId) => ({
        url: `${UPLOAD_URL}/deleteOwnPost`,
        method: 'DELETE',
        body: postId,
      }),
    }),
    deleteAllPost: builder.mutation({
      query: () => ({
        url: `${UPLOAD_URL}/deleteAllPost`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useGetUploadsQuery,
  useCreateProfilePicMutation,
  useGetUploadsByIdQuery,
  useGetSpecificUploadsByIdQuery,
  useDeleteAllPostMutation,
  useDeleteOwnPostMutation,
} = apiUploadsEndpoints;
