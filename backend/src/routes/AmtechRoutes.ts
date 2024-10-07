/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as AmtechController from "../controllers/AmtechController";
import isAuth from "../middleware/isAuth";
import fs from "fs";
import multer from "multer";
import { uploadOperadoraDoc } from "../middleware/uploadOperadoraDoc";
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const amtechRoutes = Router();

amtechRoutes.get("/amtech", AmtechController.getAmtechById);

amtechRoutes.get("/amtech/:id", AmtechController.getAdmAmtechById);

amtechRoutes.get("/amtech/operadora/:id", AmtechController.getOperatorAmtechById);


export default amtechRoutes;