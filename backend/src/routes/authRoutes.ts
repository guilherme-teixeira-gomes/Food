/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import * as SessionController from "../controllers/SessionController";
import * as UserCustomerController from "../controllers/UserCustomerController";
import * as RecoverPassword from "../controllers/RecoverPasswordController";
import * as AdminsController from "../controllers/AdminsController";

import * as AmtechController from "../controllers/AmtechController";
import isAuth from "../middleware/isAuth";

const authRoutes = Router();

authRoutes.post("/signup", UserCustomerController.store);

authRoutes.post("/verifyEmail", UserCustomerController.VerifyEmailUser);

authRoutes.post("verifyCrm", UserCustomerController.VerifyCrmUser);

authRoutes.post("/login", SessionController.store);

authRoutes.post("/update-password", UserCustomerController.updatePassword);

authRoutes.post("/signup_admin", AdminsController.store);

authRoutes.post("/signup_amtech", AmtechController.storeUsuarioAmtech);

authRoutes.delete("/logout", SessionController.remove);

authRoutes.post("/refresh_token", SessionController.update);

authRoutes.post("/refresh_admin_token", SessionController.updateAdmin);

authRoutes.post("/recover_password", RecoverPassword.store);

authRoutes.post("/verify_password_token", RecoverPassword.VerifyToken);

authRoutes.post("/password_reset", RecoverPassword.update);


export default authRoutes;
