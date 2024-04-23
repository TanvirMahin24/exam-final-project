import { AnswerType } from "../../../types/Exam";
import CreateQuestionItem from "./CreateQuestionItem";

interface Props {
  questions: AnswerType[];
  setQuestions: (quuestions: AnswerType[]) => void;
}

const CreateQuestions = ({ questions, setQuestions }: Props) => {
  return (
    <div>
      {questions.map((q, i) => (
        <CreateQuestionItem
          question={q}
          setQuestion={setQuestions}
          key={i}
          count={i + 1}
          questions={questions}
        />
      ))}
    </div>
  );
};

export default CreateQuestions;
