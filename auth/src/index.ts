import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // check if ENV does not exists or not
  if (!process.env.JWT_KEY) {
    throw Error("JWT KEY is undefined!");
  }
  if (!process.env.MONGO_URI) {
    throw Error("MONGO_URI must be undefined!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[AUTH] MongoDB connected!");

    app.listen(5001, () => {
      console.log("[AUTH] Listening on 5001 ");
    });
  } catch (error) {
    console.log("[AUTH] DB connection Error!!!!!");
  }
};

start();
