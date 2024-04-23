import { Loader } from "@mantine/core";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getResultsAction } from "../../../actions/exam/getResults";
import { setData, setResults } from "../../../redux/slices/examSlice";
import { RootState } from "../../../redux/store";
import ResultCard from "../../shared/ResultCard/ResultCard";
import { getDashboardAction } from "../../../actions/exam/getDashboard";

const ResultsCards = () => {
  const results = useSelector((state: RootState) => state.exam.results);
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      const res = await getDashboardAction();
      dispatch(setData(res));
    };

    func();
  }, []);
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

export default ResultsCards;
