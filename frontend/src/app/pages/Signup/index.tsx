import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Button, Box, TextField, useMediaQuery, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RoutesPath } from "app/routes/useRoutes";
import { setCpfMask } from "app/utils/Masks/cpfMask";
import Logo from "../../assets/hungry.png";
import { BackgroundImage } from "./styles";
import toastError from "app/errors/toastError";
import api from "app/services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("only screen and (max-width: 750px)");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !cpf) {
      console.error('Erro no preenchimento do formulário: Campos obrigatórios não preenchidos');
      return;
    }

    if (passwordStrength === "Muito Fraca") {
      toast.error("A senha é muito fraca. Por favor, atenda aos requisitos de senha.");
      return;
    }

    try {
      const body = { name, email, password, cpf: cpf.replace(/\D/g, "") };
      await api.post("/auth/signup", body);
      toast.success("Cadastro realizado com sucesso!");
      navigate(RoutesPath.LOGIN);
    } catch (err) {
      toastError("Erro no cadastro, tente novamente.");
    }
  };

  const getPasswordStrengthColor = (): string => {
    switch (passwordStrength) {
      case "Forte": return "#38c416";
      case "Média": return "#c97200";
      case "Muito Fraca": return "#c90000";
      default: return "";
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fe6600", // fundo laranja
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 2rem", // margem interna para telas menores
      }}
    >
      <Box
        sx={{
          maxWidth: "450px", // largura máxima para o formulário
          width: "100%",
          backgroundColor: "#e6e1d5",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: isMobileScreen ? "180px" : "200px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        <Typography variant="h5" sx={{ fontFamily:"cursive", fontWeight: "bold", color: "#9e4e19", textAlign: "center", marginBottom: "1rem" }}>
          Crie sua Conta
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome Completo"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!name}
              size="small"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CPF"
              variant="outlined"
              value={cpf}
              onChange={(e) => setCpf(setCpfMask(e.target.value))}
              error={!cpf}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!email}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!password}
              size="small"
            />
            {password && (
              <Typography sx={{ fontWeight: "bold", color: getPasswordStrengthColor() }}>
                Força da senha: {passwordStrength}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Button
          sx={{
            backgroundColor: "#fe6600",
            width: "100%",
            height: "50px",
            borderRadius: "6px",
            color: "#fff",
            marginTop: "2rem",
            "&:hover": { backgroundColor: "#ff8533" },
          }}
          onClick={handleSignUp}
          variant="contained"
        >
          Cadastrar
        </Button>

        <Grid item xs={12} sx={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to={RoutesPath.LOGIN} style={{ color: "#fe6600", textDecoration: "none" }}>
            Já possui uma conta? Faça login
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
