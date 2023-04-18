import User from "../../../config/table/user";

const responseListUser = (result) => {
  const data = [];

  result.forEach((el, i) => {
    data[i] = {
      id: el.id,
      username: el.username,
      created_at: el.created_at,
      updated_at: el.updated_at,
    };
  });

  return data;
};

export function getAllUser() {
  return new Promise((resolve, reject) => {
    User.findAll()
      .then((result) => {
        resolve(responseListUser(result));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getAllUsername(username) {
  return new Promise((resolve, reject) => {
    User.findAll({ where: { username: username } })
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

export function getUsername(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { username: username } })
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
