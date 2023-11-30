import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/users/authSlice';
import { apiSlice } from './slices/users/apiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    //Below path is api
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
