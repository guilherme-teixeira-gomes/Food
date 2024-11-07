import React, { useContext, useEffect, useState } from "react";
import { GridWrapper, SectionWrapper, Wrapper, } from "./styles";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useMediaQuery } from "@mui/material";
import api from "app/services/api";
import { AuthContext } from "app/context/Auth/AuthContext";
import getBackUrl from "app/utils/generics/getBackUrl";
import SideBarOf from "app/components/SideBar";



export interface Compras {
  comidaId: number;
  clienteId: number;
  precoTotal: number;
  quantidadeTotal: number;
  createdAt:string;
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
  compras: Compras[];
}

function HistoricoTodosClientes() {

  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isMobileScreen = useMediaQuery('only screen and (max-width: 768px)');

  const getHistorico = async () => {
    try {
      const { data } = await api.get(`/historico`);
      setClientes(data); 
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistorico();
  }, []);

  return (
    <div className="d-flex">
    <div style={{ width: '300px' }}>
      <SideBarOf />
    </div>
    <Grid container spacing={3} justifyContent="center" style={{marginTop:"5%"}}>
      <Grid item xs={12} md={9}>
        <Paper style={{ padding: 20, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <TableContainer component={Paper} style={{ maxHeight: 600, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {['Colaborador', 'CPF', 'Imagem', 'Produto', 'Valor', 'Quantidade', 'Data da Compra'].map((heading, idx) => (
                    <TableCell key={idx} align="center" style={{ fontWeight: 'bold' }}>
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes.map((cliente) =>
                  cliente.compras.map((compra, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{cliente.name}</TableCell>
                      <TableCell align="center">{cliente.cpf}</TableCell>
                      <TableCell align="center">
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
                      </TableCell>
                      <TableCell align="center">{compra.comidas.produto}</TableCell>
                      <TableCell align="center">
                        R$ {Number(compra.precoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell align="center">{compra.quantidadeTotal}</TableCell>
                      <TableCell align="center">{new Date(compra.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  </div>
);
}

export default HistoricoTodosClientes;