import { Card } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import styles from "./ExamQuestionViewItem.module.css";
import { AnswerType } from "../../../types/Exam";

interface Props {
  edit?: boolean;
  view?: boolean;
  options: string[];
  setAnswers: (answer: AnswerType[]) => void;
  answers: AnswerType[];
  question: string;
  answer: string;
  id: string;
}

const ExamQuestionViewItem = ({
  id,
  options,
  answers,
  setAnswers,
  question,
  answer,
}: Props) => {
  const setSelectedAnswer = (option: string) => {
    if (answers.filter((answer) => answer.id === id).length > 0) {
      setAnswers(
        answers.map((answer) => {
          if (answer.id === id) {
            return { ...answer, selected: option };
          } else {
            return answer;
          }
        })
      );
    } else {
      setAnswers([
        ...answers,
        { id, selected: option, question, options, answer },
      ]);
    }
  };

  const selectedAnswer = () => {
    if (answers.filter((answer) => answer.id === id).length > 0) {
      return answers.filter((answer) => answer.id === id)[0].selected;
    }
    return null;
  };
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <h5>{question}</h5>

      <div>
        {options.map((option, i) => (
          <div
            className={`${styles.options} py-2 ${
              selectedAnswer() === option ? styles.selected : ""
            }`}
            onClick={() => setSelectedAnswer(option)}
          >
            <div className={styles.op}>
              {" "}
              <span className="d-block text-uppercase mt-1">
                {String.fromCharCode(97 + i)}
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
      </div>
    </Card>
  );
};

export default ExamQuestionViewItem;
