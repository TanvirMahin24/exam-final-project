import request from "supertest";
import { app } from "../../app";

it("returns 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns 400 on invalid email or password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testcom",
      password: "password",
    })
    .expect(400);
});
it("returns 400 on no email or password provided", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "dsad@fas.com" })
    .expect(400);
  return request(app)
    .post("/api/users/signup")
    .send({ password: "asdas" })
    .expect(400);
});
it("returns 400 on duplicate email  provided", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});
it("sets cookie on successfull signup", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  expect(res.get("Set-Cookie")).toBeDefined();
});
