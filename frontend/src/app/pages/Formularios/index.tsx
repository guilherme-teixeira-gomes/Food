import {
  Box,
  Button,
  Card,
  Container,
  Drawer,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import SideBarOf from "app/components/SideBar";
import { AuthContext } from "app/context/Auth/AuthContext";
import toastError from "app/errors/toastError";
import api from "app/services/api";
import { i18n } from "app/translate/i18n";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


interface Inconnet {
  id: number,
  name: string,
}

const initialState = {
  name: "",
  rg: "",
  matricula: "",
  cpf: "",
  pis: "",
  ctps: "",
  nascimento: "",
  admissao: "",
  sexo: "",
  whatsapp: "",
  email: "",
  ic: "",
  cc: "",
  empresa: "",
  setor: "",
  cargo: "",
  municipio: "",
  uf: "",
  cep: "",
  bairro: "",
  logradouro: "",
  numero: "",
  medico: "",
  clinica: "",
  tipoDeExame: "",
  especiais: "",
  exames: "",
  emailResponsavel: "",
  observacao: "",
  obsAso: "",
};

function Formularios() {
  const options = ["+55"];
  const [user, setUser] = useState(initialState);
  const [selectedOption, setSelectedOption] = useState("");
  const [inconnet, setInnconet] = useState<Inconnet[]>([])

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  const handleSignUpUser = async ({
  }) => {
      const body = {
          ...user,
      }
      try {
          console.log('Cadastrando...')
          const { data } = await api.post("/auth/signup", body);
          toast.success(i18n.t("Cadastro realizado com sucesso"));
      } catch (err) {
          toastError(err);
      } finally {

      }
  };
  return (

    <Box className="d-flex" style={{ backgroundColor: "#202125" }}>
      <div style={{ width: "300px" }}>
        <SideBarOf />
      </div>

      <Paper
        style={{
          backgroundColor: "#fff",
          borderRadius: "30px",
          width: "100%",
        }}
      >
    
        <h4 style={{ marginTop: "50px", marginBottom: "50px", marginLeft: "3%" }}>
          Cadastro - Novo Usuário
        </h4>
        <Grid container spacing={2} style={{ marginLeft: "1%" }}>
          <Grid item xs={12} md={4}>
            <label>Nome</label>
            <div className="form-field">
              <TextField
                required
                className="inputdados"
                size="small"
                placeholder="Ex: Jorge"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Sobrenome</label>
            <div className="form-field">
              <TextField
                required
                className="inputdados"
                size="small"
                placeholder="Ex: Silva"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Tipo de Usuário</label>
            <div className="form-field">
              <TextField
                select
                required
                name="admin"
                id="admin"
                //value={admin}
                //onChange={}
                className="inputdados"
                size="small"
                placeholder="Tipo de Usuário"
              >
                <MenuItem value="COORDENADOR">Coordernador</MenuItem>
                <MenuItem value="DISPAT">Dispat</MenuItem>
                <MenuItem value="AGENTE">Agente Service Desk</MenuItem>
                <MenuItem value="TECNICO">Técnico</MenuItem>
                <MenuItem value="CUSTOMER">Customer</MenuItem>
              </TextField>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginLeft: "1%", marginTop: "1%" }}>
          <Grid item xs={12} md={4}>
            <label>E-mail</label>
            <div className="form-field">
              <TextField
                required
                className="inputdados"
                size="small"
                placeholder="Ex: jsilva@exemplo.com"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Senha</label>
            <div className="form-field">
              <TextField
                required
                type="password"
                className="inputdados"
                size="small"
                placeholder="***"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Confirme sua senha</label>
            <div className="form-field">
              <TextField
                required
                className="inputdados"
                size="small"
                type="password"
                placeholder="***"
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginLeft: "1%", marginTop: "1%" }}>
          <Grid item xs={12} md={4}>
            <label>Celular</label>
            <div
              className="form-field"
              style={{ display: "flex", flexDirection: "row", gap: "6px" }}
            >
              <TextField
                required
                style={{ width: "22%" }}
                className="inputdados"
                size="small"
                select
                placeholder="Selecione uma opção"
                SelectProps={{
                  displayEmpty: true,
                }}
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                style={{ width: "57%" }}
                size="small"
                className="inputdados"
                placeholder="Digite seu telefone"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Número administrativo</label>
            <div
              className="form-field"
              style={{ display: "flex", flexDirection: "row", gap: "6px" }}
            >
              <TextField
                required
                style={{ width: "22%" }}
                size="small"
                select
                className="inputdados"
                placeholder="Selecione uma opção"
                SelectProps={{
                  displayEmpty: true,
                }}
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                className="inputdados"
                style={{ width: "57%" }}
                size="small"
                placeholder="Digite seu telefone"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Ativo</label>
            <div className="form-field">
              <TextField
                select
                required
                name="ativo"
                id="ativo"
                //value={admin}
                //onChange={}
                className="inputdados"
                size="small"
              >
                <MenuItem value="sim">Sim</MenuItem>
                <MenuItem value="nao">Não</MenuItem>
              </TextField>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginLeft: "1%", marginTop: "1%" }}>
          <Grid item xs={12} md={4}>
            <label>Valido de:</label>
            <div className="form-field">
              <TextField
                required
                type="date"
                className="inputdados"
                size="small"
                placeholder="Ex: Jorge"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Valido até:</label>
            <div className="form-field">
              <TextField
                required
                type="date"
                className="inputdados"
                size="small"
                placeholder="Ex: Silva"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Categoaria</label>
            <div className="form-field">
              <TextField
                select
                required
                name="admin"
                id="admin"
                //value={admin}
                //onChange={}
                className="inputdados"
                size="small"
                placeholder="Tipo de Usuário"
              >
                <MenuItem value="COORDENADOR">Customer</MenuItem>
                <MenuItem value="DISPAT">External</MenuItem>
                <MenuItem value="AGENTE">Free Lancer</MenuItem>
                <MenuItem value="TECNICO">Internal</MenuItem>
                <MenuItem value="CUSTOMER">Self Employee</MenuItem>
                <MenuItem value="CUSTOMER">Temporary</MenuItem>
              </TextField>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginLeft: "1%", marginTop: "1%" }}>
          <Grid item xs={12} md={4}>
            <label>Título</label>
            <div className="form-field">
              <TextField
                select
                required
                name="titulo"
                id="admtituloin"
                //value={admin}
                //onChange={}
                className="inputdados"
                size="small"
                placeholder="Título"
              >
                <MenuItem value="COORDENADOR">Agent</MenuItem>
                <MenuItem value="DISPAT">Coordinator</MenuItem>
                <MenuItem value="AGENTE">Customer</MenuItem>
                <MenuItem value="TECNICO">Director</MenuItem>
                <MenuItem value="CUSTOMER">Logistic</MenuItem>
                <MenuItem value="CUSTOMER">Marketing</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Recursivo</label>
            <div className="form-field">
              <TextField
                select
                required
                name="recursivo"
                id="recursivo"
                //value={admin}
                //onChange={}
                className="inputdados"
                size="small"
                placeholder="Recusivo"
              >
                <MenuItem value="sim">Sim</MenuItem>
                <MenuItem value="não">Não</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <label>Entidade</label>
            <div className="form-field">
              <TextField
                select
                required
                name="entidade"
                id="entidade"
                //value={admin}
                //onChange={}
                className="inputdados"
                size="small"
                placeholder="Entidade"
              >
                <MenuItem value="INCONNET">Innconet</MenuItem>
              </TextField>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginLeft: "1%", marginTop: "1%" }}>
          <Grid item xs={12} md={4}>
            <label>Fuso Horario</label>
            <div className="form-field">
              <TextField
                select
                required
                name="titulo"
                id="admtituloin"
                //value={admin}
                //onChange={}
                className="inputdados"
                size="small"
                placeholder="Título"
              >
                <MenuItem value="COORDENADOR">Agent</MenuItem>
                <MenuItem value="DISPAT">Coordinator</MenuItem>
                <MenuItem value="AGENTE">Customer</MenuItem>
                <MenuItem value="TECNICO">Director</MenuItem>
                <MenuItem value="CUSTOMER">Logistic</MenuItem>
                <MenuItem value="CUSTOMER">Marketing</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <label>Comentarios</label>
            <div className="form-field">
              <TextField
                required
                name="comentarios"
                id="comentarios"
                multiline
                rows={4}
                //value={admin}
                //onChange={}
                className="inputdados"
                size="small"
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginLeft: "35%", marginTop: "1%", marginBottom: "3%" }}>
          <Grid item xs={12} md={6}>
            <Button
            onClick={handleSignUpUser}
              style={{
                backgroundColor: "#30bc65",
                width: "50%",
                color: "#fff",
                whiteSpace: "nowrap"
              }}
            >
              Cadastrar usuário
            </Button>
          </Grid>
        </Grid>
      </Paper>

    </Box>
  );
}

export default Formularios;

