import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

//Routes
import Login from './pages/login/Login.jsx';

//react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
