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

//react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RegisterRoute } from './routes/register/RegisterRoute.jsx';

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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
