import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/users/authSlice';
import postsReducer from './slices/uploads/postSlice';
import friendsReducer from './slices/friends/friendsSlice';
import commentsReducer from './slices/comments/commentsSlice';

import { apiUsersSlice } from './slices/users/apiUsersSlice';
import { apiUploadsSlice } from './slices/uploads/apiUploadsSlice';
import { apiFriendsSlice } from './slices/friends/apiFriendsSlice';
import { apiCommentsSlice } from './slices/comments/apiCommentsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    friends: friendsReducer,
    comments: commentsReducer,

    [apiUsersSlice.reducerPath]: apiUsersSlice.reducer,
    [apiUploadsSlice.reducerPath]: apiUploadsSlice.reducer,
    [apiFriendsSlice.reducerPath]: apiFriendsSlice.reducer,
    [apiCommentsSlice.reducerPath]: apiCommentsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiUsersSlice.middleware)
      .concat(apiUploadsSlice.middleware)
      .concat(apiFriendsSlice.middleware)
      .concat(apiCommentsSlice.middleware),

  devTools: true,
});

export default store;
