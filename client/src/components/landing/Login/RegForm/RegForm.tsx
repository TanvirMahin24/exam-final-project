import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RegisterType } from "../../../../types/Auth";
import { useState } from "react";
import Swal from "sweetalert2";
import { registerAction } from "../../../../actions/auth/register.action";
import { useDispatch } from "react-redux";
import { getAuthUserAction } from "../../../../actions/auth/getAuthUser";
import { useNavigate } from "react-router-dom";

const RegForm = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const onSubmitHandeler = async (values: RegisterType) => {
    setSubmitting(true);
    let check = await registerAction(values);
    if (check !== false) {
      Swal.fire({ title: "Register success", icon: "success" });
      navigate("/login");

      setSubmitting(false);
    } else {
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Password is required!"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords do not match!"
    ),
    email: Yup.string().email("Invalid email").required("Email is required!"),
    name: Yup.string().required("Name is required!"),
    bio: Yup.string().required("Bio is required!"),
    institution: Yup.string().required("Institution is required!"),
  });
  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        bio: "",
        institution: "",
        confirmPassword: "",
        email: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => onSubmitHandeler(values)}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="d-flex align-items-center justify-content-between pt-2">
            <span className="d-block lead__1">Name</span>
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </div>

          <Field
            name="name"
            type="text"
            className={`form-control ${
              errors.name && touched.name ? "error" : " "
            }`}
          />
          <div className="d-flex align-items-center justify-content-between pt-2">
            <span className="d-block lead__1">Email</span>
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
          </div>
          <Field
            name="email"
            type="email"
            className={`form-control ${
              errors.email && touched.email ? "error" : " "
            }`}
          />
          <div className="d-flex align-items-center justify-content-between pt-2">
            <span className="d-block lead__1">Bio</span>
            {errors.bio && touched.bio ? (
              <div className="text-danger">{errors.bio}</div>
            ) : null}
          </div>
          <Field
            name="bio"
            type="text"
            className={`form-control ${
              errors.bio && touched.bio ? "error" : " "
            }`}
          />
          <div className="d-flex align-items-center justify-content-between pt-2">
            <span className="d-block lead__1">Institution</span>
            {errors.institution && touched.institution ? (
              <div className="text-danger">{errors.institution}</div>
            ) : null}
          </div>
          <Field
            name="institution"
            type="text"
            className={`form-control ${
              errors.institution && touched.institution ? "error" : " "
            }`}
          />

          <div className="d-flex align-items-center justify-content-between pt-2">
            <span className="d-block lead__1">Password</span>
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
          <div className="d-flex align-items-center justify-content-between pt-2">
            <span className="d-block lead__1">Retype Password</span>
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="text-danger">{errors.confirmPassword}</div>
            ) : null}
          </div>

          <Field
            name="confirmPassword"
            type="password"
            className={`form-control ${
              errors.confirmPassword && touched.confirmPassword ? "error" : " "
            }`}
          />

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

export default RegForm;
