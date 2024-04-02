import { Listener } from "@inovit-bd/ms-common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/exam";
import { queueGroupName } from "../queue-group-name";
interface Event {
  subject: any;
  data: any;
}
export class UserCreatedListener extends Listener<Event> {
  subject: string = "user:created";
  queueGroupName = queueGroupName;

  async onMessage(data: any, msg: Message) {
    const { id, name, email, bio, institution } = data;

    const ticket = await User.create({
      id,
      name,
      email,
      bio,
      institution,
    });
    await ticket.save();
    console.log(":::::::::::::::::::: DATA EXAM:::::::::::::::");
    console.log(ticket);
    console.log(":::::::::::::::::::: DATA END :::::::::::::::");

    msg.ack();
  }
}
