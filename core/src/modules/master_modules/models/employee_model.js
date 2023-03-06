import { Sequelize } from "sequelize";
import db from "../../../config/db_employee";

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

export function getAllEmployee() {
  return new Promise((resolve, reject) => {
    Employee.findAll()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createEmployee(data) {
  return new Promise((resolve, reject) => {
    Employee.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getEmployee(id) {
  return new Promise((resolve, reject) => {
    Employee.findOne({ where: { id: id } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateEmployee(id, data) {
  return new Promise((resolve, reject) => {
    Employee.update(data, { where: { id: id } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteEmployee(id) {
  return new Promise((resolve, reject) => {
    Employee.destroy({ where: { id: id } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
