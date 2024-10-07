import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";



const AmTechAndPrestadorRoute = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!["OPERADORA","USER_OPERADORA", "AMTECH", "USUARIO_AMTECH"].includes(user.type)) {
      toast.error('Acesso negado');
    }
  }, [user]);

  return (
    ["OPERADORA","USER_OPERADORA", "AMTECH", "USUARIO_AMTECH"].includes(user.type) ? <Outlet /> : <Navigate to="/home" />
  );
}

export default AmTechAndPrestadorRoute;