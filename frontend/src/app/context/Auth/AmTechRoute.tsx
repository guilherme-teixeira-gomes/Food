import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";



const AmTechRoute = () => {
    const { user } = useContext(AuthContext);
  

    useEffect(() => {
      if (user.type !== 'AMTECH' && user.type !== 'USUARIO_AMTECH') {
      }
    }, [user]);
    
    return (
      user.type === 'AMTECH' || user.type === 'USUARIO_AMTECH' ? <Outlet /> : <Navigate to="/home" />
    );
  }
  
export default AmTechRoute;