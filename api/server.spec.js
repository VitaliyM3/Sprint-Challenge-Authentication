const request = require('supertest');
const server = require('./server.js');

describe("server.js", function() {
    describe("GET /", function() {

        it('should return 200 OK', function() {
            return request(server)
            .get("/")
            .then(response => {
                expect(response.status).toBe(200);
            });
        });

        it('should return JSON', function() {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
            });
        });

    });
});
