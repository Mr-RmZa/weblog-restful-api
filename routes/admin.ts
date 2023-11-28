import { Router } from "express";
import { auth } from "../middlewares/auth";
import { userController } from "../controllers/userController";

export const routerAdmin = Router();

// routerAdmin.post("/login", userController.recaptcha, userController.rememberMe);

routerAdmin.get("/logout", auth.authenticated, userController.logout);

routerAdmin.post("/register", userController.createUser);

// routerAdmin.post("/forgetPassword", userController.handleForgetPassword);

// routerAdmin.get("/resetPassword/:token", userController.resetPassword);

// routerAdmin.post("/resetPassword/:id", userController.handleResetPassword);
