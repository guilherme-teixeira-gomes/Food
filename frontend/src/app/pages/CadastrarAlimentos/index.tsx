import { Box, Chip, Container, Drawer, Grid, MenuItem, TextField, Typography, useMediaQuery } from "@mui/material";
import SideBarOf from "app/components/SideBar";

import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as S from "./styles";
import { Stack } from "@mui/material";
import { ThemeContext } from "styled-components";
import { GridWrapper, SectionWrapper, WrapperBack } from "./styles";
import api from "app/services/api";
import ProdutoImage from "app/components/ProdutoImage";
import { useNavigate } from "react-router-dom";
import MainLayout from "app/layout/MainLayout";


const initialState = {
  produto: "",
  codigo: "",
  preco: "",
  disponiveis: "",
  destaque: "",
  categoria: "",
  descricao: "",
}

const CadastrarAlimentos: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [food, setFood] = useState(initialState);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const navigate = useNavigate();
  const [produtoLogo, setProdutoLogo] = useState<File | null>(null);

  const handleChangeBenefitData = (obj: Object): void => {
    setFood(prev => ({
      ...prev,
      ...obj
    }));
  }

  const postFood = async () => {

    try {
      const formData = new FormData();

      formData.append("produto", food.produto);
      formData.append("codigo", food.codigo);
      formData.append("preco", food.preco);
      formData.append("disponiveis", food.disponiveis);
      formData.append("destaque", food.destaque);
      formData.append("categoria", food.categoria);
      formData.append("descricao", food.descricao);

      if (produtoLogo) {
        formData.append("file", produtoLogo);
      }

      await api.post("/cadastrar/comidas", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      resetForm();
      alert("Produto criado com sucesso!");
      navigate("");

    } catch (e) {
      console.log(e);
    }
  }

  const resetForm = (): void => {
    setFood(initialState);
    setProdutoLogo(null);
  }
  useEffect(() => {
    setLoading(false);
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
            sx={{
              borderRadius: 5,
            }}
            maxWidth={2500} justifyContent="center" alignItems="center" bgcolor={"#fff"}>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2%", marginBottom: "5%", paddingRight: "2%", paddingLeft: "2%", paddingTop: "2%" }}>

              <h4
                style={{ color: "#9e4e19" }}
              >
                Cadastre um novo prato
              </h4>

              <Stack direction="row" spacing={1}>
                <Chip label="Em Aprovação"
                  style={{
                    backgroundColor: "#fe6600",
                    color: "#fff",
                    fontSize: "12px",
                    padding: "7px 7px",
                    fontWeight: "bold",
                    marginRight: "2%"
                  }}
                  onClick={() => navigate(``)}
                />
                <Chip label="Disponiveis"
                  style={{
                    backgroundColor: "#fe6600",
                    color: "#fff",
                    fontSize: "12px",
                    padding: "7px 7px",
                    fontWeight: "bold",
                    marginRight: "2%"
                  }}
                  onClick={() => navigate(``)}
                />

              </Stack>
            </div>

            <Grid container spacing={3} style={{ padding: "1rem" }}>
              <Grid item xs={12} md={4} style={{ marginTop: "-3%" }}>
                <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ProdutoImage onChangeImage={setProdutoLogo} src="" />
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="produto"
                      name="produto"
                      fullWidth
                      autoFocus
                      label="Nome do Prato"
                      autoComplete="produto"
                      onChange={(e: { target: { value: any; }; }) =>
                        handleChangeBenefitData({ produto: e.target.value })
                      }
                      value={food.produto}
                      size="small"
                    />

                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="codigo"
                      name="codigo"
                      fullWidth
                      label="Codigo"
                      autoComplete="codigo"
                      onChange={(e: { target: { value: any; }; }) =>
                        handleChangeBenefitData({ codigo: e.target.value })
                      }
                      value={food.codigo}
                      size="small"
                    />

                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="preco"
                      name="preco"
                      label="Valor do Prato"
                      fullWidth
                      autoComplete="Valor"
                      size="small"
                      value={food.preco}
                      onChange={(e: { target: { value: string; }; }) => handleChangeBenefitData({ preco: e.target.value.replace(/[^0-9.,]/g, '') })}
                      inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="disponiveis"
                      fullWidth
                      name="disponiveis"
                      label="Quantidade Disponiveis"
                      autoComplete="disponiveis"
                      onChange={(e: { target: { value: any; }; }) =>
                        handleChangeBenefitData({ disponiveis: e.target.value })
                      }
                      value={food.disponiveis}
                      size="small"
                    />

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="categoria"
                      fullWidth
                      select
                      name="categoria"
                      label="Categoria"
                      autoComplete="destaque"
                      onChange={(e: { target: { value: any; }; }) =>
                        handleChangeBenefitData({ categoria: e.target.value })
                      }
                      value={food.categoria}
                      size="small"
                    >
                      <MenuItem value="Carnes">Carnes</MenuItem>
                      <MenuItem value="Japonesas">Comida Japonesa</MenuItem>
                      <MenuItem value="Hamburguer">Hamburguers</MenuItem>
                      <MenuItem value="Massa">Massas</MenuItem>
                      <MenuItem value="Vegetais">Vegetais</MenuItem>
                      <MenuItem value="Bebidas">Bebidas</MenuItem>
                      <MenuItem value="Doces">Doces</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="destaque"
                      fullWidth
                      select
                      name="destaque"
                      label="Destacar"
                      autoComplete="destaque"
                      onChange={(e: { target: { value: any; }; }) =>
                        handleChangeBenefitData({ destaque: e.target.value })
                      }
                      value={food.destaque}
                      size="small"
                    >
                      <MenuItem value="Sim">Sim</MenuItem>
                      <MenuItem value="Não">Não</MenuItem>
                    </TextField>
                  </Grid>


                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      id="descricao"
                      fullWidth
                      name="descricao"
                      multiline
                      rows={4}
                      label="Descrição"
                      autoComplete="municipio"
                      onChange={(e: { target: { value: any; }; }) =>
                        handleChangeBenefitData({ descricao: e.target.value })
                      }
                      value={food.descricao}
                      size="small"
                    />

                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div style={{ display: "flex", padding: "1.5rem" }}>
              <Chip label="Cadastrar Alimento"
                style={{
                  backgroundColor: "#fe6600",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "7px 7px",
                  fontWeight: "bold",
                }}
                onClick={postFood}
              />
            </div>
          </Box>
        </Box>
      </div>
    </Box>
  );
};


export default CadastrarAlimentos;
