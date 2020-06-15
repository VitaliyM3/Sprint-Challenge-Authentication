const request = require("supertest");
const server = require("../api/server.js");

describe("POST / Register", () => {
    // it("should return a status of 201 if creating unique user", async () => {
    //   return request(server)
    //     .post("/api/auth/register")
    //     .send({
    //       username: "bob1", // this needs to change for a unique user 
    //       password: "12345",
    //     })
    //     .then((res) => {
    //       expect(res.status).toBe(201);
    //     });
    // });
  
    it("should return a problems with the db message", async () => {
      return request(server)
        .post("/api/auth/register")
        .catch((res) => {
          expect(res.body).toBe({ message: "problems with the db" });
        });
    });
  });
  
  describe("POST / Login", () => {
    it("should return a status of 401", async () => {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "bill",
          password: "1234",
        })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  
    it("should return a status of 200", async () => {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "bill",
          password: "12345",
        })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  
    it("should return a 'You shall not pass!' message", async () => {
      return request(server)
        .post("/api/auth/login")
        .catch((res) => {
          expect(res.body).toBe({ message: "You shall not pass" });
        });
    });
  });