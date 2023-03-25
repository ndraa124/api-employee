import { Sequelize } from "sequelize";
import db from "../../../config/db_employee";

const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.sync({ alter: true });

export function getAllUser() {
  return new Promise((resolve, reject) => {
    User.findAll()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createUser(data) {
  return new Promise((resolve, reject) => {
    User.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getUser(id) {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { id: id } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateUser(id, data) {
  return new Promise((resolve, reject) => {
    User.update(data, { where: { id: id } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteUser(id) {
  return new Promise((resolve, reject) => {
    User.destroy({ where: { id: id } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
