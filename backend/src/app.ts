/* eslint-disable prettier/prettier */
import "./bootstrap";
import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";

import "./database";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";
import routes from "./routes";
import { logger } from "./utils/logger";
import path from "path";

// Sentry.init({ dsn: process.env.SENTRY_DSN });

const staticPath = path.join(__dirname, '/../uploads');

const app = express();

app.use(express.static(staticPath));

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.get("/", (req, res) => {
  res.send({ message: "Hello World from am_tech 2!" })
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(Sentry.Handlers.requestHandler());
app.use("/public", express.static(uploadConfig.directory));
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err);
  return res.status(500).json({ error: err.message });
});

export default app;
