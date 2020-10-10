const request = require("supertest");
const server = require('./server');
const db = require("../database/dbConfig");
const testUser = {
    username: "Jackie Chan",
    password: "jackie123"
}

describe("it should test the register and login routes", () =>{
    describe("It should register a new user", () => {
        it("should give a status 400 if unsuccessful", async () => {
            await db('users').truncate();

            const testUser = { user: "heyyo", pass: "wut"}

            const res = await request(server).post('/api/auth/register')
                .send(testUser)

            expect(res.status).toBe(400);
        })

        it("should add a user", async () => {
            await db('users').truncate();

            

            const res = await request(server).post('/api/auth/register')
                .send(testUser)

            expect(res.status).toBe(201)
        })
    })

    describe("It should login successfully", () => {
        it("should fail if password incorrect", async() => {

            const res = await request(server).post('/api/auth/login')
                .send(testUser)

            expect(res.status).toBe(401)
        })

        it("should login with successful credentials", async () => {
            const testUser = {
                username: "Jackie Chan",
                password: "jackie123"
            };
            
            const res = await request(server).post('/api/auth/login')
                .send(testUser)

            expect(res.status).toBe(200)
            
        })
    })
})