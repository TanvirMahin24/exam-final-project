import express from "express";
import { json } from "body-parser";

import "express-async-errors";
import { currentuserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler, NotFoundError } from "@inovit-bd/ms-common";
import { updateUserRouter } from "./routes/update-user";
var cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
// app.set("trust proxy", true);
app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== "test",
//   })
// );

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(updateUserRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
