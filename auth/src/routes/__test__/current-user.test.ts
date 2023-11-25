import request from "supertest";
import { app } from "../../app";
import { getCurrentUserCookie } from "../../test/getCurrentUserCookie";

it("Get current logged in user", async () => {
  const cookie = await getCurrentUserCookie();
  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
