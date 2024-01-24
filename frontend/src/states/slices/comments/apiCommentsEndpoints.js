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
  }),
});

export const { useAddCommentMutation } = apiCommentsEndpoints;
