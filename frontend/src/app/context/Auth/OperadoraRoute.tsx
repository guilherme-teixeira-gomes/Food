import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";



const OperadoraRoute = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.type !== "OPERADORA" && user.type !== "USER_OPERADORA") {
    }
  }, [user]);

  return (
    user.type === "OPERADORA" || user.type === "USER_OPERADORA" ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  );
};
export default OperadoraRoute;