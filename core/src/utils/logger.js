import winston from "winston";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

const Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json()
  ),
});

if (process.env.NODE_ENV !== "production") {
  Logger.add(
    new winston.transports.File({
      filename: resolve("log/error.log"),
      level: "error",
      timestamp: true,
    })
  );
  Logger.add(
    new winston.transports.File({
      filename: resolve("log/info.log"),
      level: "info",
      timestamp: true,
    })
  );
  Logger.add(
    new winston.transports.File({
      filename: resolve("log/combined.log"),
      timestamp: true,
    })
  );
}

export default Logger;
