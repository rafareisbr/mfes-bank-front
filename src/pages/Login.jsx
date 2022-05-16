import * as yup from "yup";
import { Field, Form, Formik } from "formik";

import { http } from "../config/axios";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(2, "Password should be of minimum 2 characters length")
    .required("Password is required"),
});

export function Login() {
  const makeLogin = async ({ username, password }) => {
    const response = await http.post("/login/", { username, password });
    localStorage.setItem({ token: response });
  };

  return (
    <div>
      <h3>Login</h3>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
          makeLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="username" placeholder="Username" type="text" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
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
