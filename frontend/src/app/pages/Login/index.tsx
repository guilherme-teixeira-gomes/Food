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

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CssBaseline, Avatar, Button, Box, Grid, Card, Fade } from "@mui/material";
import LogoFundo from "../../assets/loginfundo.png";
import LogoCarregamento from "../../assets/logocarregamento.png";

import { styled } from "@mui/material/styles";
import { RoutesPath } from "app/routes/useRoutes";
import toastError from "app/errors/toastError";


const Paper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: "auto",
  height: "650px",
  backgroundColor: "#fff",
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
  color: "#fff",
  width: "300px",
  

  "&:hover": {
    backgroundColor: "#228a4a",
    border: "1px solid #30BC65",
    color: "#fff",
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

  const [userData, setUserData] = useState<LoginDataTypes>({ user: "", password: "", origem: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = React.useState(false);

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
    <BackgroundDiv>
      <div>

        <Backdrop
          sx={{ backgroundColor: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundImage: `url(${LogoCarregamento})`, backgroundRepeat: 'no-repeat', backgroundPosition: "center 40%", transition: "opacity 0.5s" }}
          open={open}

        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Container component="main" maxWidth="xs" style={{ maxWidth: "620px", alignItems: "center", justifyContent: "center" }}>
        <CssBaseline />
        <Paper>
          <Card style={{ borderRadius: "22px", boxShadow: "0px 0px 24px 0px rgba(0, 0, 0, 0.25)" }}>
            <Content>
              <Avatar
                style={{
                  margin: "0px",
                  backgroundColor: "transparent",
                  width: "300px",
                  height: "auto",
                  borderRadius: "0px"
                }}
              >
                {/* <LockOutlinedIcon /> */}
              </Avatar>


              <Formik
                initialValues={userData}
                // validationSchema={LoginSchema}
                onSubmit={(values, actions) => {
                  login();
                  actions.setSubmitting(false);
                }}
              >
                <Form style={{ width: "100%", marginTop: "1rem" }}>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="user"
                    id="user"
                    placeholder="E-mail"
                    value={userData.user}
                    data-kt-search-element="input"
                    onChange={handleChangeInput}
                    style={{ marginTop: ".8rem", marginBottom: "1.4rem" }}
                  />

                  <input
                    type="password"
                    className="form-control form-control-lg"
                    name="password"
                    id="password"
                    placeholder="Senha"
                    value={userData.password}
                    onChange={handleChangeInput}
                    style={{ marginTop: ".8rem", marginBottom: "1.4rem" }}
                  />
                  <ForgetBox>
                    <Forget to={"/recuperar/senha"} style={{ color: "#30BC65" }}>
                      Esqueceu sua senhas?
                    </Forget>
                  </ForgetBox>
                 
                  <LinksContainer>
                    <PasswordInput>
                      <input
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "5px",
                        }}
                        id="check"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <Label htmlFor="check" style={{ color: "#30BC65" }}>Lembrar meus dados</Label>
                    </PasswordInput>



                    <Submit type="submit" onClick={handleLoginAndClose}>
                      {i18n.t("login.buttons.submit")}
                    </Submit>


                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"center"}
                      style={{ padding: "0px 10px", margin: "1rem 0" }}
                      component={"div"}
                    >
                    </Grid>
                  </LinksContainer>
                </Form>
              </Formik>
            </Content>
          </Card>
        </Paper>
        <Box mt={8}>{/* <Copyright /> */}</Box>
      </Container>
    </BackgroundDiv>
  );
};

export default Login;
