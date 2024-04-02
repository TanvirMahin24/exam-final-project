import { Publisher } from "@inovit-bd/ms-common";

export class ExamCreatedPublisher extends Publisher<any> {
  subject = "exam:created";
}
