import Employee from "../../../config/table/employee";

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
