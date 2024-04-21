import mongoose from "mongoose";
import { app } from "./app";
import { ExamCreatedPublisher } from "./events/publishers/exam-created-publisher";
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import { ResultPublishedListener } from "./events/listeners/result-publish-listener";

const start = async () => {
  // check if ENV does not exists or not
  if (!process.env.JWT_KEY) {
    throw Error("JWT KEY is undefined!");
  }
  if (!process.env.MONGO_URI) {
    throw Error("MONGO_URI must be defined!");
  }

  try {
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error("[EXAM] NATS_CLIENT_ID must be defined");
    }
    if (!process.env.NATS_URL) {
      throw new Error("[EXAM] NATS_URL must be defined");
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error("[EXAM] NATS_CLUSTER_ID must be defined");
    }
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // When NATS client closed
    natsWrapper.client.on("close", () => {
      console.log("[EXAM] NATS Client closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // Event Listeners
    new UserCreatedListener(natsWrapper.client).listen();
    new ResultPublishedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("[EXAM] MongoDB connected!");

    app.listen(5001, () => {
      console.log("[EXAM] Listening on 5001 ");
    });
  } catch (error) {
    console.log(error);
    console.log("[EXAM] DB connection Error!!!!!");
  }
};

start();
