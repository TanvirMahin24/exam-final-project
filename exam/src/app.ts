import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import "express-async-errors";
import { errorHandler, NotFoundError } from "@inovit-bd/ms-common";
import { examRouter } from "./routes/exam";
var cors = require("cors");

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(examRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
