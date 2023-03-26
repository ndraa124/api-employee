import { Sequelize } from "sequelize";
import db from "../db/db_employee";

const Employee = db.define(
  "employee",
  {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    place_of_birth: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Employee.sync({ alter: true });

export default Employee;
