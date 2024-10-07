import { Card, Container, Drawer, Paper } from "@mui/material";
import SideBarOf from "app/components/SideBar";



function TelaInicial() {
  return (
    
    <div className="d-flex" style={{ backgroundColor: "#202125" }}>
      <SideBarOf />
      

      <div
        style={{
          backgroundColor: "#fff",
          
          width: "100%",
          height: "100vh",
        }}
      >
        
        <div style={{ margin: "30px" }}>
          
          <div style={{ display: "flex", flexWrap: "wrap" }}>
          
            <Card style={{ margin: "30px", maxWidth: "400px" }}>
              <h1>PAGINA HOME</h1>
             
            </Card>

            <Card style={{ margin: "30px", maxWidth: "400px" }}>
              <h1>PAGINA HOME</h1>
           
            </Card>

            <Card style={{ margin: "30px", maxWidth: "600px" }}>
              <h1>PAGINA HOME</h1>
             
            </Card>
           
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
