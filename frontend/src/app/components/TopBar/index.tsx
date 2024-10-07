
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar } from "@mui/material";
import { AuthContext } from "app/context/Auth/AuthContext";
import api from "app/services/api";
import React, { useContext, useEffect, useState } from "react";
interface Inconnet {
  id: number,
  name: string,
}

function TopBar() {
  const [inconnet, setInnconet] = useState<Inconnet | null>(null)
  const { user, setUser } = useContext(AuthContext);




  const getInconnet = async () => {
    try {
      const { data } = await api.get(`/amtech/${user.id}`);

      setInnconet(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getInconnet();

  }, []);
  return (
    <div className="topbar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #000",
          marginBottom: "50px",
          width: "100%",
          height: "100px",
          backgroundColor: "#fff",
          
        }}
      >
        <h5 style={{marginLeft:"3%", marginRight: "20px", whiteSpace: "nowrap" }}>
          Olá, {inconnet?.name}! 👋
        </h5>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px", // Espaçamento à esquerda do ícone
            backgroundColor: "#fff", // Cor de fundo da caixa de entrada
            borderRadius: "5px", // Borda arredondada
            width: "400px", // Largura da caixa de entrada
          }}
        >
          <button
            style={{
              border: "none",
              backgroundColor: "#fff",
              outline: "none",
              fontSize: "40px",
              cursor: "pointer",
            }}
          >
            <SearchIcon style={{ color: "#555" }} />
          </button>
          <input
            type="text"
            placeholder="Pesquise no sistema!"
            style={{
              width: "100%",
              height: "40px",
              marginLeft: "10px",

              borderRadius: "10px",
              outline: "none",
              backgroundColor: "transparent",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <NotificationsNoneIcon
              style={{ fontSize: "40px", marginRight: "20px" }}
            />
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
