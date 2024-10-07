import { Chip, Container, Drawer, Grid, MenuItem, TextField } from "@mui/material";
import SideBarOf from "app/components/SideBar";
import TopBar from "app/components/TopBar";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as S from "./styles";
import { Stack } from "@mui/material";
import { ThemeContext } from "styled-components";
import { GridWrapper, SectionWrapper, WrapperBack } from "./styles";
import api from "app/services/api";
import ProdutoImage from "app/components/ProdutoImage";
import { useNavigate } from "react-router-dom";


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
    setLoading(false); // Set loading to false once component is fully loaded
  }, []);

  return (

    <div className="d-flex" style={{}}>
      <SideBarOf />
      <SectionWrapper>
        <GridWrapper>
          <WrapperBack>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2%", marginBottom: "5%", paddingRight: "2%", paddingLeft: "2%" }}>
              <div>
                <h4
                  style={{ color: "#757575" }}
                >
                  Cadaste um novo item
                </h4>
              </div>
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

              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="produto"
                      name="produto"
                      fullWidth
                      autoFocus
                      label="Nome do Produto"
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
                      label="Valor do Produto"
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
          </WrapperBack>
        </GridWrapper>
      </SectionWrapper>
    </div>

  );
};


export default CadastrarAlimentos;
