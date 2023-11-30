import { Router } from "express";
import { auth } from "../middlewares/auth";
import { postController } from "../controllers/postController";
import { userController } from "../controllers/userController";

export const router = Router();

router.get("/", postController.index);

router.get("/post/:id", postController.show);

router.post("/contact", userController.contact);

router.get("/captcha", userController.captcha);
