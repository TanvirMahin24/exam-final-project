import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ExamDetailsPage = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return <></>;
  // return (
  //   <div>
  //     <div className="bg-white">
  //       <Navbar />
  //     </div>
  //     <Container style={{ minHeight: `70vh` }}>
  //       <ExamDetails exam={null} />
  //     </Container>
  //     <AnimatedBg />
  //     <Footer />
  //   </div>
  // );
};

export default ExamDetailsPage;
