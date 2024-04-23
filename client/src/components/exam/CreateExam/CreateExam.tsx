import { Button, Card, Input, NumberInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { AnswerType, ExamType } from "../../../types/Exam";
import CreateQuestions from "./CreateQuestions";
import { createExamAction } from "../../../actions/exam/createExam";

interface Props {
  data?: ExamType;
  edit?: boolean;
}

const blankQuestion: AnswerType = {
  id: "0",
  question: "",
  options: [""],
  answer: "",
  selected: "",
};

const CreateExam = ({ edit, data }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<AnswerType[]>([]);
  const onSubmitHandeler = async (
    values: Partial<ExamType | { start: any }>
  ) => {
    setIsLoading(true);
    let check = !edit ? await createExamAction(values, questions) : true;
    if (check !== false) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/my-exams");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };
  let initVals: Partial<ExamType & { start: any }> = {
    title: edit === true && data ? data.title : "",
    description: edit === true && data ? data.description : "",
    duration: edit === true && data ? data.duration : 30,
    totalMark: edit === true && data ? data.totalMark : 0,
    totalQuestions: edit === true && data ? data.totalQuestions : 0,
    questionMark: edit === true && data ? data.questionMark : 1,
    start: edit === true && data ? new Date(data.start) : new Date(),
  };

  const SignupSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    duration: Yup.number()
      .min(1, "Valid exam duration required!")
      .required("Required!"),
    totalMark: Yup.string()
      .min(1, "Valid total mark required!")
      .required("Required!"),
    totalQuestions: Yup.string()
      .min(1, "Minimum 1 question required!")
      .required("Required!"),
    questionMark: Yup.string()
      .min(1, "Minimum 1 mark required!")
      .required("Required!"),
    start: Yup.date().required("Required!"),
  });
  return (
    <div>
      <Formik
        initialValues={initVals}
        validationSchema={SignupSchema}
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <>
            <Card shadow="sm" padding="md" radius="md" withBorder>
              <Form>
                <Input.Wrapper
                  label="Exam title"
                  error={touched.title && errors.title}
                >
                  <Input
                    placeholder="Enter the exam title"
                    value={values.title}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Exam description"
                  error={touched.description && errors.description}
                  mt={10}
                >
                  <Input
                    placeholder="Enter the exam description"
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                  />
                </Input.Wrapper>
                <Row>
                  <Col md={4} className="pt-3">
                    <NumberInput
                      label="Enter duration"
                      placeholder="Enter exam duration in minutes"
                      value={values.duration}
                      onChange={(e) => setFieldValue("duration", e)}
                      error={touched.duration && errors.duration}
                    />
                  </Col>
                  <Col md={4} className="pt-3">
                    <NumberInput
                      label="Enter each question mark"
                      placeholder="Enter mark of one question"
                      value={values.questionMark}
                      onChange={(e) =>
                        e ? setFieldValue("questionMark", e) : null
                      }
                      error={touched.questionMark && errors.questionMark}
                    />
                  </Col>
                  <Col md={4} className="pt-3">
                    <div className="">
                      <DateTimePicker
                        label="Start time"
                        placeholder="Enter start time of exam"
                        value={values.start}
                        dropdownType="modal"
                        onChange={(e) => setFieldValue("start", e)}
                      />
                    </div>
                  </Col>
                  <Col md={4} className="pt-3">
                    <NumberInput
                      label="Total Questions"
                      disabled
                      value={questions.length}
                    />
                  </Col>
                  <Col md={4} className="pt-3">
                    <NumberInput
                      label="Total Mark"
                      disabled
                      value={
                        values.questionMark
                          ? values.questionMark * questions.length
                          : 0
                      }
                    />
                  </Col>
                  <Col md={4} className="pt-3 d-flex align-items-end">
                    <Button
                      color="green"
                      size="lg"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Save Exam"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
            <h3 className="text-white pt-5">Exam Questions</h3>
            {questions.length === 0 ? (
              <div className="">
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <span className="d-block text-center text-danger fw-bold fs-4">
                    No Question Added
                  </span>
                </Card>
              </div>
            ) : (
              <CreateQuestions
                questions={questions}
                setQuestions={setQuestions}
              />
            )}
            <div className="text-center pt-3 pb-5">
              <Button
                leftSection={<IconPlus />}
                color="green"
                onClick={() =>
                  setQuestions([
                    ...questions,
                    { ...blankQuestion, id: uuidv4() },
                  ])
                }
              >
                Add Question
              </Button>
            </div>{" "}
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreateExam;
