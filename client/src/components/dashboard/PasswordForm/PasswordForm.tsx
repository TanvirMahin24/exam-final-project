import { Card } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const PasswordForm = () => {
  const onSubmitHandeler = (values: any) => {
    //LOGIN POST ACTION CALL
    console.log(values);
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Password is required!"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords do not match!"
    ),
  });
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <h4>Update Password</h4>
      <Formik
        initialValues={{
          name: "",
          password: "",
          confirmPassword: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched }) => (
          <Form>
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
            <div className="d-flex justify-content-between align-items-center">
              <span className="d-block lead__1">Password</span>{" "}
              {errors.password && touched.password ? (
                <div className="text-danger">{errors.password}</div>
              ) : null}
            </div>
            <Field
              name="password"
              type="password"
              className={`form-control ${
                errors.password && touched.password ? "error" : " "
              }`}
            />

            <div className="d-flex justify-content-between align-items-center  pt-4">
              <span className="d-block lead__1">Retype Password</span>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="text-danger">{errors.confirmPassword}</div>
              ) : null}
            </div>
            <Field
              name="confirmPassword"
              type="password"
              className={`form-control ${
                errors.confirmPassword && touched.confirmPassword
                  ? "error"
                  : " "
              }`}
            />

            <div className="text-center">
              <button className="btn btn-primary mt-3" type="submit">
                Update Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default PasswordForm;
