import { Col, Row } from "react-bootstrap";
import ExamCard from "../../shared/ExamCard/ExamCard";
import { examCardDemo, resultDemo } from "../../../dummyData/exam";
import { Button } from "@mantine/core";
import ResultCard from "../../shared/ResultCard/ResultCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardAction } from "../../../actions/exam/getDashboard";
import { setData } from "../../../redux/slices/examSlice";
import { RootState } from "../../../redux/store";

const DashboardExamCards = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const upcoming = useSelector((state: RootState) => state.exam.upcoming);
  const created = useSelector((state: RootState) => state.exam.created);
  const results = useSelector((state: RootState) => state.exam.results);
  useEffect(() => {
    const func = async () => {
      const res = await getDashboardAction();
      dispatch(setData(res));
    };

    func();
  }, []);
  return (
    <div className="pb-5">
      {upcoming && upcoming.length > 0 ? (
        <>
          <div className="d-flex align-items-center pb-2">
            <h1 className="text-white me-3"> Upcoming Exams</h1>
          </div>
          <Row>
            {upcoming.map((exam) => (
              <Col key={exam.id} md={6} lg={3} className="pb-3">
                <ExamCard edit={false} {...exam} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h2 className="text-center text-white">No Upcoming Exams</h2>
        </>
      )}
      {results && results.length > 0 ? (
        <>
          <div className="d-flex align-items-center pb-2 pt-5">
            <h1 className="text-white me-3">Results</h1>
            <Button
              variant="filled"
              color="pink"
              size="xs"
              onClick={() => naviagte("/results")}
            >
              View All
            </Button>
          </div>
          <Row>
            {results.map((result) => (
              <Col key={result.id} md={6} lg={3} className="pb-3">
                <ResultCard {...result} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h2 className="text-center text-white">No Results</h2>
        </>
      )}

      {created && created.length > 0 ? (
        <>
          <div className="d-flex align-items-center pb-2  pt-5">
            <h1 className="text-white me-3">My Exams</h1>
            <Button
              variant="filled"
              color="pink"
              size="xs"
              onClick={() => naviagte("/my-exams")}
            >
              View All
            </Button>
          </div>
          <Row>
            {created.map((exam) => (
              <Col key={exam.id} md={6} lg={3} className="pb-3">
                <ExamCard edit {...exam} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h2 className="text-center text-white">You don't have any exam</h2>
        </>
      )}
    </div>
  );
};

export default DashboardExamCards;
