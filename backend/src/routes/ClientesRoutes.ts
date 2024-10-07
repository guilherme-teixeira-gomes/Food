/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as ClientesController from "../controllers/ClientesController";

const authRoutes = Router();

authRoutes.get("/users/table", ClientesController.showUsersTable);

authRoutes.get("/especialista/table/:id/operadora", ClientesController.showEspecialistaTable);

authRoutes.get("/medico/:id/perfil", ClientesController.show);

authRoutes.put("/medico/:id/perfil", ClientesController.updatePerfil);

authRoutes.put("/medico/:id/atualizar-status", ClientesController.updateMedicoStatus);

authRoutes.put("/medico/:id/aprovar-perfil", ClientesController.aprovarMedicoPerfil);

authRoutes.put("/medico/:id/recusar-perfil", ClientesController.recusarMedicoPerfil);

authRoutes.put("/medico/:id/update-operadora", ClientesController.updateOperadora);

authRoutes.put("/medico/:id/set-ausencia", ClientesController.setPeriodoAusencia);

authRoutes.put("/medico/:id/finalizar-ausencia", ClientesController.finalizarPeriodoAusencia);

export default authRoutes;
