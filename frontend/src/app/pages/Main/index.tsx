import React from "react";

import { CssBaseline, Button } from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "app/routes/useRoutes";
import SideBar from "app/components/Layout/SideBar";

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

const LoginBtn = styled(Button)(({ theme }) => ({
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

const MainPage = () => {
    const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" style={{ maxWidth: "620px" }}>
      <CssBaseline />
      <Paper>
        <Content>
            
        </Content>
      </Paper>
    </Container>
  );
};

export default MainPage;
