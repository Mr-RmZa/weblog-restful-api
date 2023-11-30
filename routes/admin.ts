import { Router } from "express";
import { auth } from "../middlewares/auth";
import { userController } from "../controllers/userController";

export const routerAdmin = Router();

routerAdmin.post("/login", userController.login);

// routerAdmin.get("/logout", auth.authenticated, userController.logout);

routerAdmin.post("/register", userController.register);

routerAdmin.post("/forgetPassword", userController.forgetPassword);

routerAdmin.post("/resetPassword/:token", userController.resetPassword);
