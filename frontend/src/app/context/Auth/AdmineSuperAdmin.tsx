import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";



const AdmineSuperAdmin = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!["ADMINISTRACAO", "SUPERADMIN"].includes(user.type)) {
      toast.error('Acesso negado');
    }
  }, [user]);

  return (
    ["ADMINISTRACAO","SUPERADMIN"].includes(user.type) ? <Outlet /> : <Navigate to="/home" />
  );
}

export default AdmineSuperAdmin;