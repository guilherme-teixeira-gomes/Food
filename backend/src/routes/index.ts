/* eslint-disable */
import { Router } from "express";

import authRoutes from "./authRoutes";
import medicoRoutes from "./medicoRoutes";
import adminRoutes from "./AdminsRoutes";
import amtechRoutes from "./AmtechRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use(adminRoutes);
routes.use(amtechRoutes);
routes.use(medicoRoutes);


export default routes;
