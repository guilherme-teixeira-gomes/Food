import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,

} from "@mui/material";
import Button from "@mui/material/Button";
import api from "app/services/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "app/context/Auth/AuthContext";
import SettingsIcon from "@mui/icons-material/Settings";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoginIcon from '@mui/icons-material/Login';
import ModalCadastroAdministradores from "app/components/ModalCadastroAdministradores";
import SideBarOf from "app/components/SideBar";
import MainLayout from "app/layout/MainLayout";

const columns = [
  {
    id: "date_sol",
    label: "Nome",
    minWidth: 150,
    align: "center",
  },
  {
    id: "date_sol",
    label: "CPF",
    minWidth: 150,
    align: "center",
  },
  {
    id: "rn395",
    label: "Email",
    minWidth: 100,
    align: "left",
  },
  {
    id: "operation",
    label: "Cargo",
    minWidth: 100,
    align: "center",
  },
  {
    id: "operation",
    label: "Telefone",
    minWidth: 100,
    align: "center",
  },
  {
    id: "uf",
    label: "Uf",
    minWidth: 100,
    align: "center",
  },
  {
    id: "cep",
    label: "Cep",
    minWidth: 100,
    align: "center",
  },

  {
    id: "Data_de_Incricao",
    label: "Data de Incrição",
    minWidth: 100,
    align: "center",
  },
  {
    id: "operation",
    label: "Ações",
    minWidth: 100,
    align: "center",
  },
];

const Header = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 2rem",
  marginBottom: "1.5rem",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    textAlign: "center",
    gap: "1rem",
  },
}));

const TableContainerDiv = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "1rem",
  textAlign: "center",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fe6600",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
    textAlign: "center", 
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Adminstrador {
  id: string;
  name: string;
  cpf: string;
  admin: string;
  email: string;
  cargo: string;
  whatsapp: string;
  uf: string;
  cep: boolean;
  createdAt: string;

}






function Administradores() {
  const { user, permissoes } = useContext(AuthContext);
  const [administrador, setAdministrador] = useState<Adminstrador[]>([]);
  const [cadastroModal, setCadastroModal] = useState(false);
  const [resetSenha, setResetSenha] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const [inativeModal, setInativeModal] = useState(false);
  const [selectedAdministrador, setSelectedAdministrador] = useState<Adminstrador | null>(null);
  const navigate = useNavigate();


  const openEditModal = (user: Adminstrador): void => {
    setSelectedAdministrador(user);
    setResetSenha(true);
  };


  const openInativeModal = (user: Adminstrador): void => {
    setSelectedAdministrador(user);
    setInativeModal(true);
  };

  const formatDate = (date?: string | null): string => {
    if (!date) return "---";

    const dateObj = new Date(date);

    const formattedDate = dateObj.toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
    const formattedTime = dateObj.toLocaleTimeString("pt-BR", {
      timeZone: "UTC",
    });
    return `${formattedDate} às ${formattedTime}`;
  };

  const getAdmins = async () => {
    try {
      const data = await api.get(`/all/admin/${user.id}`);
      setAdministrador(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (

    <Box
      display="flex"
      flexDirection={isTablet ? 'column' : 'row'}
      justifyContent="center"
      alignItems="flex-start"
      width="100%"
      minHeight="100vh"
    >
      <div style={{ width: isTablet ? '100%' : '300px' }}>
        <SideBarOf />
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: isTablet ? '100%' : 'calc(100% - 300px)', 
          padding: '20px',
          paddingLeft: isTablet ? '5%' : '2%', 
          paddingRight: isTablet ? '5%' : '2%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden', 
        }}
      >
        <MainLayout />
        <Box
          bgcolor="#fff"
          p={2}
          sx={{
            borderBottomLeftRadius: 10,  
            borderBottomRightRadius: 10, 

          }}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Bem-vindo à nossa plataforma de delivery!
          </Typography>
          <Typography variant="subtitle1">
            Descubra os melhores pratos e promoções na sua região.
          </Typography>
        </Box>
        <Box mb={3}>
        <Box 
        sx={{borderRadius:5}}
        maxWidth={2500} minHeight={700} justifyContent="center" alignItems="center"  bgcolor={"#fff"}>
        <Header>
          <h5
            style={{  
              marginBottom: "1%",
              marginLeft: "2%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Administradores
          </h5>
          <div
            style={{
              marginBottom: "1%",
              marginLeft: "2%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box mt={3} display="flex" justifyContent="center">
              <Button variant="contained" onClick={() => setCadastroModal(!cadastroModal)}
                sx={{
                  width: "100%",
                  height: "40px",
                  py: 1.5,
                  fontSize: "1rem",
                  backgroundColor: "#fe6600",
                  color: "#fff", "&:hover": {
                    backgroundColor: "#fe6600",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}>
                Cadastrar
              </Button>
            </Box>
          </div>
        </Header>

        <TableContainerDiv>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {administrador.map((row) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <StyledTableCell

                      style={{ fontWeight: "bold", fontSize: "10px", whiteSpace: "nowrap", maxWidth: "300px", alignItems: "center" }}
                    >
                      {row.name}

                    </StyledTableCell>
                    <StyledTableCell

                      style={{ fontWeight: "initial", fontSize: "12px" }}
                    >
                      {row.cpf}
                    </StyledTableCell>
                    <StyledTableCell

                      style={{ fontWeight: "initial", fontSize: "12px" }}
                    >
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell

                      style={{ fontWeight: "initial", fontSize: "12px" }}
                    >
                      {row.cargo}
                    </StyledTableCell>
                    <StyledTableCell

                      style={{ fontWeight: "initial", fontSize: "12px" }}
                    >
                      {row.whatsapp}
                    </StyledTableCell>
                    <StyledTableCell

                      style={{ fontWeight: "initial", fontSize: "12px" }}
                    >
                      {row.uf}
                    </StyledTableCell>
                    <StyledTableCell

                      style={{ fontWeight: "initial", fontSize: "12px" }}
                    >
                      {row.cep}
                    </StyledTableCell>
                    <StyledTableCell

                      style={{ fontWeight: "initial", fontSize: "12px" }}
                    >
                      {formatDate(row.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell

                      style={{ fontWeight: "initial", fontSize: "12px" }}
                    >
                      {" "}

                      <IconButton sx={{ color: "#f86300", "&:hover": {} }}
                        style={{ outline: "none" }}
                        onClick={() => openEditModal(row)}
                      >
                        <VpnKeyIcon

                        />
                      </IconButton>


                      <IconButton sx={{ color: "#f86300", "&:hover": {} }}
                        style={{ outline: "none" }}
                        onClick={() => openInativeModal(row)}
                      >
                        <LoginIcon

                        />
                      </IconButton>


                      <IconButton
                        sx={{ color: "#f86300", "&:hover": {} }}
                        style={{ outline: "none" }}
                        onClick={() => {
                          navigate(`/operadoras/${row.id}`);
                        }}
                      >
                        <SettingsIcon />
                      </IconButton>


                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </TableContainerDiv>
        </Box>
      </Box>


      {cadastroModal && (
        <ModalCadastroAdministradores
          openModal={cadastroModal}
          setOpenModal={setCadastroModal}
          refresh={getAdmins}
        />
      )}

    </div>
    </Box>
  );
}

export default Administradores;

{/* {resetSenha && (
  <ModalResetSenhaOperadora
    selectedAdministrador={selectedAdministrador}
    openModal={resetSenha}
    setOpenModal={setResetSenha}
    refresh={getAdmins}
  />
)} */}


{/* {inativeModal && (
  <ModalDesativarAtivarOperadora
    selectedAdministrador={selectedAdministrador}
    openModal={inativeModal}
    setOpenModal={setInativeModal}
    refresh={getAdmins}
  />
)} */}