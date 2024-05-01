import {
  IconAlarm,
  IconBuildingCommunity,
  IconCertificate,
  IconClock,
  IconDiscountCheck,
  IconMail,
  IconMessage2,
  IconSchool,
  IconSquareRoundedX,
  IconUser,
} from "@tabler/icons-react";
import { Col, Row } from "react-bootstrap";
import { ResultType } from "../../../types/Exam";
import { StatCard } from "../../shared/StatCard";
import ExamAnswerViewItem from "../ExamAnswerViewItem/ExamAnswerViewItem";
import Moment from "react-moment";

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
        <Col md={3} className="py-3">
          <StatCard
            title="Mark"
            count={`${result.gainedMark}/${result.totalMark}`}
            icon={<IconCertificate strokeWidth={1} size={48} />}
          />
        </Col>
        <Col md={3} className="py-3">
          <StatCard
            title="Duration"
            count={`${result.submissionDuration.toFixed(2)}/${
              result.duration
            } min`}
            icon={<IconAlarm size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={3} className="py-3">
          <StatCard
            title="Correct Answer"
            count={`${result.correct}`}
            icon={<IconDiscountCheck size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={3} className="py-3">
          <StatCard
            title="Wrong Answer"
            count={`${result.wrong}`}
            icon={<IconSquareRoundedX size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={4} className="py-3">
          <StatCard
            title="Student Name"
            // @ts-ignore
            count={`${result.userId?.name}`}
            icon={<IconUser size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={4} className="py-3">
          <StatCard
            title="Student Email"
            // @ts-ignore
            count={`${result.userId?.email}`}
            icon={<IconMail size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={4} className="py-3">
          <StatCard
            title="Institution"
            // @ts-ignore
            count={`${result.userId?.institution}`}
            icon={<IconBuildingCommunity size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={4} className="py-3">
          <StatCard
            title="Teacher Name"
            // @ts-ignore
            count={`${result?.examId?.user?.name}`}
            icon={<IconSchool size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={4} className="py-3">
          <StatCard
            title="Teacher Email"
            // @ts-ignore
            count={`${result?.examId?.user?.email}`}
            icon={<IconMessage2 size={48} strokeWidth={1} />}
          />
        </Col>
        <Col md={4} className="py-3">
          <StatCard
            title="Exam Time"
            // @ts-ignore
            count={
              result?.examId?.start ? (
                <Moment format="DD/MM/YYYY  hh:mm A">
                  {result?.examId?.start}
                </Moment>
              ) : (
                ""
              )
            }
            icon={<IconClock size={48} strokeWidth={1} />}
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
