import { apiCommentsSlice } from './apiCommentsSlice';

const BASE_URL = '/api/v1/comments/';

export const apiCommentsEndpoints = apiCommentsSlice.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (inputData) => ({
        url: `${BASE_URL}/`,
        method: 'POST',
        body: inputData,
      }),
    }),
    viewPostComments: builder.query({
      query: (inputData) => ({
        url: `${BASE_URL}/view`,
        method: 'GET',
        params: inputData,
      }),
    }),
    deleteAllComment: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/deleteAllComment`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddCommentMutation,
  useViewPostCommentsQuery,
  useDeleteAllCommentMutation,
} = apiCommentsEndpoints;
