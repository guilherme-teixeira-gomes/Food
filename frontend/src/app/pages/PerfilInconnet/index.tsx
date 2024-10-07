import { Container, Drawer, Paper } from "@mui/material";
import SideBarOf from "app/components/SideBar";
import React, { useState } from "react";
import TopBar from "app/components/TopBar";
import MainLayout from "app/layout/MainLayout";

function Perfil() {
  return (
    <div className="d-flex" style={{ backgroundColor: "#202125" }}>
      <div style={{ width: "300px" }}>
        <SideBarOf />
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "30px",
          width: "100%",
          height: "100vh",
        }}
      >
        <div style={{ margin: "30px" }}>
          
            <TopBar />
            <h1>PAGINA PERFIL</h1>
            
          
        </div>
      </div>
    </div>
  );
}

export default Perfil;
