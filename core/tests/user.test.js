import request from "supertest";
import app from "../app";

const tUser = {
  id: 1,
  username: "ndraa_david",
  password: "123456",
  created_at: "2023-03-25T13:51:58.000Z",
  updated_at: "2023-03-25T13:51:58.000Z",
};

const tEmpty = {
  success: false,
  message: "data not found",
};

const tError = {
  success: false,
  message: "internal server error",
};

describe("GET /user", () => {
  it("should return all users", async () => {
    await request(app)
      .get("/api/v1/user")
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.data.length).toBeGreaterThan(0);
      });
  });

  it("should return internal server error", async () => {
    await request(app)
      .get("/api/v1/users")
      .then((res) => {
        expect(res.status).toEqual(500);
        expect(res.body).toEqual(tError);
      });
  });
});

describe("GET /user/{id}", () => {
  it("should return detail user", async () => {
    await request(app)
      .get("/api/v1/user/1")
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.data).toEqual(tUser);
      });
  });

  it("should return empty user", async () => {
    await request(app)
      .get("/api/v1/user/0")
      .then((res) => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual(tEmpty);
      });
  });

  it("should return internal server error", async () => {
    await request(app)
      .get("/api/v1/users/1")
      .then((res) => {
        expect(res.status).toEqual(500);
        expect(res.body).toEqual(tError);
      });
  });
});
