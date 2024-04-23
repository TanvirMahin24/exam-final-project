import { Col, Container, Row } from "react-bootstrap";
import ExamCard from "../../shared/ExamCard/ExamCard";
import { ExamType } from "../../../types/Exam";
import { serializeExamCardData } from "../../../utils/serializeExamCardData";
import { Button, Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface Props {
  exam: ExamType;
}

const ExamDetails = ({ exam }: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Container className="py-5">
        <Row>
          <Col md={8}>
            <Card shadow="sm" padding="md" radius="md" withBorder>
              <h3 className="pb-2">{exam.title}</h3>
              <div>
                <ol>
                  <li>
                    Please, make sure you have a stable internet connection.
                  </li>
                  <li>Submit the answer within the given time.</li>

                  <li>
                    Please do not close tab or browser while taking the exam. If
                    you close the exam you may lose all the answer selections.
                  </li>

                  <li>
                    The ending time for this exam is fixed so please try to join
                    the exam in the due time.
                  </li>
                </ol>
              </div>
              <div className="pt-2 pb-2 text-center">
                <Button onClick={() => navigate(`/exam/${exam.id}`)}>
                  Start Exam
                </Button>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <ExamCard disabled {...serializeExamCardData(exam)} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExamDetails;
