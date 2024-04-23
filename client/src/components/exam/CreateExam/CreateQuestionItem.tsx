import { Button, Card, Input } from "@mantine/core";
import { AnswerType } from "../../../types/Exam";
import styles from "./CreateQuestion.module.css";
import { IconCheck, IconPlus } from "@tabler/icons-react";

interface Props {
  question: AnswerType;
  questions: AnswerType[];
  setQuestion: (questions: AnswerType[]) => void;
  count: number;
}

const CreateQuestionItem = ({
  question,
  setQuestion,
  questions,
  count,
}: Props) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder mt={4}>
      <div className="d-flex align-items-center justify-content-between">
        <h5>
          <b>{count}.</b> Question
        </h5>
        <Button
          color="red"
          size="xs"
          onClick={() =>
            setQuestion([...questions.filter((q) => q.id !== question.id)])
          }
        >
          Delete Question
        </Button>
      </div>
      <Input
        value={question.question}
        onChange={(e) =>
          setQuestion([
            ...questions.map((q) =>
              q.id === question.id ? { ...q, question: e.target.value } : q
            ),
          ])
        }
      />
      <h5 className="py-3">
        Options{" "}
        <Button
          size="compact-xs"
          leftSection={<IconPlus size={10} />}
          onClick={() =>
            setQuestion([
              ...questions.map((q) =>
                q.id === question.id
                  ? {
                      ...q,
                      options: [...question.options, ""],
                    }
                  : q
              ),
            ])
          }
        >
          Add Option
        </Button>
      </h5>
      <div>
        {question.options.map((option, i) => (
          <div className={styles.op}>
            <div className={question.answer === option ? styles.correct : ""}>
              <span className="d-block text-uppercase mt-1">
                {String.fromCharCode(97 + i)}
              </span>
              {question.answer === option ? <IconCheck /> : ""}
            </div>
            <div>
              <Input
                width={"100%"}
                value={option}
                onChange={(e) =>
                  setQuestion([
                    ...questions.map((q) =>
                      q.id === question.id
                        ? {
                            ...q,
                            options: [
                              ...question.options.map((op, j) =>
                                j === i ? e.target.value : op
                              ),
                            ],
                            answer:
                              question.answer === option
                                ? e.target.value
                                : q.answer,
                          }
                        : q
                    ),
                  ])
                }
              />
            </div>
            <div className="d-flex align-items-center">
              {question.options.length > 1 ? (
                <Button
                  size="compact-xs"
                  color="red"
                  onClick={() =>
                    setQuestion([
                      ...questions.map((q) =>
                        q.id === question.id
                          ? {
                              ...q,
                              options: [
                                ...question.options.filter((op, j) => j !== i),
                              ],
                            }
                          : q
                      ),
                    ])
                  }
                >
                  Delete
                </Button>
              ) : (
                <></>
              )}
              {question.answer !== option ? (
                <Button
                  size="compact-xs"
                  color="green"
                  ml={4}
                  onClick={() =>
                    setQuestion([
                      ...questions.map((q) =>
                        q.id === question.id
                          ? {
                              ...q,
                              answer: option,
                            }
                          : q
                      ),
                    ])
                  }
                >
                  Mark Correct
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CreateQuestionItem;
