import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';

export const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/login" replace />;

  return children;
};
