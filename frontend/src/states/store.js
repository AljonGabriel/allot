import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/users/authSlice';

import { apiUsersSlice } from './slices/users/apiUsersSlice';
import { apiUploadsSlice } from './slices/uploads/apiUploadsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,

    //Below path is api
    [apiUsersSlice.reducerPath]: apiUsersSlice.reducer,
    [apiUploadsSlice.reducerPath]: apiUploadsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiUsersSlice.middleware)
      .concat(apiUploadsSlice.middleware),

  devTools: true,
});

export default store;
