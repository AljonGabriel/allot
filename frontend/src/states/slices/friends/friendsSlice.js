import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friendRequest: null,
};

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setRequest: (state, action) => {
      state.friendRequest = action.payload;
    },
  },
});

export const { setRequest } = friendSlice.actions;

export default friendSlice.reducer;
