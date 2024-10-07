import React, { useState } from "react";

import Logo from "../../assets/hungry.png";
import { i18n } from "../../translate/i18n";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CssBaseline, Avatar, Button, Box, Backdrop, CircularProgress, useMediaQuery } from "@mui/material";
import toastError from "app/errors/toastError";
import api from "app/services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "app/routes/useRoutes";
import { BackgroundImage } from "../Login/styles";

const Paper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: "auto",
  height: "auto",
  backgroundColor: "#fff",
  borderRadius: "10px",
}));

const Content = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const LogoImg = styled("img")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  height: "auto",
  marginTop: theme.spacing(8),
}));

const BoxContent = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: "2rem",
  display: "flex",
  flexDirection: "column",
}));

const Input = styled("input")(({ theme }) => ({
  width: "100%",
  padding: "0.3rem 0.6rem",
  marginBottom: "1.4rem",
  marginTop: "2rem",
}));

const Submit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0, 2),
  backgroundColor: "#fe6600",
  border: "1px solid transparent",
  color: "#fff",

  "&:hover": {
    backgroundColor: "#fff",
    border: "1px solid #fe6600",
    color: "#fe6600",
  },
}));

const RecoverPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState({
    email: ""
  });
  const isMobileScreen = useMediaQuery("only screen and (max-width: 750px)");
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Enviando email...");
    console.log(email)

    try {
      const response = await api.post("/auth/recover_password", email);
      const data = response.data;
      console.log("Requisição enviada");

      console.log(data);
      if (data.msg === "E-mail enviado com sucesso!") {
        localStorage.setItem("Token_Recuperação", data.tokenHash);
        toast.success("Notificação de acesso enviado para o seu E-mail");

        setTimeout(() => {
          navigate(RoutesPath.LOGIN)
        }, 2000)
      }
    } catch (error) {
      console.log(error)
      toastError(error);
    }
  };

  return (
   
    <BackgroundImage >
      <div>
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
            marginBottom: isMobileScreen ? "1%" : "3rem",
          }}>
            <img style={{ objectFit: "contain", width: isMobileScreen ? "200px" : "200px", height: isMobileScreen ? "200px" : "100%", }} src={Logo} />
          </div>
         

          <Typography component="h1" variant="h5">
            {i18n.t("Recuperar Senha")}
          </Typography>

          <BoxContent onSubmit={handleSubmit}>
            <Typography textAlign={"center"}>
              Digite seu e-mail e as instruções serão enviadas para você!
            </Typography>

            <Input
              className="form-control form-control-lg"
              type="email"
              name="email"
              id="email"
              value={email.email}
              onChange={(e) => setEmail({email: e.target.value})}
              placeholder="Email"
              data-kt-search-element="input"
              required
            />

            <Submit type="submit">Enviar Email</Submit>
          </BoxContent>
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

export default RecoverPassword;
