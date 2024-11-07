import React, { Dispatch, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Grid,
  TextField,
  Box,
  styled,
  Typography,
  Chip,
  LinearProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "app/services/api";
import { toast } from "react-toastify";
import toastError from "app/errors/toastError";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "700px",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "16px",
});

const initialState = {
  name: "",
  cpf: "",
  email: "",
  password: "",
  cargo: "",
  whatsapp: "",
  uf: "",
  cep: "",
};

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<boolean>;
  refresh: () => void;
}

const ModalCadastroClientes = ({ openModal, setOpenModal, refresh }: Props) => {
  const [user] = useState(initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");

  const [passwordStrength, setPasswordStrength] = useState("");

  const handleClose = () => setOpenModal(false);

  const validatePassword = (password: string): void => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    if (hasUpperCase && hasNumber && hasSpecialChar && isLongEnough) {
      setPasswordStrength(password.length >= 12 ? "Forte" : "Média");
    } else {
      setPasswordStrength("Muito Fraca");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !cpf) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (passwordStrength === "Muito Fraca") {
      toast.error("A senha é muito fraca. Por favor, escolha uma senha mais forte.");
      return;
    }

    try {
      await api.post("/auth/signup", { name, email, password, cpf: cpf.replace(/\D/g, "")});
      toast.success("Cadastro realizado com sucesso");
      refresh();
      handleClose();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Modal open={openModal} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
      <Box sx={modalStyle}>
        <Header>
          <AccountCircleIcon fontSize="large" style={{color:"#fe6600"}} />
          <Typography variant="h6" fontWeight="bold">Cadastro de Clientes</Typography>
        </Header>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nome" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="CPF" fullWidth value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Senha" type="password" fullWidth value={password} onChange={handlePasswordChange} required />
            {password && (
              <LinearProgress
                variant="determinate"
                value={passwordStrength === "Forte" ? 100 : passwordStrength === "Média" ? 60 : 20}
                sx={{
                  mt: 1,
                  height: 8,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: passwordStrength === "Forte" ? "#4caf50" : passwordStrength === "Média" ? "#ff9800" : "#f44336",
                  },
                }}
              />
            )}
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="center">
          <Button variant="contained" onClick={handleSignUp} sx={{
            width: "50%",
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
      </Box>
    </Modal>
  );
};

export default ModalCadastroClientes;