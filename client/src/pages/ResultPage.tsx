import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getResultDetailsAction } from "../actions/exam/getResultDetails";
import ExamAnswerList from "../components/exam/ExamAnswerList/ExamAnswerList";
import AnimatedBg from "../components/shared/AnimatedBg/AnimatedBg";
import { Footer } from "../components/shared/Footer";
import { Navbar } from "../components/shared/Navbar";
import { ResultType } from "../types/Exam";
import { Button } from "@mantine/core";

const ResultPage = () => {
  const [result, setResult] = useState<ResultType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const func = async () => {
      // @ts-ignore
      const res = await getResultDetailsAction(id);
      if (res !== false) {
        setResult(res);
        console.log(res);
      } else {
        Swal.fire({
          icon: "error",
          title: "Result Not Found",
          text: "Result Not Found",
        });
      }
    };
    if (id) {
      func();
    }
  }, [id]);
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-white">
        <Navbar exam />
      </div>
      <Container className="">
        {!result ? (
          <>
            <div className="py-5  d-flex justify-content-center align-items-center">
              <Spinner />
            </div>
          </>
        ) : (
          <ExamAnswerList result={result} />
        )}
        <div className="text-center">
          <Button onClick={() => navigate(-1)} size={"lg"}>
            Go Back
          </Button>
        </div>
      </Container>
      <div className="" style={{ height: "40vh" }}></div>
      <AnimatedBg />
      <Footer />
    </div>
  );
};

export default ResultPage;
