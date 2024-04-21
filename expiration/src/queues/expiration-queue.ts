import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

interface Payload {
  examId: string;
}

const expirationQueue = new Queue<Payload>("exam:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job, done) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    id: job.data.examId,
  });
  done();
  return;
});

export { expirationQueue };
