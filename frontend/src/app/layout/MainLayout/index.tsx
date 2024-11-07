/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, Modal, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuIcon from "@mui/icons-material/Menu";
import AMTechMiniLogo from "./../../assets/avatar.png";
import SideBar from "./../../components/Layout/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "app/routes/useRoutes";
import { AuthContext } from "app/context/Auth/AuthContext";
import useAuth from "app/hooks/useAuth.js";
import api from "app/services/api";
import Notification from "app/components/Layout/Notification";
import Switch from '@mui/material/Switch';
import ChatIcon from '@mui/icons-material/Chat';
import AMTechLogo from "./../../assets/avatar.png";
import { Procedimento, Clientes } from "./interface";
import SideBarOf from "app/components/SideBar";

const styleModalConfirmaInativar = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "55%",
  borderRadius: "4px",
  maxWidth: "600px",
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  children?: any;
}

function MainLayout({ children }: Props) {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);


  const [search, setSearch] = useState("");
  const [seachResult, setSeachResult] = useState<Procedimento[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [inative, setInative] = useState(false);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);


  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const onClose = () => setIsOpenSearch(false);

  const toggleDrawer = () => setIsSideBarOpen((prev) => !prev);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const { data } = await api.put(`/medico/${user.id}/perfil`, { inativo: !inative });
      setInative(data.user.inativo);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  

  

  const searchProcedimentos = async () => {
    try {
      const params = {
        search: search.trim()
      };

      const { data } = await api.get(`/procedimentos/search`, { params });

      setSeachResult(data);
      setIsOpenSearch(true);
    } catch (e) {
      console.log(e);
    }
  }

  const prestadorInfo = async () => {
    try {
      const { data } = await api.get(`/medico/${user.id}/perfil`);
      setInative(data.inativo);
    } catch (e) {
      console.log(e);
    }
  }

  const canBeEdit = (status: string) => {
    if (user.type !== "ADMINISTRACAO") {
      return false;
    }

    return ["DISPONÍVEL PARA ANALISE", "NOVO EXAME", "INFORMAÇÕES/RELATÓRIO SOLICITADOS"].includes(status);
  }

  const getRouteEdit = (id: number, status: string) => {
    if (status === "DISPONÍVEL PARA ANALISE") {
      return `/procedimentos/editar/${id}`;
    }

    if (status === "NOVO EXAME") {
      return `/procedimentos/novos-exames/${id}`;
    }

    if (status === "INFORMAÇÕES/RELATÓRIO SOLICITADOS") {
      return `/procedimentos/novos-informacoes/${id}`;
    }

    return ""
  }



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose(); // Call the onClose function when a click occurs outside the component
      }
    };

    // Attach the event listener to the document when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      
      <S.Container >
        <div style={{ width: "100%" }}>
          <div style={{ width: "25%", gap: "2rem", paddingLeft:"2%" }}>
           

           

              <S.SearchContainer ref={ref}>
                <S.SearchField
                  id="component-filled"
                  placeholder="Buscar "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} />
                <SearchIcon
                  style={{ cursor: "pointer", color: "#b2b2b2" }}
                  onClick={searchProcedimentos} />

                {/* {seachResult.length} */}
                <S.SearchList>

                  {(isOpenSearch && seachResult.length === 0) && (
                    <S.NoProcessFound>
                      Nenhum procedimento encontrado!
                    </S.NoProcessFound>
                  )}

                  {isOpenSearch && seachResult.map(process => (

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

                      <S.IconsContainer>
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
                      </S.IconsContainer>

                    </li>
                  ))}

                </S.SearchList>
              </S.SearchContainer>

  
          </div>
          <S.IconContainer>
            
       
  

          </S.IconContainer>
        </div>
      </S.Container >

      <S.BodyContainer>{children}</S.BodyContainer>


    </>
  );
}

export default MainLayout;
