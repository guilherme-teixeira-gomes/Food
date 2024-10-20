import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext";
import toastError from "app/errors/toastError";
import { toast } from "react-toastify";

const ClienteRoute = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.type !== 'CLIENTE') {
    }
  }, [user]);

  return (
    user.type === 'CLIENTE' ? <Outlet /> : <Navigate to="/" />
  );
}

export default ClienteRoute;