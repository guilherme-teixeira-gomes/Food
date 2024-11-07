/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as ClientesController from "../controllers/ClientesController";

const authRoutes = Router();

authRoutes.get("/clientes/table", ClientesController.showUsersTable);

authRoutes.get("/clienbte/table/:id/empresa", ClientesController.showEspecialistaTable);

authRoutes.get("/cliente/:id/perfil", ClientesController.show);

authRoutes.get("/historico/:clienteId", ClientesController.historico);

authRoutes.put("/cliente/:id/perfil", ClientesController.updatePerfil);

export default authRoutes;
