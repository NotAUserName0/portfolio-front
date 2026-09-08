import { Navigate, Outlet } from 'react-router-dom';

export const adminGuard = () => {
  const token = localStorage.getItem('token');

  // If no token is found, redirect to the admin login page
  // replace ensures that the navigation stack is updated correctly
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // If a token is found, allow access to the admin routes
  return <Outlet />;
};

export const panelGuard = () => {
  const token = localStorage.getItem('token');

  // If a token is found, redirect to the admin panel
  if (token) {
    return <Navigate to="/admin/panel" replace />;
  }

  // If no token is found, allow access to the admin login page
  return <Outlet />;
};