import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const useAuth = () => useContext(UserContext);

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    console.log("not logged in!");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};
