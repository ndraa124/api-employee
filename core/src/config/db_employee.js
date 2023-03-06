import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const conn = new Sequelize(
  process.env.DEV_DATABASE_SERVICE,
  process.env.DEV_USER_SERVICE,
  process.env.DEV_PASS_SERVICE,
  {
    host: process.env.DEV_HOST_SERVICE,
    dialect: "mysql",
    pool: {
      max: 7,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

conn
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default conn;
