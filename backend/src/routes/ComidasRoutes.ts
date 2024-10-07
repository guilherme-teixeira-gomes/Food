/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as ComidasController from "../controllers/ComidasController";
import multer from 'multer';
import path from 'path';
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/comidas')
  },
  filename: function (req, file, cb) {
      const uniqueId = uuidv4(); // Generate a unique ID for the filename
      const fileExt = path.extname(file.originalname); // Get the file extension from the original filename
      const newFilename = `${uniqueId}${fileExt}`;
      cb(null, newFilename)
  }
});
const upload = multer({ storage: storage })
const routes = Router();


routes.get("/show/food", ComidasController.show);

routes.post("/cadastrar/comidas", upload.single('file'),ComidasController.store);

export default routes;
