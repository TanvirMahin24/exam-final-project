import { Listener } from "@inovit-bd/ms-common";
import { Message } from "node-nats-streaming";
import { Exam, User } from "../../models/exam";
import { queueGroupName } from "../queue-group-name";
interface Event {
  subject: any;
  data: any;
}
export class ResultPublishedListener extends Listener<Event> {
  subject: string = "result:published";
  queueGroupName = queueGroupName;

  async onMessage(data: any, msg: Message) {
    const { id } = data;

    // sort the Exam submissions calcualte result
    const exam = await Exam.findById(id);

    if (!exam) {
      throw new Error("Exam not found");
    }

    await exam.updateOne({
      status: "resulted",
    });

    // save the result
    await exam.save();

    // ack
    msg.ack();
  }
}
