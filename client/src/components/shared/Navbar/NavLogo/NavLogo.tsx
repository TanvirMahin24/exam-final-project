import logo from "../../../../assets/Footer/logo.svg";

const NavLogo = () => {
  return (
    <div className="d-flex align-items-center text-dark">
      <img src={logo} alt="Code Generator" />{" "}
      <span className="d-block ms-2 fw-bold">Exam</span>
    </div>
  );
};

export default NavLogo;
