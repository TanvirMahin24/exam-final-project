import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getExamDetailsAction } from "../actions/exam/getExamDetails";
import ExamQuestionList from "../components/exam/ExamQuestionList/ExamQuestionList";
import AnimatedBg from "../components/shared/AnimatedBg/AnimatedBg";
import { Footer } from "../components/shared/Footer";
import { Navbar } from "../components/shared/Navbar";
import { ExamType } from "../types/Exam";

const ExamPage = () => {
  const [exam, setExam] = useState<ExamType | null>(null);
  const { id } = useParams();

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
