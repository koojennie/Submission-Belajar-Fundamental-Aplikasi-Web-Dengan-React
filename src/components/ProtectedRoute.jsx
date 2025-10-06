import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ authedUser, children }) {
  if (!authedUser) return <Navigate to="/login" replace />;
  return children;
}