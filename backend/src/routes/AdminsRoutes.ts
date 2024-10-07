/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import fs from 'fs';
import * as AdminsController from "../controllers/AdminsController";
import isAuth from "../middleware/isAuth";
import multer from "multer";
import path from "path";
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = 'public/uploads/avatars';

        // Check if the destination directory exists
        if (!fs.existsSync(destinationPath)) {
            // If it doesn't exist, create the directory
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
        const uniqueId = uuidv4(); // Generate a unique ID for the filename
        const fileExt = path.extname(file.originalname); // Get the file extension from the original filename
        const newFilename = `${uniqueId}${fileExt}`;
        cb(null, newFilename)
    }
});
const upload = multer({ storage: storage })

const adminRoutes = Router();

adminRoutes.get("/admins", AdminsController.index);

adminRoutes.get("/admins/drop-down", AdminsController.dropdown);

adminRoutes.get("/admins/:id", AdminsController.getAdminById);

adminRoutes.put("/admins/:id/perfil",upload.single("avatar"), AdminsController.updatePerfil);



export default adminRoutes;