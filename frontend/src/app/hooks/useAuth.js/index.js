/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import openSocket from "socket.io-client";

import { toast } from "react-toastify";
import * as Yup from "yup";

import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { RoutesPath } from "app/routes/useRoutes";

const useAuth = () => {
  const history = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: 0,
    type: "",
    status: ""
  });

  const [typeUser, setTypeUser] = useState("");

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
        setIsAuth(true);
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log('Interceptor')
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { data } = await api.post("/auth/refresh_token");

        if (data) {
          localStorage.setItem("token", JSON.stringify(data.token));
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
        }
        return api(originalRequest);
      }
      if (error?.response?.status === 401) {
        console.log("Erro na autentificação")
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = undefined;
        setIsAuth(false);
      }
      return Promise.reject(error);
    },
  );

  useLayoutEffect(() => {
    const idUser = localStorage.getItem("idUser");
    const typeUser = localStorage.getItem("typeUser");

    if (
      typeof idUser === "number" ||
      (typeof idUser === "string" && typeof typeUser === "string")
    ) {
      setUser({ id: idUser, type: typeUser, status: "ok" });
    }
  }, []);

  const handleLogin = async (userData, rememberLogin) => {
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", userData);

      localStorage.setItem("token", JSON.stringify(data.token));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      if (rememberLogin === true) {
        localStorage.setItem("loginData", JSON.stringify(userData));
      }

      setUser({
        id: data.user.id,
        type: data.user.admin,
        status: data.user.status || "OK",
      });

      localStorage.setItem(
        "typeUser",
        JSON.stringify(data.user.admin),
      );
      localStorage.setItem("idUser", JSON.stringify(data.user.id));

      setIsAuth(true);
      toast.success(i18n.t("auth.toasts.success"));
      console.log("Cadastrado com sucesso");

      setLoading(false);
      return {
        success: true,
        type: data.user.admin,
        status: data.user.status || "OK",
      };
      // setTimeout(() => {
      //   history(RoutesPath.DASHBOARD);
      // }, 600);
    } catch (err) {
      toastError(err);
      setLoading(false);
    }
  };


  const handleLogout = async () => {
    setLoading(true);

    try {
      setIsAuth(false);
      setUser({});

      localStorage.removeItem("token");
      localStorage.removeItem("typeUser");
      localStorage.removeItem("idUser");
      api.defaults.headers.Authorization = undefined;

      setLoading(false);
      history(RoutesPath.LOGIN);
    } catch (err) {
      toastError(err);
      setLoading(false);
    }
  };


  const handleValidateToken = async () => {
    setLoading(true);

    try {
      const { data } = await api.post("/auth/refresh_token");

      setUser({
        id: data.user.id,
        type: data.user.admin,
        status: data.user.status || "OK",
      });

      // api.defaults.headers.Authorization = `Bearer ${data.token}`;

      localStorage.setItem("typeUser", JSON.stringify(data.user.admin));
      localStorage.setItem("idUser", JSON.stringify(data.user.id));

      setIsAuth(true);

      setLoading(false);
      return {
        result: true,
        type: data.user.admin,
        status: data.user.status || "OK"
      };

    } catch (e) {
      console.log(e);
      return false
    }
  }


  return {
    isAuth,
    user,
    typeUser,
    loading,
    handleLogin,
    handleLogout,
    handleValidateToken
  };
};

export default useAuth;
