import { json } from "body-parser";
import express from "express";

import { errorHandler, NotFoundError } from "@inovit-bd/ms-common";
import "express-async-errors";
import { examRouter } from "./routes/exam";
var cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(json());

app.use(examRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
