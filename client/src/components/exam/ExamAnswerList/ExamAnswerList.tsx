import {
  IconAlarm,
  IconCertificate,
  IconDiscountCheck,
  IconSquareRoundedX,
} from "@tabler/icons-react";
import { Col, Row } from "react-bootstrap";
import { ResultType } from "../../../types/Exam";
import { StatCard } from "../../shared/StatCard";
import ExamAnswerViewItem from "../ExamAnswerViewItem/ExamAnswerViewItem";

interface Props {
  result: ResultType;
}

const ExamAnswerList = ({ result }: Props) => {
  return (
    <div>
      <h3 className="text-center fw-bold text-white pt-4 pb-3">
        {result.title}
      </h3>
      <Row>
        <Col md={3}>
          <StatCard
            title="Mark"
            count={`${result.gainedMark}/${result.totalMark}`}
            icon={<IconCertificate strokeWidth={1} size={48} />}
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Duration"
            count={`${result.submissionDuration.toFixed(2)}/${
              result.duration
            } min`}
            icon={<IconAlarm size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Correct Answer"
            count={`${result.correct}`}
            icon={<IconDiscountCheck size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Wrong Answer"
            count={`${result.wrong}`}
            icon={<IconSquareRoundedX size={48} strokeWidth={1} />}
          />
        </Col>
      </Row>
      <div className="py-4">
        {result.questions.map((question, i) => (
          <div key={i} className="pb-3">
            <ExamAnswerViewItem question={question} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamAnswerList;
