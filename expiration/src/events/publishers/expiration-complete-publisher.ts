import { Publisher } from "@inovit-bd/ms-common";

export class ExpirationCompletePublisher extends Publisher<any> {
  subject = "result:published";
}
