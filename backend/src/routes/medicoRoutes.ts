/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as UserCustomerController from "../controllers/UserCustomerController";

const authRoutes = Router();

authRoutes.get("/users/table", UserCustomerController.showUsersTable);

authRoutes.get("/especialista/table/:id/operadora", UserCustomerController.showEspecialistaTable);

authRoutes.get("/medico/:id/perfil", UserCustomerController.show);

authRoutes.put("/medico/:id/perfil", UserCustomerController.updatePerfil);

authRoutes.put("/medico/:id/atualizar-status", UserCustomerController.updateMedicoStatus);

authRoutes.put("/medico/:id/aprovar-perfil", UserCustomerController.aprovarMedicoPerfil);

authRoutes.put("/medico/:id/recusar-perfil", UserCustomerController.recusarMedicoPerfil);

authRoutes.put("/medico/:id/update-operadora", UserCustomerController.updateOperadora);

authRoutes.put("/medico/:id/set-ausencia", UserCustomerController.setPeriodoAusencia);

authRoutes.put("/medico/:id/finalizar-ausencia", UserCustomerController.finalizarPeriodoAusencia);

export default authRoutes;
