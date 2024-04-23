import { Card } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UserType } from "../../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateUserAction } from "../../../actions/auth/updateUser";
import { setUser } from "../../../redux/slices/authSlice";
import Swal from "sweetalert2";
import { getAuthUserAction } from "../../../actions/auth/getAuthUser";

const SettingsForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const onSubmitHandeler = async (values: Partial<UserType>) => {
    //LOGIN POST ACTION CALL
    const check = await updateUserAction({
      name: values.name,
      email: values.email,
      bio: values.bio,
      institution: values.institution,
    });
    if (check !== false) {
      let usr = await getAuthUserAction();
      if (usr !== false) {
        dispatch(setUser(usr));
      }
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
      });
    } else {
    }
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!"),
    name: Yup.string().required("Name is required!"),
    bio: Yup.string().required("Bio is required!"),
    institution: Yup.string().required("Institution is required!"),
  });

  const initialValues: Partial<UserType> = {
    name: user ? user.name : "",
    email: user ? user.email : "",
    bio: user ? user.bio : "",
    institution: user ? user.institution : "",
  };
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <h4>Basic Information</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched, values, setFieldValue, isSubmitting }) => (
          <Form>
            <span className="d-block lead__1">Name</span>
            <Field
              name="name"
              type="text"
              className={`form-control ${
                errors.name && touched.name ? "error" : " "
              }`}
            />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
            <span className="d-block lead__1 pt-4">Email</span>
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
            <span className="d-block lead__1 pt-4">Institution</span>
            <Field
              name="institution"
              type="text"
              className={`form-control ${
                errors.institution && touched.institution ? "error" : " "
              }`}
            />
            {errors.institution && touched.institution ? (
              <div className="text-danger">{errors.institution}</div>
            ) : null}
            <span className="d-block lead__1 pt-4">Bio</span>

            <textarea
              name="bio"
              value={values.bio}
              onChange={(e) => setFieldValue("bio", e.target.value)}
              id=""
              cols={10}
              rows={8}
              className={`form-control ${
                errors.bio && touched.bio ? "error" : " "
              }`}
            ></textarea>
            {errors.bio && touched.bio ? (
              <div className="text-danger">{errors.bio}</div>
            ) : null}

            <div className="text-center">
              <button
                disabled={isSubmitting}
                className="btn btn-primary mt-3"
                type="submit"
              >
                {isSubmitting ? "Loading..." : "Update Profile"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default SettingsForm;
