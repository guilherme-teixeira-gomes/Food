/* eslint-disable */
import { Router } from "express";

import authRoutes from "./authRoutes";
import AdminsRoutes from "./AdminsRoutes";
import ClientesRoutes from "./ClientesRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import ComidasRoutes from "./ComidasRoutes";
import AprovacoesRoutes from "./AprovacoesRoutes";


const routes = Router();

routes.use("/auth", authRoutes);
routes.use(AdminsRoutes);
routes.use(ClientesRoutes);
routes.use(SuperAdminRoutes);
routes.use(ComidasRoutes);
routes.use(AprovacoesRoutes);


export default routes;
