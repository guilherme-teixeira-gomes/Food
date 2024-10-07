import { createTheme } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes";
import QueryWrapper from "./context/QueryWrapper";
import "./assets/styles/global.css";

const App = () => {
  const [locale, setLocale] = useState<any>();

  const theme = createTheme(
    {
      palette: {
        //primary: { main: "#2576d2" },
        primary: { main: "#00a884" },
      },
    },
    locale,
  );

  useEffect(() => {
    const i18nlocale = localStorage.getItem("i18nextLng");
    if (i18nlocale) {
      const browserLocale =
        i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

      if (browserLocale === "ptBR") {
        setLocale(ptBR);
      }
    }
  }, []);

  return (
    <QueryWrapper>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </QueryWrapper>
  );
};

export default App;
