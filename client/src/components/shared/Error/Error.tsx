import { useNavigate } from "react-router-dom";
import errImg from "../../../assets/NotFound/404.svg";

const Error = () => {
  const navigate = useNavigate();
  const clickHandeler = () => {
    navigate(-1);
  };
  return (
    <div className="text-center py-5">
      <img src={errImg} alt="" className="w-50 " />
      <span className="d-block heading__4 py-3">Page Not Found</span>
      <button
        className="btn btn-lg btn-primary"
        onClick={() => clickHandeler()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Error;
