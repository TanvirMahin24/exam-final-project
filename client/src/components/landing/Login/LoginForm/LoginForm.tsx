import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LoginType } from "../../../../types/Auth";
import { useState } from "react";
import { loginAction } from "../../../../actions/auth/login.action";
import Swal from "sweetalert2";
import { getAuthUserAction } from "../../../../actions/auth/getAuthUser";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/slices/authSlice";

const LoginForm = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onSubmitHandeler = async (values: LoginType) => {
    setSubmitting(true);
    let check = await loginAction(values);
    if (check !== false) {
      Swal.fire({ title: "Login success", icon: "success" });
      setTimeout(async () => {
        let data = await getAuthUserAction();
        dispatch(setUser(data));
        setSubmitting(false);
      }, 1000);
    } else {
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Please Provide Password"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
  });
  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmitHandeler}
    >
      {({ errors, touched }) => (
        <Form>
          <span className="d-block lead__1">Email</span>
          <Field
            name="email"
            type="email"
            className={`form-control ${
              errors.email && touched.email ? "error" : " "
            }`}
          />
          {errors.email && touched.email ? (
            <div className="text-danger">{errors.email}</div>
          ) : null}
          <span className="d-block lead__1 pt-4">Password</span>
          <Field
            name="password"
            type="password"
            className={`form-control ${
              errors.password && touched.password ? "error" : " "
            }`}
          />
          {errors.password && touched.password ? (
            <div className="text-danger">{errors.password}</div>
          ) : null}

          <button
            disabled={submitting}
            className="btn btn-primary mt-3"
            type="submit"
          >
            {submitting ? "Loading..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
