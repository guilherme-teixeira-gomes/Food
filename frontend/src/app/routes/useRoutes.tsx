/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Outlet, Navigate, Route, Routes, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";
import RedirectPage from "app/pages/RedirectPage";
import TelaInicial from "app/pages/Home";
import Formularios from "app/pages/Formularios";
import Perfil from "app/pages/PerfilInconnet"
import Configuracoes from "app/pages/Configuracoes"
import Faq from "app/pages/Faq";
import CadastrarAlimentos from "app/pages/CadastrarAlimentos";
import Comidas from "app/pages/Comidas";
import Aprovacao from "app/pages/Aprovacao";
import ClienteRoute from "app/context/Auth/ClienteRoute";
import SuperAdminRoute from "app/context/Auth/SuperAdminRoute";
import AdministracaoRoute from "app/context/Auth/AdministracaoRoute";
import AdmineSuperAdmin from "app/context/Auth/AdmineSuperAdmin";
import Signup from "app/pages/Signup";
import Historico from "app/pages/Historico";
import HistoricoTodosClientes from "app/pages/HistoricoTodosClientes";
import Administradores from "app/pages/Administradores";
import Clientes from "app/pages/Clientes";

export enum RoutesPath {
  LOGIN = "/login",


  TELA_INICIAL = "/home",
  CARDAPIO = "/cardapio",
  APROVACAO = "/aprovacao",
  FORMULARIOS = "/formulario",
  CADASTRAR_ALIMENTOS = "/cadastrar-alimentos",
  FAQ = "/faq",
  HISTORICO = "/historico",
  HISTORICO_TODOS_CLIENTES = "/historico/clientes",
  CADASTRO = "/cadastrar",
  ADMINISTRADORES = "/administradores",
  CLIENTES = "/clientes",
  PERFIL = "/perfil",
  CONFIGURACOES = "/configuracoes",
  SUPERADMIN_PROFILE = "/perfil/super-admin",
  SUPERADMIN_DASHBOARD = "/home",
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

      if (!availablePaths.includes(location.pathname)) {

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


  useEffect(() => {
    validateToken()
  }, []);

  return (
    <Routes>
      <Route path={RoutesPath.LOGIN} element={<Login />} />
      <Route path={RoutesPath.CADASTRO} element={<Signup />} />
      <Route path={RoutesPath.RECOVER_PASSWORD} element={<RecoverPassword />} />
      {!loading && (
        <>
          <Route path={"/"} element={<RedirectPage />} />

          <Route element={<ClienteRoute />}>
            <Route path={RoutesPath.TELA_INICIAL} element={<TelaInicial />} />
            <Route path={RoutesPath.CARDAPIO} element={<Comidas />} />
            <Route path={RoutesPath.HISTORICO} element={<Historico />} />
            <Route path={RoutesPath.FAQ} element={<Faq />} />
            <Route path={RoutesPath.PERFIL} element={<Perfil />} />
            <Route path={RoutesPath.CONFIGURACOES} element={<Configuracoes />} />

          </Route>

          <Route element={<AdmineSuperAdmin />}>
            <Route path={RoutesPath.TELA_INICIAL} element={<TelaInicial />} />
            <Route path={RoutesPath.CARDAPIO} element={<Comidas />} />
            <Route path={RoutesPath.ADMINISTRADORES} element={<Administradores />} />
            <Route path={RoutesPath.CLIENTES} element={<Clientes />} />
            <Route path={RoutesPath.HISTORICO} element={<Historico />} />
            <Route path={RoutesPath.HISTORICO_TODOS_CLIENTES} element={<HistoricoTodosClientes />} />
            <Route path={RoutesPath.APROVACAO} element={<Aprovacao />} />
            <Route path={RoutesPath.FORMULARIOS} element={<Formularios />} />
            <Route path={RoutesPath.CADASTRAR_ALIMENTOS} element={<CadastrarAlimentos />} />
            <Route path={RoutesPath.FAQ} element={<Faq />} />
            <Route path={RoutesPath.PERFIL} element={<Perfil />} />
            <Route path={RoutesPath.CONFIGURACOES} element={<Configuracoes />} />

          </Route>

          <Route element={<AdministracaoRoute />}>
          <Route path={RoutesPath.TELA_INICIAL} element={<TelaInicial />} />
            <Route path={RoutesPath.CARDAPIO} element={<Comidas />} />
            <Route path={RoutesPath.ADMINISTRADORES} element={<Administradores />} />
            <Route path={RoutesPath.CLIENTES} element={<Clientes />} />
            <Route path={RoutesPath.HISTORICO_TODOS_CLIENTES} element={<HistoricoTodosClientes />} />
            <Route path={RoutesPath.APROVACAO} element={<Aprovacao />} />
            <Route path={RoutesPath.CADASTRAR_ALIMENTOS} element={<CadastrarAlimentos />} />
            <Route path={RoutesPath.FAQ} element={<Faq />} />
            <Route path={RoutesPath.PERFIL} element={<Perfil />} />
            <Route path={RoutesPath.CONFIGURACOES} element={<Configuracoes />} />
          </Route>

          <Route element={<SuperAdminRoute />}>

          <Route path={RoutesPath.TELA_INICIAL} element={<TelaInicial />} />
            <Route path={RoutesPath.CARDAPIO} element={<Comidas />} />
            <Route path={RoutesPath.ADMINISTRADORES} element={<Administradores />} />
            <Route path={RoutesPath.CLIENTES} element={<Clientes />} />
            <Route path={RoutesPath.HISTORICO} element={<Historico />} />
            <Route path={RoutesPath.HISTORICO_TODOS_CLIENTES} element={<HistoricoTodosClientes />} />
            <Route path={RoutesPath.APROVACAO} element={<Aprovacao />} />
            <Route path={RoutesPath.FORMULARIOS} element={<Formularios />} />
            <Route path={RoutesPath.CADASTRAR_ALIMENTOS} element={<CadastrarAlimentos />} />
            <Route path={RoutesPath.FAQ} element={<Faq />} />
            <Route path={RoutesPath.PERFIL} element={<Perfil />} />
            <Route path={RoutesPath.CONFIGURACOES} element={<Configuracoes />} />
          </Route>
        </>
      )}
    </Routes>
  );
};

export default ProviderRoutes;
