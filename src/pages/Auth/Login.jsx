import * as yup from "yup";
import { Field, Form, Formik } from "formik";

import { useContext } from "react";
import { AuthContext } from "contexts/AuthProvider";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(2, "Password should be of minimum 2 characters length")
    .required("Password is required"),
});

export default function Login() {
  const { token, onLogin } = useContext(AuthContext);

  return (
    <div>
      <h3>Login</h3>
      <div>{JSON.stringify(token)}</div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="username" placeholder="Username" type="text" />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}
            <Field name="password" placeholder="Password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
