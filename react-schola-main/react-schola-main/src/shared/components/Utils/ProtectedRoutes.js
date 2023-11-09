import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const ProtectedRoutes = ({ allowedRoles, children }) => {
  const { userRole } = useContext(AuthContext);

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
