import { createError } from "http-errors";
import { _error } from "./src/utils/status";

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import responseTime from "response-time";
import * as helmet from "helmet";

import routes from "./routes";

const app = express();

const corsOptions = {
  origin: "*",
  method: ["GET", "POST"],
  allowedHeaders: [
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Requested-With",
  ],
};

app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(cors(corsOptions));
app.use(responseTime());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api", routes);
app.use((_req, _res, next) => {
  next(createError(404));
});

app.use((err, req, res, _next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (req.app.get("env") === "development") {
    console.log(err);
  }

  _error({
    code: err.status || 500,
    response: res,
    message: "Internal Server Error",
  });
});

export default app;
