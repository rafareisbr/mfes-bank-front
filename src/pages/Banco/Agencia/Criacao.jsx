import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "config/axios";

const validationSchema = yup.object({
  numero: yup
    .string("Enter the agency number")
    .required("agency number is required"),
});

export default function Criacao() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const params = useParams();

  return (
    <div>
      <h3>Criacao de Agencia</h3>
      <Link to={`/bancos/${params.bancoId}/`}>Voltar</Link>
      <br />
      <Formik
        initialValues={{
          numero: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          async function sendData() {
            try {
              const response = await axios.post(
                `/bancos/${params.bancoId}/agencias/`,
                values
              );
              navigate(`/bancos/${params.bancoId}/agencias/`);
            } catch (errors) {
              setErrors(errors);
            }
          }
          sendData();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="numero" placeholder="Numero" type="text" />
            {errors.numero && touched.numero ? (
              <div>{errors.numero}</div>
            ) : null}
            <button type="submit">Criar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
