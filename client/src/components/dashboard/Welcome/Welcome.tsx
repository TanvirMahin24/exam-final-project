import { Button, Card } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setJoinModal } from "../../../redux/slices/authSlice";
import styles from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="pb-4">
      <h1 className={`text-white display-2 fw-bold ${styles.grad_text}`}>
        Welcome,
      </h1>
      <h1 className="text-white display-6 pb-3">Tanvir Mahin</h1>
      <div className="d-flex align-items-center">
        <Button
          onClick={() => dispatch(setJoinModal(true))}
          size="lg"
          color="pink"
        >
          Join Exam
        </Button>
        <Button
          className={"ms-3"}
          onClick={() => navigate(`/create-exam`)}
          size="lg"
          color="orange"
        >
          Create Exam
        </Button>
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default Welcome;
