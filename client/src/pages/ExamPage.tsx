import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getExamDetailsAction } from "../actions/exam/getExamDetails";
import ExamQuestionList from "../components/exam/ExamQuestionList/ExamQuestionList";
import AnimatedBg from "../components/shared/AnimatedBg/AnimatedBg";
import { Footer } from "../components/shared/Footer";
import { Navbar } from "../components/shared/Navbar";
import { ExamType } from "../types/Exam";
import { Button } from "@mantine/core";

const ExamPage = () => {
  const [exam, setExam] = useState<ExamType | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      // @ts-ignore
      const res = await getExamDetailsAction(id);
      if (res !== false) {
        setExam(res);
        console.log(res);
      } else {
        Swal.fire({
          icon: "error",
          title: "Exam Not Found",
          text: "Exam Not Found",
        });
      }
    };
    if (id) {
      func();
    }
  }, [id]);
  return (
    <div>
      <div className="bg-white">
        <Navbar exam />
      </div>
      <Container>
        {!exam ? (
          <>
            <div className="py-5 d-flex justify-content-center align-items-center">
              <Spinner />
            </div>
          </>
        ) : exam && new Date(exam.end).getTime() < new Date().getTime() ? (
          <>
            <div className="py-5 d-flex flex-column justify-content-center align-items-center">
              <h3>Exam has ended!</h3>
              <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
          </>
        ) : (
          <ExamQuestionList exam={exam} />
        )}
      </Container>
      <AnimatedBg />
      <Footer />
    </div>
  );
};

export default ExamPage;
