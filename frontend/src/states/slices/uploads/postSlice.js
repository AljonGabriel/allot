import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postedData: [],
};

const postSLice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.postedData = action.payload;
    },
  },
});

export const { setPosts } = postSLice.actions;

export default postSLice.reducer;
