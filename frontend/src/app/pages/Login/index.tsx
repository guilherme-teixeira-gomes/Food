/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { i18n } from "../../translate/i18n";

import { AuthContext } from "../../context/Auth/AuthContext";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CssBaseline, Avatar, Button, Box, Grid, Card, Fade, useMediaQuery } from "@mui/material";
import LogoFundo from "../../assets/hungry.png";
import LogoCarregamento from "../../assets/hungry.png";
import Logo from "../../assets/hungry.png";
import { styled } from "@mui/material/styles";
import { RoutesPath } from "app/routes/useRoutes";
import toastError from "app/errors/toastError";
import { BackgroundImage } from "./styles";


const Paper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: "auto",
  height: "650px",
  backgroundColor: "#e6e3d9",
  borderRadius: "10px",
}));

const Content = styled("div")(({ theme }) => ({
  width: "100%",
  height: "650px",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Submit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0, 2),
  backgroundColor: "#30BC65",
  border: "1px solid transparent",
  color: "#e6e3d9",
  width: "300px",


  "&:hover": {
    backgroundColor: "#228a4a",
    border: "1px solid #30BC65",
    color: "#e6e3d9",
  },
}));

const LogoImg = styled("img")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  height: "auto",
  marginTop: theme.spacing(2),
}));

const LinksContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const PasswordInput = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0px 10px",
  marginBottom: "1rem",
}));

const ForgetBox = styled("div")(() => ({
  display: "flex",
  width: "100%",
}));

const Forget = styled(Link)(({ theme }) => ({
  padding: "0px 10px",
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  color: "#5A5A5D",
  textDecoration: "none",

  "&:hover": {
    color: "#5A5A5D",
  },
}));

const Label = styled("label")(() => ({
  marginLeft: "1rem",
  marginBottom: "0px",
}));

interface LoginDataTypes {
  origem: string | number | readonly string[] | undefined;
  user: string;
  password: string;
};

const BackgroundDiv = styled("div")(({ theme }) => ({
  backgroundImage: `url(${LogoFundo})`, // Usar a imagem de fundo importada
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
  height: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex", // Para centralizar verticalmente
  alignItems: "center", // Centralizar verticalmente
  justifyContent: "center", // Centralizar horizontalmente
}));

const Login = () => {
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("only screen and (max-width: 750px)");
  const [userData, setUserData] = useState<LoginDataTypes>({ user: "", password: "", origem: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const loginStorage = localStorage.getItem("loginData");

  const { handleLogin, customValidation } = useContext(AuthContext);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleLoginAndClose = () => {
    handleOpen();
    // Use setTimeout para atrasar o login e o redirecionamento
    setTimeout(() => {
      handleClose(); // Fecha o Backdrop
    }, 2000); // 2 segundos de atraso
  };

  const handleChangeInput = (e: any) => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const login = async () => {
    const response = await handleLogin(userData, rememberMe);
    try {

      if (response.success) {
        setTimeout(() => {
          navigate(RoutesPath.TELA_INICIAL);
        }, 1000); // 2 segundos de atraso
      }
    } catch (err) {
    }
  }

  useEffect(() => {
    if (loginStorage) {
      const data = JSON.parse(loginStorage);

      setUserData({
        user: data.user,
        password: data.password,
        origem: data.origem,
      });
    }
  }, []);

  return (

    <BackgroundImage >
      <div>

        <Backdrop
          sx={{ backgroundColor: "#fe6600", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundImage: `url(${LogoCarregamento})`, backgroundRepeat: 'no-repeat', backgroundPosition: "center 40%", transition: "opacity 0.5s" }}
          open={open}

        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Box style={{
        width: isMobileScreen ? "100vw" : "50vw",
        height: "100vh",
        backgroundColor: "#e6e3d9",

        display: "flex",
        border:"1px solid #001c1d",
        justifyContent: "center",
        alignItems: "center", // Alinha verticalmente
        padding: isMobileScreen ? "0 2rem" : "0"
      }}>
        <div style={{
          minWidth: isMobileScreen ? "90%" : "50%",
          marginTop: isMobileScreen ? "2%" : "", // Reduzir a margem superior para mobile
          display: 'flex',
          
          flexDirection: 'column',
          alignItems: 'center' // Centraliza o conteúdo

        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: isMobileScreen ? "1%" : "5rem",
          }}>
            <img style={{ objectFit: "contain", width: isMobileScreen ? "200px" : "200px", height: isMobileScreen ? "200px" : "100%", }} src={Logo} />
          </div>
         
          <Formik
            initialValues={userData}
            // validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
              login();
              actions.setSubmitting(false);
            }}
          >
            <Form style={{
              width: '100%',
              
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem"
            }}>
              <input
                type="text"
                className="form-control form-control-lg"
                name="user"
                id="user"
                placeholder="E-mail"
                value={userData.user}
                data-kt-search-element="input"
                onChange={handleChangeInput}
                style={{ width: '100%', marginBottom: "1rem" }}
              />

              <div className="password-container" style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="form-control form-control-lg"
                  name="password"
                  id="password"
                  placeholder="Senha"
                  value={userData.password}
                  data-kt-search-element="input"
                  onChange={handleChangeInput}
                  style={{ width: '100%' }}
                />
                <span
                  className="password-icon"
                  id="togglePassword"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)' }}
                >
                  {passwordVisible ? <VisibilityOffIcon  style={{color:"#fe6600"}}/> : <RemoveRedEyeIcon style={{color:"#fe6600"}} />}
                </span>
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                marginBottom: "1rem"
              }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    id="check"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <Label htmlFor="check">Lembrar meus Dados</Label>
                </div>
                <Forget to={"/recuperar/senha"} style={{ display: 'flex', alignItems: 'center' }}>
                  <LockOutlinedIcon color="disabled" /> Esqueceu sua senha?
                </Forget>
              </div>

              <Button style={{
                backgroundColor: "#fe6600",
                width: "80%",
                height: "50px",
                borderRadius: "px",
                color: "#e6e3d9",
                marginBottom: '1rem'
              }} type="submit">Entrar</Button>

              <Grid
                container
                alignItems={"center"}
                justifyContent={"center"}
                style={{ padding: "0 10px" }}
                component={"div"}
              >
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Link style={{color:"#fe6600"}} to="/cadastrar" className="login">
                    Não possui conta? Cadastre-se como Prestador!
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </Box>
      {!isMobileScreen && (
        <div style={{ width: "50%", marginTop: "8%" }}>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2%" }}>
            <img style={{ width: "700px", height: "700px", objectFit: "contain", border: "1px solid #001c1d",boxShadow: "1px 4px 8px rgba(5, 33, 44, 0.7)", }} src={Logo} />
          </div>
        </div>
      )}


    </BackgroundImage >
  );
};

export default Login;
