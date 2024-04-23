import { Card } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import { AnswerType } from "../../../types/Exam";
import styles from "./ExamAnswerViewItem.module.css";
import { getCorrectOptionFromOptionsAndAns } from "../../../utils/getCorrectOptionFromOptionsAndAns";

interface Props {
  question: AnswerType;
}

const ExamAnswerViewItem = ({ question }: Props) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <h5>{question.question}</h5>

      <div>
        {question.options.map((option, i) => (
          <div
            className={`${styles.options} py-2 ${
              question.answer === option && option == question.selected
                ? styles.correct
                : question.selected === option
                ? styles.incorrect
                : styles.unattempt
            }`}
          >
            <div className={styles.op}>
              {" "}
              <span className="d-block mt-1">
                {i === 0 ? "A" : i === 1 ? "B" : i === 2 ? "C" : "D"}
              </span>
            </div>
            <div className="d-flex">
              <MDEditor.Markdown
                source={option}
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#fff",
                  color: "#000",
                }}
              />
            </div>
          </div>
        ))}
        {getCorrectOptionFromOptionsAndAns(
          question.options,
          question.answer
        ) !== "" ? (
          <span className="d-block fw-bold pt-2">
            Correct Option:{" "}
            {getCorrectOptionFromOptionsAndAns(
              question.options,
              question.answer
            )}
          </span>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default ExamAnswerViewItem;
