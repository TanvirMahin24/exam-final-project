import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  // check if ENV does not exists or not
  if (!process.env.JWT_KEY) {
    throw Error("JWT KEY is undefined!");
  }
  if (!process.env.MONGO_URI) {
    throw Error("MONGO_URI must be undefined!");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("[AUTH] NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("[AUTH] NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("[AUTH] NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // When NATS client closed
    natsWrapper.client.on("close", () => {
      console.log("[AUTH] NATS Client closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("[AUTH] MongoDB connected!");

    app.listen(5001, () => {
      console.log("[AUTH] Listening on 5001 ");
    });
  } catch (error) {
    console.error("[AUTH] DB connection Error!!!!!");
  }
};

start();
