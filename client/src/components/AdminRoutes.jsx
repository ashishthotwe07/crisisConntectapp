import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthSelector } from "../redux/reducers/authSlice";
import { useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useSelector(AuthSelector);
  let location = useLocation();

  if (user.role === "customer") {
    return (
      <Navigate to="/dashboard/profile" state={{ from: location }} replace />
    );
  }
  return children;
};

export default AdminRoute;
