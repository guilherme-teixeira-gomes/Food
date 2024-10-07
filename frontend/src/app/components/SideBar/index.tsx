import { Avatar, Box, Button, Divider, Drawer } from "@mui/material";
import React, { useContext, useState } from "react";
import SideBarImg2 from "../../assets/hungryss.png";
import AppsIcon from "@mui/icons-material/Apps";
import * as S from "./styles";
import { StyledButton, efeitoxd } from "./styles";
import { RoutesPath } from "app/routes/useRoutes";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "app/context/Auth/AuthContext";
import Person2Icon from '@mui/icons-material/Person2';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MenuIcon from '@mui/icons-material/Menu';

function SideBarOf() {
  const { user, handleLogout } = useContext(AuthContext);
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    padding: "7%",
    width: "30px",
    height: "30px",
    backgroundColor: hovered ? "#f12525" : "#fe6600",
    transition: "background-color 0.3s",
  };

  return (
    <>
      <Box>
        <Drawer
          open={true}
          variant="permanent"
          style={{
            color: "black",
            backgroundColor: "#fe6600",
            height: "auto",
            width: "300px",
          }}
        >
          <Box
            width="300px"
            height="100vh"
            style={{
              backgroundColor: "#fe6600",
              border: "#fe6600",
              position: "fixed",
              top: 0,
              left: 0,
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={SideBarImg2}
                alt="InConnet"
                style={{
                  height: "100%",
                  width: "150px",
                  backgroundColor: "#fe6600",
                  margin: "50px 50px",
                }}
              />
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginLeft: "10%",
                gap: "1rem",
              }}
            >
              <p
                style={{
                  color: "#FFF",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  marginTop: "1rem",
                }}
              >
                MENU PRINCIPAL
              </p>

              <div
                style={{ width: "100%" }}
                className={`${
                  isActive("/home") ? "link-active" : ""
                } position-relative`}
              >
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledButton style={{ marginLeft: "10%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        padding: "7%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: `${
                          isActive("/home") ? "#fe3b00e6" : "#fe6600"
                        }`,
                      }}
                    >
                      <HomeIcon />
                    </div>
                    HOME
                  </StyledButton>
                </Link>
              </div>

              <div
                style={{ width: "100%" }}
                className={`${
                  isActive("/chamados") ? "link-active" : ""
                } position-relative`}
              >
                <Link
                  to="/chamados"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledButton style={{ marginLeft: "10%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        padding: "7%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: `${
                          isActive("/chamados") ? "#fe3b00e6" : "#fe6600"
                        }`,
                      }}
                    >
                      <MenuIcon />
                    </div>
                    CHAMADOS
                  </StyledButton>
                </Link>
              </div>

              <div
                style={{ width: "100%" }}
                className={`${
                  isActive("/criarchamados") ? "link-active" : ""
                } position-relative`}
              >
                <Link
                  to="/criarchamados"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledButton style={{ marginLeft: "10%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        padding: "7%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: `${
                          isActive("/criarchamados") ? "#fe3b00e6" : "#fe6600"
                        }`,
                      }}
                    >
                      <PlaylistAddIcon />
                    </div>
                    CRIAR CHAMADOS
                  </StyledButton>
                </Link>
              </div>

              <div
                style={{ width: "100%" }}
                className={`${
                  isActive("/formulario") ? "link-active" : ""
                } position-relative`}
              >
                <Link
                  to="/formulario"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledButton style={{ marginLeft: "10%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        padding: "7%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: `${
                          isActive("/formulario") ? "#fe3b00e6" : "#fe6600"
                        }`,
                      }}
                    >
                      <EditNoteIcon />
                    </div>
                    FORMULÁRIOS
                  </StyledButton>
                </Link>
              </div>
            
              <div
                style={{ width: "100%" }}
                className={`${
                  isActive("/faq") ? "link-active" : ""
                } position-relative`}
              >
                <Link
                  to="/faq"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledButton style={{ marginLeft: "10%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        padding: "7%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: `${
                          isActive("/faq") ? "#fe3b00e6" : "#fe6600"
                        }`,
                      }}
                    >
                      <QuizIcon />
                    </div>
                    FAQ
                  </StyledButton>
                </Link>
              </div>
            </div>
            <Divider style={{ marginTop: "1rem" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginLeft: "13%",
                gap: "0.5rem",
                marginTop: "12px",
              }}
            >
              <Divider />
              <p
                style={{
                  color: "#FFF",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  marginTop: "15%",
                }}
              >
                CONFIGURAÇÕES
              </p>
              <div
                style={{ width: "100%" }}
                className={`${
                  isActive("/perfil") ? "link-active" : ""
                } position-relative`}
              >
                <Link
                  to="/perfil"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledButton style={{ marginLeft: "10%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        padding: "7%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: `${
                          isActive("/perfil") ? "#fe3b00e6" : "#fe6600"
                        }`,
                      }}
                    >
                      <Person2Icon />
                    </div>
                    PERFIL
                  </StyledButton>
                </Link>
              </div>

              <div
                style={{ width: "100%" }}
                className={`${
                  isActive("/configuracoes") ? "link-active" : ""
                } position-relative`}
              >
                <Link
                  to="/configuracoes"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledButton style={{ marginLeft: "10%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        padding: "7%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: `${
                          isActive("/configuracoes") ? "#fe3b00e6" : "#fe6600"
                        }`,
                      }}
                    >
                      <SettingsIcon />
                    </div>
                    CONFIGURAÇÕES
                  </StyledButton>
                </Link>
              </div>

              <div
                style={{ width: "100%" }}
              >
                <StyledButton
                  onClick={() => handleLogout()}
                  style={{ marginLeft: "10%" }}
                  onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                  <div
                    style={divStyle}
                  >
                    <PowerSettingsNewIcon />
                  </div>
                  SAIR
                </StyledButton>
              </div>
            </div>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default SideBarOf;
