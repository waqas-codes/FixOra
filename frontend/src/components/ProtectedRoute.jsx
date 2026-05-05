import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user info exists in localStorage
  const user = localStorage.getItem("user");

  // If no user is found, redirect to the sign-in page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If user exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;
