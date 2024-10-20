import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";



const SuperAdminRoute = () => {
    const { user } = useContext(AuthContext);
  

    useEffect(() => {
      if (user.type !== 'SUPERADMIN') {
      }
    }, [user]);
    
    return (
      user.type === 'SUPERADMIN' ? <Outlet /> : <Navigate to="/home" />
    );
  }
  
export default SuperAdminRoute;