/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as SessionController from "../controllers/SessionController";
import * as ClientesController from "../controllers/ClientesController";
import * as RecoverPassword from "../controllers/RecoverPasswordController";
import * as AdminsController from "../controllers/AdminsController";
import * as SuperAdminController from "../controllers/SuperAdminController";
import isAuth from "../middleware/isAuth";

const authRoutes = Router();

authRoutes.post("/signup", ClientesController.store);

authRoutes.post("/verifyEmail", ClientesController.VerifyEmailUser);

authRoutes.post("/login", SessionController.store);

authRoutes.post("/update-password", ClientesController.updatePassword);

authRoutes.post("/signup_admin", AdminsController.store);

authRoutes.post("/signup_super", SuperAdminController.store);

authRoutes.delete("/logout", SessionController.remove);

authRoutes.post("/refresh_token", SessionController.update);

authRoutes.post("/recover_password", RecoverPassword.store);

authRoutes.post("/verify_password_token", RecoverPassword.VerifyToken);

authRoutes.post("/password_reset", RecoverPassword.update);


export default authRoutes;
