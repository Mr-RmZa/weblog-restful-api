import path from "path";
import helmet from "helmet";
import express from "express";
import * as dotenv from "dotenv";
import { router } from "./routes";
import connect from "./config/db";
import { log } from "console-log-colors";
import { routerBlog } from "./routes/blog";
import fileUpload from "express-fileupload";
import { routerAdmin } from "./routes/admin";
import { header } from "./middlewares/header";
import { errorHandler } from "./middlewares/error";

const app = express();

// use helmet
app.use(helmet());

// env
dotenv.config({ path: "./config/config.env" });

// database
connect.mongodb();

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(header.setHeader);

// file upload middleware
app.use(fileUpload());

// static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", router);
app.use("/admin", routerAdmin);
app.use("/blog", routerBlog);

// error controller
app.use(errorHandler.error);

app.listen(process.env.PORT, () =>
  log.green(`start server port : ${process.env.PORT}`)
);
