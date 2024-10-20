import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";



const AdministracaoRoute = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.type !== "ADMINISTRACAO") {
    }
  }, [user]);

  return (
    user.type === 'ADMINISTRACAO' ? <Outlet /> : <Navigate to="/" />
  );
};
export default AdministracaoRoute;