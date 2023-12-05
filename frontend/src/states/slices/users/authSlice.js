import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },

    updateProfileImage: (state, action) => {
      // Update only the profileImage property in userInfo
      state.userInfo = {
        ...state.userInfo,
        profileImage: action.payload,
      };
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout, updateProfileImage } = authSlice.actions;

export default authSlice.reducer;
