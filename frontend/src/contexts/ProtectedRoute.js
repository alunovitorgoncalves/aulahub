// frontend/src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  // Se não estiver autenticado, redireciona para /login
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
