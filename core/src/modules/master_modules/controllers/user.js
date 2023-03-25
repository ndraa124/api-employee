import {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../models/user_model";

import { _success, _error } from "../../../utils/status";

export async function getAllData(_req, res, _next) {
  await getAllUser()
    .then((result) => {
      if (result.length > 0) {
        _success({
          code: 200,
          response: res,
          message: "success to get data",
          data: result,
        });
      } else {
        _error({
          code: 404,
          response: res,
          message: "data is empty",
        });
      }
    })
    .catch((err) => {
      _error({
        code: 500,
        response: res,
        message: err,
      });
    });
}

export async function createData(req, res, _next) {
  await createUser(req.body)
    .then((result) => {
      if (result) {
        _success({
          code: 201,
          response: res,
          message: "success to create data",
          data: result,
        });
      } else {
        _error({
          code: 400,
          response: res,
          message: "fail to create data",
        });
      }
    })
    .catch((err) => {
      _error({
        code: 500,
        response: res,
        message: err,
      });
    });
}

export async function getData(req, res, _next) {
  const { id } = req.params;

  await getUser(id)
    .then((result) => {
      if (result) {
        _success({
          code: 200,
          response: res,
          message: "success to get data",
          data: result,
        });
      } else {
        _error({
          code: 404,
          response: res,
          message: "data not found",
        });
      }
    })
    .catch((err) => {
      _error({
        code: 500,
        response: res,
        message: err,
      });
    });
}

export async function updateData(req, res, _next) {
  const { id } = req.params;

  try {
    const checkData = await getUser(id);

    if (checkData) {
      await updateUser(id, req.body)
        .then((result) => {
          if (result) {
            _success({
              code: 200,
              response: res,
              message: "success to update data",
            });
          } else {
            _error({
              code: 400,
              response: res,
              message: "can't update data",
            });
          }
        })
        .catch((err) => {
          _error({
            code: 500,
            response: res,
            message: err,
          });
        });
    } else {
      _error({
        code: 404,
        response: res,
        message: "data not found",
      });
    }
  } catch (err) {
    _error({
      code: 500,
      response: res,
      message: err,
    });
  }
}

export async function deleteData(req, res, _next) {
  const { id } = req.params;

  try {
    const checkData = await getUser(id);

    if (checkData) {
      await deleteUser(id)
        .then((result) => {
          if (result) {
            _success({
              code: 200,
              response: res,
              message: "success to delete data",
            });
          } else {
            _error({
              code: 400,
              response: res,
              message: "can't delete data",
            });
          }
        })
        .catch((err) => {
          _error({
            code: 500,
            response: res,
            message: err,
          });
        });
    } else {
      _error({
        code: 404,
        response: res,
        message: "data not found",
      });
    }
  } catch (err) {
    _error({
      code: 500,
      response: res,
      message: err,
    });
  }
}
