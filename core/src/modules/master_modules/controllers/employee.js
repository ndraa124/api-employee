import {
  getAllEmployee,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../models/employee_model";

import { sendEmail } from "../models/email_model";
import { _success, _error } from "../../../utils/status";
import { _marriedStatus, _genderStatus } from "../../../utils/helper";

export async function getAllData(_req, res, _next) {
  await getAllEmployee()
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
  await createEmployee(req.body)
    .then((result) => {
      if (result) {
        sendNotification(req.body);

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

  await getEmployee(id)
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
    const checkData = await getEmployee(id);

    if (checkData) {
      await updateEmployee(id, req.body)
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
    const checkData = await getEmployee(id);

    if (checkData) {
      await deleteEmployee(id)
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

async function sendNotification(data) {
  await sendEmail(
    "indradavidpesik@gmail.com",
    "Employee Data",
    `Name : ${data.name} <br />
      Gender : ${_genderStatus(data.gender)} <br />
      Date Of Birth : ${data.place_of_birth}, ${data.date_of_birth} <br />
      status : ${_marriedStatus(data.status)} <br />
      address : ${data.address}`
  );
}
