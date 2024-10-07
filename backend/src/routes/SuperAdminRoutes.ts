/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as SuperAdminController from "../controllers/SuperAdminController";
import isAuth from "../middleware/isAuth";
import fs from "fs";
import multer from "multer";
import { uploadOperadoraDoc } from "../middleware/uploadOperadoraDoc";
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const routes = Router();

routes.get("/super-admins", SuperAdminController.show);

routes.get("/super-admins/:id", SuperAdminController.showById);

routes.get("/all/admin/:id", SuperAdminController.showAllAdmin);


export default routes;