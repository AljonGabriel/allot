import { createSlice } from '@reduxjs/toolkit';

const initialState = { commentAction: null };

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentAction: (state, action) => {
      state.commentAction = action.payload;
    },
  },
});

export const { setCommentAction } = commentsSlice.actions;

export default commentsSlice.reducer;
