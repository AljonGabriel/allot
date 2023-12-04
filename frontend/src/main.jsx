import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import axios from 'axios';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './scss/custom.css';

//Date Picker Css
import './../node_modules/react-datepicker/dist/react-datepicker.css';

//Routes
import ErrorPage from './context/errorPage/ErrorPage.jsx';
import LoginRoute from './routes/login/LoginRoute.jsx';
import HomeRoute from './routes/home/homeRoute.jsx';
import RegisterRoute from './routes/register/RegisterRoute.jsx';

//react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Redux
import store from './states/store.js';
import { Provider } from 'react-redux';
import AddProfile from './routes/addProfle/AddProfile.jsx';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginRoute />,
  },
  {
    path: '/register',
    element: <RegisterRoute />,
  },
  {
    path: '/addprofile',
    element: <AddProfile />,
  },
  {
    path: '/home',
    element: <HomeRoute />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
);
