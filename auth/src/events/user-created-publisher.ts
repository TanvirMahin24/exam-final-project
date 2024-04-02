import { Publisher } from "@inovit-bd/ms-common";

export class userCreatedPublisher extends Publisher<any> {
  subject = "user:created";
}
