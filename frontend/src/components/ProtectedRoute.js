import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
export default function ProtectedRoute({ element: Component, ...props }) {
  const { pathname } = useLocation();
  
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" state={{ returnUrl: pathname }} replace />
  )
};