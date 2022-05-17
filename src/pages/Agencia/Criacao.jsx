import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../../config/axios";

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
          nome: "",
          numero: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          async function postBankData() {
            try {
              const response = await axios.post(`/bancos/`, values);
              navigate(`/bancos/`);
            } catch (errors) {
              setErrors(errors);
            }
          }

          postBankData();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="numero" placeholder="Numero" type="text" />
            {errors.numero && touched.numero ? (
              <div>{errors.numero}</div>
            ) : null}
            <Field name="nome" placeholder="Nome" type="text" />
            {errors.nome && touched.nome ? <div>{errors.nome}</div> : null}
            <button type="submit">Criar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
