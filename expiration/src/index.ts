import { ExamCreatedListener } from "./events/listeners/exam-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  // check if ENV does not exists
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("[EXPIRATION] NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("[EXPIRATION] NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("[EXPIRATION] NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // When NATS client closed
    natsWrapper.client.on("close", () => {
      console.log("[EXPIRATION] NATS Client closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // Listeners
    new ExamCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
  }
};

start();
