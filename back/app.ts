import path from "path";
import helmet from "helmet";
import express from "express";
import "express-async-errors";
import * as dotenv from "dotenv";
import { router } from "./routes";
import { log } from "console-log-colors";
import rateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import { Error } from "./middlewares/error";
import { Header } from "./middlewares/header";

// env
dotenv.config();

const app = express();

// use helmet
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: +process.env.LIMIT!,
  message: {
    message:
      "the number of requests has exceeded the limit, please search again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// limit req
app.use(limiter);

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Header.header);

// file upload middleware
app.use(fileUpload());

// static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", router);

// error controller
app.use(Error.error);

app.listen(process.env.PORT, () =>
  log.green(`start server port : ${process.env.PORT}`)
);
