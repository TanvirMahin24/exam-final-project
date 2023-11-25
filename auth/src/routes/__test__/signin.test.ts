import request from "supertest";
import { app } from "../../app";

it("fails when email does not exists", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("existing user gives incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  return request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "pass" })
    .expect(400);
});
it("correct user signin and cookie is set", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  const res = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
