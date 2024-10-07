import React, { useState } from "react";

import Logo from "../../assets/am_tech_logo.png";
import { i18n } from "../../translate/i18n";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CssBaseline, Avatar, Button, Box } from "@mui/material";

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
  backgroundColor: "#5A5A5D",
  border: "1px solid transparent",
  color: "#fff",

  "&:hover": {
    backgroundColor: "#fff",
    border: "1px solid #5A5A5D",
    color: "#5A5A5D",
  },
}));

const ChangePassword = () => {
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="xs" style={{ maxWidth: "620px" }}>
      <CssBaseline />

      <Paper>
        <Content>
          <Avatar
            style={{
              margin: "0px",
              backgroundColor: "transparent",
              padding: "0px 1rem",
              width: "auto",
              height: "auto",
            }}
          >
            <LogoImg src={Logo} alt="WhatsAll"></LogoImg>
          </Avatar>

          <Typography component="h1" variant="h5">
            {i18n.t("Modificar senha para acesso")}
          </Typography>

          <BoxContent onSubmit={handleSubmit}>
            <Typography textAlign={"center"}>
              Digite sua nova senha para acesso!
            </Typography>

            <Input
              className="form-control form-control-lg"
              type="email"
              name="email"
              id="email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              data-kt-search-element="input"
              required
            />

            <Input
              className="form-control form-control-lg"
              type="email"
              name="email"
              id="email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha novamente"
              data-kt-search-element="input"
              required
            />

            <Submit type="submit">Trocar Senha</Submit>
          </BoxContent>
        </Content>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
