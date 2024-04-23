import { Loader } from "@mantine/core";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCreatedExamsAction } from "../../../actions/exam/getCreatedExams";
import { setCreated } from "../../../redux/slices/examSlice";
import { RootState } from "../../../redux/store";
import ExamCard from "../../shared/ExamCard/ExamCard";

const CreatedExamCards = () => {
  const exams = useSelector((state: RootState) => state.exam.created);
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      const res = await getCreatedExamsAction();
      dispatch(setCreated(res));
      console.log(res);
    };
    func();
  }, []);
  if (exams === null) {
    return <Loader></Loader>;
  } else if (exams.length === 0) {
    return <h3 className="py-5 text-white text-center">No Exam Found</h3>;
  }
  return (
    <div className="pb-5">
      <div className="d-flex align-items-center pb-2">
        <h1 className="text-white me-3">Created Exams</h1>
      </div>
      <Row>
        {exams.map((exam) => (
          <Col key={exam.id} md={6} lg={3} className="pb-3">
            <ExamCard edit {...exam} />
          </Col>
        ))}

        {/* <Col
          md={12}
          className="d-flex justify-content-center align-items-center"
        >
          <Pagination current={current} total={5} onClick={() => {}} url="" />
        </Col> */}
      </Row>
    </div>
  );
};

export default CreatedExamCards;
