import Login from "../components/landing/Login/Login";
import { Footer } from "../components/shared/Footer";
import { Navbar } from "../components/shared/Navbar";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
