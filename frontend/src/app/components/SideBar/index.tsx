import { Avatar, Box, Button, Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import SideBarImg2 from "../../assets/hungryss.png";
import { Bar, IconContainer, SearchContainer, SearchField, SearchList, StyledButton, efeitoxd } from "./styles";
import { RoutesPath } from "app/routes/useRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "app/context/Auth/AuthContext";
import Person2Icon from '@mui/icons-material/Person2';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BusinessIcon from '@mui/icons-material/Business';
import FaceIcon from '@mui/icons-material/Face';
import { Menu as MenuIcon } from "@mui/icons-material";
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from "@mui/icons-material/Search";

function SideBarOf() {
  const { user, handleLogout } = useContext(AuthContext);
  const isTablet = useMediaQuery('(max-width:960px)');
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

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
      <Bar >
        <div style={{ width: "100%" }}>
          <div style={{ width: "25%", gap: "2rem" }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              className="menu-icon"
              onClick={toggleSidebar}
              sx={{
                display: isTablet ? "block" : "none",
                position: "fixed",
                mr: 2,
                zIndex: 1300,
              }}
            >
              <MenuIcon />
            </IconButton>

            <SearchContainer ref={ref}>
              <SearchField
                id="component-filled"
                placeholder="Buscar Protocolo"
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon
                style={{ cursor: "pointer", color: "#b2b2b2" }}
              // onClick={searchProcedimentos}
              />

              {/* {seachResult.length} */}
              <SearchList>

                {/* {(isOpenSearch && seachResult.length === 0) && (
                    <NoProcessFound>
                      Nenhum procedimento encontrado!
                    </NoProcessFound>
                  )} */}

                {/* {isOpenSearch && seachResult.map(process => (

                    <li key={process.id}>
                      <div className="d-flex flex-column" style={{ gap: "0.5rem" }}>
                        <p>Protocolo: {process.procedimento}</p>

                        {process.beneficiarioInfo && (
                          <p>Beneficiario: {process.beneficiarioInfo[0].nome}</p>
                        )}
                      </div>

                      <p>
                        Status: {process.status}
                      </p>

                      <IconsContainer>
                        {canBeEdit(process.status) && (

                          <Tooltip title="Editar procedimento">
                            <EditIcon
                              className=""
                              onClick={() => {
                                navigate({
                                  pathname: getRouteEdit(process.id, process.status),
                                });
                              }}
                              fontSize="medium"
                              style={{ cursor: "pointer" }} />
                          </Tooltip>
                        )}

                        <Tooltip title="Visualizar procedimento">
                          <VisibilityIcon
                            fontSize="medium"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate({
                                pathname: `/procedimento/${process.id}`,
                              });
                            }} />
                        </Tooltip>
                      </IconsContainer>

                    </li>
                  ))} */}

              </SearchList>
            </SearchContainer>


          </div>
          <IconContainer>


            <ChatIcon
              className="cursor-pointer"
              style={{ color: "#fdff" }}
              onClick={() => navigate("/chat")}
            />

            {/* {(user.type !== "AMTECH" && user.type !== "USUARIO_AMTECH") && (
              <Notification />
            )} */}



          </IconContainer>
        </div>
      </Bar>
      <Drawer
        open={isOpen}
        onClose={toggleSidebar}
        variant={isOpen ? "temporary" : "permanent"}
        sx={{
          display: isTablet ? (isOpen ? "block" : "none") : "block",
          width: isOpen ? "300px" : "0",
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            backgroundColor: "#fe6600",
            width: "300px",
          },
        }}
      >
        <Box
          width="300px"
          height="100vh"
          sx={{
            backgroundColor: "#fe6600",
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
              alt="Hungry"
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

            </p>

            <div
              style={{ width: "100%" }}
              className={`${isActive("/home") ? "link-active" : ""
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
                      backgroundColor: `${isActive("/home") ? "#fe3b00e6" : "#fe6600"
                        }`,
                    }}
                  >
                    <HomeIcon />
                  </div>
                  Home
                </StyledButton>
              </Link>
            </div>
            {(user.type === "SUPERADMIN" || user.type === "ADMINISTRACAO") && (
              <div
                style={{ width: "100%" }}
                className={`${isActive("/cadastrar-alimentos") ? "link-active" : ""
                  } position-relative`}
              >
                <Link
                  to="/cadastrar-alimentos"
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
                        backgroundColor: `${isActive("/cadastrar-alimentos") ? "#fe3b00e6" : "#fe6600"
                          }`,
                      }}
                    >
                      <LocalDiningIcon />
                    </div>
                    Cadastrar Alimentos
                  </StyledButton>
                </Link>
              </div>
            )}
            {(user.type === "SUPERADMIN" || user.type === "ADMINISTRACAO") && (
              <div
                style={{ width: "100%" }}
                className={`${isActive("/aprovacao") ? "link-active" : ""
                  } position-relative`}
              >
                <Link
                  to="/aprovacao"
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
                        backgroundColor: `${isActive("/aprovacao") ? "#fe3b00e6" : "#fe6600"
                          }`,
                      }}
                    >
                      <PendingActionsIcon />
                    </div>
                    Em Aprovação
                  </StyledButton>
                </Link>
              </div>
            )}
            <div
              style={{ width: "100%" }}
              className={`${isActive("/cardapio") ? "link-active" : ""
                } position-relative`}
            >
              <Link
                to="/cardapio"
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
                      backgroundColor: `${isActive("/cardapio") ? "#fe3b00e6" : "#fe6600"
                        }`,
                    }}
                  >
                    <FastfoodIcon />
                  </div>
                  Cardapio
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
            <div
              style={{ width: "100%" }}
              className={`${isActive(
                user.type === "SUPERADMIN" || user.type === "ADMINISTRACAO"
                  ? RoutesPath.HISTORICO_TODOS_CLIENTES
                  : user.type === "CLIENTE"
                    ? RoutesPath.HISTORICO
                    : "/"
              )
                ? "link-active"
                : ""
                } position-relative`}
            >
              <Link
                to={
                  user.type === "SUPERADMIN" || user.type === "ADMINISTRACAO"
                    ? RoutesPath.HISTORICO_TODOS_CLIENTES
                    : user.type === "CLIENTE"
                      ? RoutesPath.HISTORICO
                      : "/"
                }
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
                      backgroundColor: `${isActive(
                        user.type === "SUPERADMIN" || user.type === "ADMINISTRACAO"
                          ? RoutesPath.HISTORICO_TODOS_CLIENTES
                          : user.type === "CLIENTE"
                            ? RoutesPath.HISTORICO
                            : "/"
                      )
                        ? "#fe3b00e6"
                        : "#fe6600"
                        }`,
                    }}
                  >
                    <NewspaperIcon />
                  </div>
                  Historico
                </StyledButton>
              </Link>
            </div>

            {(user.type === "SUPERADMIN" || user.type === "ADMINISTRACAO") && (
              <div
                style={{ width: "100%" }}
                className={`${isActive("/administradores") ? "link-active" : ""
                  } position-relative`}
              >
                <Link
                  to="/administradores"
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
                        backgroundColor: `${isActive("/administradores") ? "#fe3b00e6" : "#fe6600"
                          }`,
                      }}
                    >
                      <BusinessIcon />
                    </div>
                    Adminstradores
                  </StyledButton>
                </Link>
              </div>
            )}
            {(user.type === "SUPERADMIN" || user.type === "ADMINISTRACAO") && (
              <div
                style={{ width: "100%" }}
                className={`${isActive("/clientes") ? "link-active" : ""
                  } position-relative`}
              >
                <Link
                  to="/clientes"
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
                        backgroundColor: `${isActive("/clientes") ? "#fe3b00e6" : "#fe6600"
                          }`,
                      }}
                    >
                      <FaceIcon />
                    </div>
                    Clientes
                  </StyledButton>
                </Link>
              </div>
            )}
            <div
              style={{ width: "100%" }}
              className={`${isActive("/perfil") ? "link-active" : ""
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
                      backgroundColor: `${isActive("/perfil") ? "#fe3b00e6" : "#fe6600"
                        }`,
                    }}
                  >
                    <Person2Icon />
                  </div>
                  Perfil
                </StyledButton>
              </Link>
            </div>

            <div
              style={{ width: "100%" }}
              className={`${isActive("/configuracoes") ? "link-active" : ""
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
                      backgroundColor: `${isActive("/configuracoes") ? "#fe3b00e6" : "#fe6600"
                        }`,
                    }}
                  >
                    <SettingsIcon />
                  </div>
                  Configurações
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
                Sair
              </StyledButton>
            </div>
          </div>
        </Box>
      </Drawer>

    </>
  );
}

export default SideBarOf;
