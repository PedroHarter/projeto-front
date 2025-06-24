import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Services from './routes/Services';
import Users from './routes/Users';
import Login from './routes/login';
import Dashboard from './routes/Dashboard';
import './index.css';
import AppLayout from './App';

const RouterWrapper = () => {

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'services', element: <Services /> },
        { path: 'users', element: <Users /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterWrapper />
  </React.StrictMode>
);
