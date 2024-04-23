import { Button, Input, Modal } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { joinExamAction } from "../../../actions/exam/joinExam";
import { setJoinModal } from "../../../redux/slices/authSlice";
import { RootState } from "../../../redux/store";

const JoinExamCard = () => {
  const isOpen = useSelector((state: RootState) => state.auth.joinOpen);
  const dispatch = useDispatch();
  const [code, setCode] = useState<string>("");
  const onclick = async () => {
    if (!code || code.length < 7) {
      Swal.fire({ icon: "error", title: "Enter valid code" });
      return;
    }
    let check = await joinExamAction(code);
    if (check === true) {
      Swal.fire({ icon: "success", title: "Joined Exam" });
      dispatch(setJoinModal(false));
    }
  };
  return (
    <>
      <Modal
        centered
        opened={isOpen}
        onClose={() => dispatch(setJoinModal(false))}
        title="Join Exam"
      >
        <Input.Wrapper
          label="Exam Code"
          description="Enter your shared exam code"
          error={
            code !== "" && code.length <= 8 ? "Please enter a valid code" : null
          }
        >
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter exam code"
          />
        </Input.Wrapper>
        <div className="pt-3 text-center">
          <Button onClick={() => onclick()}>Join Exam</Button>
        </div>
      </Modal>
    </>
  );
};

export default JoinExamCard;
