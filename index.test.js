const request = require('supertest');
const server = require('./index.js');

describe("Jokes Directory", ()=>
{
    it("Denies bad tokens", async ()=>
    {
        let response = await request(server).get("/api/jokes");
        expect(response.status).toEqual(401);
        response = await request(server).get("/api/jokes").set({"Authorization":"222"});
        expect(response.status).toEqual(401);
    });

    it("Returns array on success", async ()=>
    {
        let response = await request(server).get("/api/jokes").set({"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODUzMjQ0NjYsImV4cCI6MTkwMDkwMDQ2Nn0.cksBQN9uX7CJZtuiXSx8_YUDVjGtqwbeW-vPXCLobqM"});
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("Authentication Directory", ()=>
{
    let User =
        {
            username:"testuser",
            password:"testpass"
        };
    
    it("Registers users", async ()=>
    {
        let response = await request(server).post("/api/auth/register").send(User);
        expect(response.status).toEqual(200);
    });

    it("Denies duplicate users", async ()=>
    {
        let response = await request(server).post("/api/auth/register").send(User);
        expect(response.status).toEqual(300);
    });

    let Token = "";

    it("Authenticates, returns token", async ()=>
    {
        let response = await request(server).post("/api/auth/login").send(User);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expect.objectContaining({token: expect.anything()}));
        Token = response.body.token;
    });

    it("Allows access with new token", async ()=>
    {
        response = await request(server).get("/api/jokes").set({"Authorization":Token});
        expect(response.status).toEqual(200);
    });
});