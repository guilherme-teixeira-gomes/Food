/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as AprovacoesController from "../controllers/AprovacoesController"


const routes = Router();

routes.post("/aproved/produto", AprovacoesController.aproved);

routes.post("/reproved/produto", AprovacoesController.reproved);

export default routes;
