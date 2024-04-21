import { Listener } from "@inovit-bd/ms-common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queueGroupName";

export class ExamCreatedListener extends Listener<any> {
  subject = "exam:created";
  queueGroupName = queueGroupName;

  async onMessage(data: any, msg: Message) {
    const delay = new Date(data.end).getTime() - new Date().getTime();

    await expirationQueue.add(
      {
        examId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
