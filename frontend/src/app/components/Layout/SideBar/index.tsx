import * as S from "./styles";

import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AMTechLogo from "./../../../assets/am_tech_logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import IconExpandLess from '@mui/icons-material/ExpandLess'
import IconExpandMore from '@mui/icons-material/ExpandMore'
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "app/routes/useRoutes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "app/context/Auth/AuthContext";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import api from "app/services/api";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface Props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

function SideBar({ isOpen, toggleDrawer }: Props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [isEspecialistasProprios, setIsEspecialistasProprios] = useState(false);

  const [openCollapse, setOpenCollapse] = useState("");

  const isOpenCollapse = (tab: string): boolean => {
    return tab === openCollapse;
  }

  const handleChangeCollapse = (value: string) => {
    setOpenCollapse(prev => {
      if (prev === value) {
        return "";
      }

      return value;
    });
  }

  const checkIsEspecialistasProprios = async () => {
    try {
      const { data } = await api.get(user.type === "OPERADORA" ? `/admins/${user.id}` : `/admins/userOperadora/${user.id}`);

      setIsEspecialistasProprios(data.data.especialistas === "PROPRIOS");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (user.type === 'OPERADORA' || user.type === 'USER_OPERADORA') {
      checkIsEspecialistasProprios();
    } else {
      setIsEspecialistasProprios(false);
    }
  }, []);

  return (
    <Box>
      <Drawer
        anchor={"left"}
        open={isOpen}
        sx={{
          width: 300,
          flexShrink: 1,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        onClose={toggleDrawer}
      >
        <S.Header>
          <img src={AMTechLogo} alt="Logo AM_TECH" />
        </S.Header>
        <Divider />

        <Box
          role="presentation"
        >
          <List>
            <ListItem
              onClick={() =>
                navigate(
                  RoutesPath.TELA_INICIAL
                )
              }
              className="cursor-pointer"
            >
              <S.ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Dashboard"}
                />
              </S.ListItemButton>
            </ListItem>
          </List>
        </Box>

        {user.type === "MEDICO" && (
          <>
            <List>
              <ListItem
                onClick={() => {
                  navigate("/procedimentos/analise")
                }}
                className="cursor-pointer"
              >
                <S.ListItemButton>
                  <ListItemIcon>
                    <AccountTreeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Procedimentos"}
                  />
                </S.ListItemButton>
              </ListItem>
            </List>

            <ListItem
              onClick={() => {
                navigate("/pagamentos");
              }}
              className="cursor-pointer"
            >
              <S.ListItemButton>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={"Pagamentos"} />
              </S.ListItemButton>
            </ListItem>
          </>
        )}

        {(user.type === "OPERADORA" || user.type === "USER_OPERADORA") && (
          <>
            <ListItem onClick={() => handleChangeCollapse("procedimentos")} className="cursor-pointer">
              <ListItemIcon>
                <S.ListItemButton>
                  <AccountTreeIcon />
                </S.ListItemButton>
              </ListItemIcon>
              <ListItemText primary="Procedimentos" />
              {isOpenCollapse("procedimentos") ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>

            <Collapse in={isOpenCollapse("procedimentos")} timeout="auto" unmountOnExit className="mb-4">
              <Divider />
              <List component="div" disablePadding>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Procedimentos"
                    onClick={() => navigate("/procedimentos")}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Criar procedimetno"
                    onClick={() => navigate("/procedimentos/add")}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Procedimentos OCR"
                    onClick={() => navigate("/procedimentosOCR/add")}
                  />
                </ListItem>
              </List>
            </Collapse>

            <List>
              <ListItem
                onClick={() => {
                  navigate("/solicitacao-procedimento")
                }}
                className="cursor-pointer"
              >
                <S.ListItemButton>
                  <ListItemIcon>
                    <SpaceDashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Solicitação de procedimento "}
                  />
                </S.ListItemButton>
              </ListItem>
            </List>

            <ListItem
              onClick={() => {
                navigate("/pagamentos");
              }}
              className="cursor-pointer"
            >
              <S.ListItemButton>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={"Pagamentos"} />
              </S.ListItemButton>
            </ListItem>

            <ListItem
              onClick={() => handleChangeCollapse("users")}
              className="cursor-pointer"
            >
              <ListItemIcon>
                <S.ListItemButton>
                  <PeopleAltIcon />
                </S.ListItemButton>
              </ListItemIcon>
              <ListItemText primary="Usuários" />
              {isOpenCollapse("users") ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>

            <Collapse in={isOpenCollapse("users")} timeout="auto" unmountOnExit className="mb-4">
              <Divider />
              <List component="div" disablePadding>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Especialistas"
                    onClick={() => navigate("/especialistas")}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Usuários / Funcionario"
                    onClick={() => navigate("/operador/user/add")}
                  />
                </ListItem>

                {isEspecialistasProprios && (
                  <ListItem>
                    <ListItemText
                      className="cursor-pointer"
                      inset
                      primary="Especialistas"
                      onClick={() => navigate("/especialistas")}
                    />
                  </ListItem>
                )}
              </List>
            </Collapse>
          </>
        )}

        {(user.type === "AMTECH" || user.type === "USUARIO_AMTECH") && (
          <>
            <ListItem
              onClick={() => {
                navigate("/procedimentos");
              }}
              className="cursor-pointer"
            >
              <S.ListItemButton>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary={"Procedimentos"} />
              </S.ListItemButton>
            </ListItem>

            <ListItem
              onClick={() => {
                navigate("/pagamentos");
              }}
              className="cursor-pointer"
            >
              <S.ListItemButton>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={"Pagamentos"} />
              </S.ListItemButton>
            </ListItem>

            <ListItem
              onClick={() => handleChangeCollapse("users")}
              className="cursor-pointer"
            >
              <ListItemIcon>
                <S.ListItemButton>
                  <PeopleAltIcon />
                </S.ListItemButton>
              </ListItemIcon>
              <ListItemText primary="Usuários" />
              {isOpenCollapse("users") ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>

            <Collapse in={isOpenCollapse("users")} timeout="auto" unmountOnExit className="mb-4">
              <Divider />
              <List component="div" disablePadding>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Operadoras"
                    onClick={() => navigate("/operadoras")}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Prestadores"
                    onClick={() => navigate("/prestadores")}
                  />
                </ListItem>

                {user.type === "AMTECH" && (
                  <ListItem>
                    <ListItemText
                      className="cursor-pointer"
                      inset
                      primary="Usuários / Funcionarios"
                      onClick={() => navigate("/amtech/add")}
                    />
                  </ListItem>
                )}

              </List>
            </Collapse>

            <List>
              <ListItem
                onClick={() => {
                  navigate("/entidade")
                }}
                className="cursor-pointer"
              >
                <S.ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Entidades"}
                  />
                </S.ListItemButton>
              </ListItem>
            </List>

            <ListItem
              onClick={() => navigate("/contratos")}
              className="cursor-pointer"
            >
              <S.ListItemButton>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>

                <ListItemText primary={"Contratos"} />

              </S.ListItemButton>
            </ListItem>


            <ListItem
              onClick={() => handleChangeCollapse("config")}
              className="cursor-pointer"
            >
              <ListItemIcon>
                <S.ListItemButton>
                  <SettingsIcon />
                </S.ListItemButton>
              </ListItemIcon>
              <ListItemText primary="Configurações" />
              {isOpenCollapse("config") ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>

            <Collapse in={isOpenCollapse("config")} timeout="auto" unmountOnExit>
              <Divider />
              <List component="div" disablePadding>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Parametrização de documentos"
                    onClick={() => navigate("/parametrizacao-documentos")}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Resultados dos procedimentos"
                    onClick={() => navigate("/resultado-procedimentos")}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Parametrização da reanálise"
                    onClick={() => navigate("/parametrizacao-reanalize")}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    className="cursor-pointer"
                    inset
                    primary="Procedimentos Médicos"
                    onClick={() => navigate("/procedimentos-medicos")}
                  />
                </ListItem>

              </List>
            </Collapse>
          </>
        )}
      </Drawer>
    </Box>
  );
}

export default SideBar;
