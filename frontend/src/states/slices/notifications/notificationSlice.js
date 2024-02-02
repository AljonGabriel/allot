import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationAction: null,
};

const notificationSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setNotificationSlice: (state, action) => {
      state.notificationAction = action.payload;
    },
  },
});

export const { setNotificationSlice } = notificationSlice.actions;

export default notificationSlice.reducer;
