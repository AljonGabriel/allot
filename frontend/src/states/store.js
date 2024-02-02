import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/users/authSlice';
import postsReducer from './slices/uploads/postSlice';
import friendsReducer from './slices/friends/friendsSlice';
import commentsReducer from './slices/comments/commentsSlice';
import notificationReducer from './slices/notifications/notificationSlice';

import { apiUsersSlice } from './slices/users/apiUsersSlice';
import { apiUploadsSlice } from './slices/uploads/apiUploadsSlice';
import { apiFriendsSlice } from './slices/friends/apiFriendsSlice';
import { apiCommentsSlice } from './slices/comments/apiCommentsSlice';
import { apiNotificationSlice } from './slices/notifications/apiNotificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    friends: friendsReducer,
    comments: commentsReducer,
    notifications: notificationReducer,

    [apiUsersSlice.reducerPath]: apiUsersSlice.reducer,
    [apiUploadsSlice.reducerPath]: apiUploadsSlice.reducer,
    [apiFriendsSlice.reducerPath]: apiFriendsSlice.reducer,
    [apiCommentsSlice.reducerPath]: apiCommentsSlice.reducer,
    [apiNotificationSlice.reducerPath]: apiNotificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiUsersSlice.middleware)
      .concat(apiUploadsSlice.middleware)
      .concat(apiFriendsSlice.middleware)
      .concat(apiCommentsSlice.middleware)
      .concat(apiNotificationSlice.middleware),

  devTools: true,
});

export default store;
