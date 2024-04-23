import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Header } from "../components/landing/Header";
import { Navbar } from "../components/shared/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { CustomerReview } from "../components/landing/CustomerReview";
import { Footer } from "../components/shared/Footer";

const LandingPage = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return (
    <div>
      <Header>
        <Navbar />
        <Hero />
      </Header>
      <Features />
      <CustomerReview />
      <Footer />
    </div>
  );
};

export default LandingPage;
