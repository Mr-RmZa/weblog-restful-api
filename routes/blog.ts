import { Router } from "express";
import { auth } from "../middlewares/auth";
import { postController } from "../controllers/postController";

export const routerBlog = Router();

routerBlog.post("/create", auth.authenticated, postController.store);

routerBlog.put("/edit/:id", auth.authenticated, postController.update);

routerBlog.delete("/delete/:id", auth.authenticated, postController.delete);

routerBlog.post("/upload", auth.authenticated, postController.upload);
