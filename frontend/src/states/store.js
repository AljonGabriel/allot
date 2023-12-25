import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/users/authSlice';
import postsReducer from './slices/uploads/postSlice';

import { apiUsersSlice } from './slices/users/apiUsersSlice';
import { apiUploadsSlice } from './slices/uploads/apiUploadsSlice';
import { apiFriendsSlice } from './slices/friends/apiFriendsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,

    [apiUsersSlice.reducerPath]: apiUsersSlice.reducer,
    [apiUploadsSlice.reducerPath]: apiUploadsSlice.reducer,
    [apiFriendsSlice.reducerPath]: apiFriendsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiUsersSlice.middleware)
      .concat(apiUploadsSlice.middleware)
      .concat(apiFriendsSlice.middleware),

  devTools: true,
});

export default store;
