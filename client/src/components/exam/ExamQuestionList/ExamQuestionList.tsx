import { Button } from "@mantine/core";
import { AnswerType, ExamType } from "../../../types/Exam";
import ExamQuestionViewItem from "../ExamQuestionViewItem/ExamQuestionViewItem";
import { useEffect, useState } from "react";
import { submitResultAction } from "../../../actions/exam/submitResult";
import { useNavigate } from "react-router-dom";
import ExamAnswerViewItem from "../ExamAnswerViewItem/ExamAnswerViewItem";
import Counter from "./Counter";
import styles from "./ExamQuestionList.module.css";
interface Props {
  exam: ExamType;
}

const ExamQuestionList = ({ exam }: Props) => {
  const [start, setStart] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (!start) {
      setStart(new Date().toISOString());
    }
  }, []);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const submitHandeler = async () => {
    let correct = 0;
    let wrong = 0;
    let gainedMark = 0;

    answers.forEach((answer) => {
      if (answer.answer === answer.selected) {
        gainedMark += exam.questionMark;
        correct++;
      } else {
        wrong++;
      }
    });
    const res = await submitResultAction(
      {
        start: start ? start : exam.start,
        end: new Date().toISOString(),
        duration: exam.duration,
        title: exam.title,
        totalQuestions: exam.totalQuestions,
        gainedMark,
        correct,
        wrong,
        examId: exam.id,
        totalMark: exam.totalMark,
        questions: answers,
      },
      exam.id
    );
    if (res !== false) {
      setShow(true);
    }
  };
  return (
    <div>
      <div className={styles.counter}>
        <Counter
          duration={
            (new Date(exam.end).getTime() - new Date().getTime()) / 1000
          }
          func={submitHandeler}
        />
      </div>
      <h3 className="text-center fw-bold text-white pt-4">{exam.title}</h3>
      <div className="py-4">
        {show
          ? exam.questions.map((question, i) => (
              <div key={i} className="pb-3">
                <ExamAnswerViewItem
                  question={{
                    ...question,
                    selected:
                      answers.filter((ans) => ans.id === question.id)[0]
                        ?.selected ?? null,
                  }}
                />
              </div>
            ))
          : exam.questions.map((question, i) => (
              <div key={i} className="pb-3">
                <ExamQuestionViewItem
                  view
                  {...question}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              </div>
            ))}

        <div className="text-center">
          {show ? (
            <Button onClick={() => navigate(-1)} color="pink" size="lg">
              Go Back
            </Button>
          ) : (
            <Button onClick={submitHandeler} color="pink" size="lg">
              Sumbit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionList;
