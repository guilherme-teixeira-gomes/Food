/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Outlet, Navigate, Route, Routes, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";

import MedicoRoute from "app/context/Auth/MedicoRoute";
import OperadoraRoute from "app/context/Auth/OperadoraRoute";
import AmTechRoute from "app/context/Auth/AmTechRoute";


import RedirectPage from "app/pages/RedirectPage";
import AmTechAndPrestadorRoute from "app/context/Auth/AmTechAndPrestadorRoute";

import TelaInicial from "app/pages/Home";
import CriarChamados from "app/pages/CriarChamados";
import Formularios from "app/pages/Formularios";
import Chamados from "app/pages/Chamados";

import Perfil from "app/pages/PerfilInconnet"
import Configuracoes from "app/pages/Configuracoes"
import Faq from "app/pages/Faq";

export enum RoutesPath {
  LOGIN = "/login",


  TELA_INICIAL = "/home",
  CRIAR_CHAMADOS = "/criarchamados",
  FORMULARIOS = "/formulario",
  CHAMADOS = "/chamados",
  FAQ = "/faq",
  PERFIL = "/perfil",
  CONFIGURACOES = "/configuracoes",





  AMTECH_PROFILE = "/perfil/amtech",
  AMTECH_DASHBOARD = "/home",
  MAIN_PAGE = "",


  RECOVER_PASSWORD = "/recuperar/senha",
  CHANGE_PASSWORD = "/modificar_acesso",


}

const ProviderRoutes = () => {
  const { loading, typeUser, isAuth, user, handleValidateToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [recoverToken, setRecoverToken] = useState("");

  const validateToken = async () => {
    const token = localStorage.getItem('token');


    if (typeof token === "string") {
      const { result } = await handleValidateToken(token);

      const availablePaths = ["/login"];

      if ( !availablePaths.includes(location.pathname)) {
  
      };

      if (result) return;
    }

    navigate("/login");
  }

  useEffect(() => {
    const recoverToken = localStorage.getItem('Token_Recuperação');

    if (typeof recoverToken === "string") {
      setRecoverToken(recoverToken);
    }
  }, [recoverToken])

  const isAmtech = (): boolean => {
    return ["AMTECH", "USUARIO_AMTECH"].includes(user.type);
  }

  useEffect(() => {
    validateToken()
  }, []);

  return (
    <Routes>
      <Route path={RoutesPath.LOGIN} element={<Login />} />
      <Route path={RoutesPath.RECOVER_PASSWORD} element={<RecoverPassword />} />
      <Route path={RoutesPath.TELA_INICIAL} element={<TelaInicial />} />
      <Route path={RoutesPath.CRIAR_CHAMADOS} element={<CriarChamados />} />
      <Route path={RoutesPath.FORMULARIOS} element={<Formularios />} />
      <Route path={RoutesPath.CHAMADOS} element={<Chamados />} />
      <Route path={RoutesPath.FAQ} element={<Faq />} />
      <Route path={RoutesPath.PERFIL} element={<Perfil />} />
      <Route path={RoutesPath.CONFIGURACOES} element={<Configuracoes />} />



      {!loading && (
        <>
          <Route path={"/"} element={<RedirectPage />} />
      
          <Route element={<MedicoRoute />}>
      
          
          </Route>

          <Route element={<AmTechAndPrestadorRoute />}>
        
          
          </Route>

          <Route element={<OperadoraRoute />}>
            
        
            {/* Other routes related to the 'OPERADORA' type user */}
          </Route>

          <Route element={<AmTechRoute />}>
        
         
          </Route>
        </>
      )}
    </Routes>
  );
};

export default ProviderRoutes;
