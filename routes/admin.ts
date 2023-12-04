import { Router } from "express";
import { userController } from "../controllers/userController";

export const routerAdmin = Router();

routerAdmin.post("/login", userController.login);

routerAdmin.post("/register", userController.register);

routerAdmin.post("/forgetPassword", userController.forgetPassword);

routerAdmin.post("/resetPassword/:token", userController.resetPassword);
