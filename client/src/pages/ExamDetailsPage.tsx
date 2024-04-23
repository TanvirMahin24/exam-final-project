import { useSelector } from "react-redux";
import ExamQuestionList from "../components/exam/ExamQuestionList/ExamQuestionList";
import { Header } from "../components/landing/Header";
import { Footer } from "../components/shared/Footer";
import { Navbar } from "../components/shared/Navbar";
import { examDemo } from "../dummyData/exam";
import { RootState } from "../redux/store";
import { Container } from "react-bootstrap";
import AnimatedBg from "../components/shared/AnimatedBg/AnimatedBg";
import ExamDetails from "../components/exam/ExamDetails/ExamDetails";

const ExamDetailsPage = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return (
    <div>
      <div className="bg-white">
        <Navbar />
      </div>
      <Container style={{ minHeight: `70vh` }}>
        <ExamDetails exam={examDemo} />
      </Container>
      <AnimatedBg />
      <Footer />
    </div>
  );
};

export default ExamDetailsPage;
