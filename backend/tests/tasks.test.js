// tests/tasks.test.js
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";
import { connectDB } from "../src/config/connect.js";

let mongoServer;
const token = "Bearer corelab-secret";

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connectDB(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /tasks", () => {
  it("deve retornar 400 se o título estiver faltando", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", token)
      .send({ description: "Descrição sem título", userEmail: "a@b.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("O campo título é obrigatório");
  });
});

describe("GET /tasks", () => {
  it("deve retornar 400 se não enviar o userEmail", async () => {
    const res = await request(app)
      .get("/tasks")
      .set("Authorization", token);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("E-mail do usuário não fornecido.");
  });
  it("deve retornar 200 com o userEmail válido", async () => {
    const res = await request(app)
      .get("/tasks?userEmail=avelarmachado0@gmail.com")
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
