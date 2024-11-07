import React, { useContext, useEffect, useState } from "react";
import { GridWrapper, SectionWrapper, Wrapper, } from "./styles";
import { Box, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from "@mui/material";
import api from "app/services/api";
import { AuthContext } from "app/context/Auth/AuthContext";
import getBackUrl from "app/utils/generics/getBackUrl";
import SideBarOf from "app/components/SideBar";
import MainLayout from "app/layout/MainLayout";

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


export interface Compras {
  comidaId: number;
  clienteId: number;
  precoTotal: number;
  quantidadeTotal: number;
  createdAt: string;
  comidas: {
    id: number;
    produto: string;
    codigo: string;
    preco: number;
    produtoImage?: string | null;
    disponiveis: number;
    destaque: string;
    categoria: string;
    descricao: string;
  };
}

export interface Clientes {
  id: string;
  name: string;
  email: string;
  cpf: string;
  compras: Compras[]; // Agora compras é um array de objetos
}

function Historico() {
  const { user } = useContext(AuthContext);
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const isMobileScreen = useMediaQuery('only screen and (max-width: 768px)');

  const getHistorico = async () => {
    try {
      const { data } = await api.get(`/historico/${user.id}`);
      setClientes(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistorico();
  }, [user.id]);

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
            sx={{ borderRadius: 5 }}
            maxWidth={2500} minHeight={700} justifyContent="center" alignItems="center" bgcolor={"#fff"}>



            <TableContainer component={Paper} style={{ minHeight: 700, overflow: 'auto', borderRadius: "10px" }}>
              <Table sx={{ minWidth: 700, }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {['Cliente', 'CPF', 'Imagem', 'Produto', 'Valor', 'Quantidade', 'Data da Compra'].map((heading, idx) => (
                      <StyledTableCell key={idx} align="center" style={{ fontWeight: 'bold' }}>
                        {heading}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientes.map((cliente) =>
                    cliente.compras.map((compra, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">{cliente.name}</StyledTableCell>
                        <StyledTableCell align="center">{cliente.cpf}</StyledTableCell>
                        <StyledTableCell align="center">
                          {compra.comidas.produtoImage && (
                            <Tooltip title={compra.comidas.produto}>
                              <img
                                src={getBackUrl() + "/" + compra.comidas.produtoImage}
                                alt={compra.comidas.produto}
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                }}
                              />
                            </Tooltip>
                          )}
                        </StyledTableCell>
                        <TableCell align="center">{compra.comidas.produto}</TableCell>
                        <StyledTableCell align="center">
                          R$ {Number(compra.precoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </StyledTableCell>
                        <StyledTableCell align="center">{compra.quantidadeTotal}</StyledTableCell>
                        <StyledTableCell align="center">{new Date(compra.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default Historico;