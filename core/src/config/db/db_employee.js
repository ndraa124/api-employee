import { Sequelize } from "sequelize";
import Logger from "../../utils/logger";
import dotenv from "dotenv";

dotenv.config();

const conn = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    pool: {
      max: 7,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

if (process.env.NODE_ENV !== "production") {
  conn.options.logging = (msg) => Logger.info(msg);
} else {
  conn.options.logging = false;
}

conn
  .authenticate()
  .then(() => {
    console.log("success to connect to the database");
  })
  .catch((err) => {
    console.log("unable to connect to the database:", err);
  });

export default conn;
