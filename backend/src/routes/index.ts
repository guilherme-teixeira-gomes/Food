/* eslint-disable */
import { Router } from "express";

import authRoutes from "./authRoutes";
import AdminsRoutes from "./AdminsRoutes";
import ClientesRoutes from "./ClientesRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";


const routes = Router();

routes.use("/auth", authRoutes);
routes.use(AdminsRoutes);
routes.use(ClientesRoutes);
routes.use(SuperAdminRoutes);


export default routes;
