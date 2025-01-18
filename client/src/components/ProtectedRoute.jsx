import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return children;
};
