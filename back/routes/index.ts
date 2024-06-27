import { Router } from "express";
import { UserController } from "../controllers/userController";

export const router = Router();

router.post("/otp", UserController.otp);

router.post("/rest", UserController.rest);

router.post("/login", UserController.login);

router.post("/password", UserController.password);
