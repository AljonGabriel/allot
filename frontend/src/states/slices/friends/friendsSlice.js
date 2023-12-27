import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friendAction: null,
};

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriendAction: (state, action) => {
      state.friendAction = action.payload;
    },
  },
});

export const { setFriendAction } = friendSlice.actions;

export default friendSlice.reducer;
