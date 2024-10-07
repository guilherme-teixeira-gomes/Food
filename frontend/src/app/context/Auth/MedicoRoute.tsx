import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext";
import toastError from "app/errors/toastError";
import { toast } from "react-toastify";

const MedicoRoute = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.type !== 'MEDICO') {
    }
  }, [user]);

  return (
    user.type === 'MEDICO' ? <Outlet /> : <Navigate to="/" />
  );
}

export default MedicoRoute;