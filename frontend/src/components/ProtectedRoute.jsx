import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  // Check if user info exists in localStorage
  const userData = localStorage.getItem("user");

  // If no user is found, redirect to the sign-in page
  if (!userData) {
    return <Navigate to="/signin" replace />;
  }

  const user = JSON.parse(userData);

  // Role-based access control
  if (allowedRole && user.role !== allowedRole) {
    // If user is admin but trying to access customer route
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // If user is customer but trying to access admin route
    return <Navigate to="/dashboard" replace />;
  }

  // If user exists and role matches (or no role required), allow access
  return children;
};

export default ProtectedRoute;
