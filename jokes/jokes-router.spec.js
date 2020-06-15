const request = require("supertest");
const server = require("../api/server.js");

describe("GET /", () => {
  it("should return a status 500", () => {
    return request(server)
      .get("/api/jokes")
      .catch((res) => {
        expect(res.status).toBe(500);
      });
  });
  it("should return JSON type", async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
  })
});