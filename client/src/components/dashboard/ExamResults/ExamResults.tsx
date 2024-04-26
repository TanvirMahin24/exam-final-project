import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setData, setResults } from "../../../redux/slices/examSlice";
import { RootState } from "../../../redux/store";
import ResultCard from "../../shared/ResultCard/ResultCard";
import { getDashboardAction } from "../../../actions/exam/getDashboard";
import { getExamResultsAction } from "../../../actions/exam/getExamResults";
import { ResultType } from "../../../types/Exam";
import { useParams } from "react-router-dom";

const ExamResults = () => {
  const [results, setResults] = useState<ResultType[] | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const func = async () => {
      if (id) {
        const res = await getExamResultsAction(id);
        setResults(res);
      }
    };

    func();
  }, [id]);

  if (results === null) {
    return <Loader></Loader>;
  } else if (results.length === 0) {
    return <h3 className="py-5 text-white text-center">No Results Found</h3>;
  }
  return (
    <div className="pb-5">
      <div className="d-flex align-items-center pb-2">
        <h1 className="text-white me-3">Results</h1>
      </div>
      <Row>
        {results.map((result) => (
          <Col md={6} lg={3} key={result.id} className="pb-3">
            <ResultCard {...result} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ExamResults;
