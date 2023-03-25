import request from "supertest";
import app from "../app";

const tEmployee = {
  id: 8,
  name: "Indra David Pesik",
  gender: "L",
  place_of_birth: "Jakarta",
  date_of_birth: "1995-07-22",
  status: "Belum Menikah",
  address: "Jakarta",
  created_at: "2023-03-06T07:40:29.000Z",
  updated_at: "2023-03-06T07:40:29.000Z",
};

const tEmpty = {
  success: false,
  message: "data not found",
};

const tError = {
  success: false,
  message: "internal server error",
};

describe("GET /employee", () => {
  it("should return all employee", async () => {
    await request(app)
      .get("/api/v1/employee")
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.data[0]).toEqual(tEmployee);
      });
  });

  it("should return internal server error", async () => {
    await request(app)
      .get("/api/v1/employees")
      .then((res) => {
        expect(res.status).toEqual(500);
        expect(res.body).toEqual(tError);
      });
  });
});

describe("GET /employee/{id}", () => {
  it("should return detail employee", async () => {
    await request(app)
      .get("/api/v1/employee/8")
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.data).toEqual(tEmployee);
      });
  });

  it("should return empty employee", async () => {
    await request(app)
      .get("/api/v1/employee/0")
      .then((res) => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual(tEmpty);
      });
  });

  it("should return internal server error", async () => {
    await request(app)
      .get("/api/v1/employees")
      .then((res) => {
        expect(res.status).toEqual(500);
        expect(res.body).toEqual(tError);
      });
  });
});
