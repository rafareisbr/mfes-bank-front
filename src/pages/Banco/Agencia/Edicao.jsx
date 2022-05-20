import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "config/axios";

const validationSchema = yup.object({
  numero: yup
    .string("Enter the bank number")
    .required("Bank number is required"),
});

export default function AgenciaEdicao() {
  const params = useParams();
  const navigate = useNavigate();
  const [agencia, setAgencia] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function loadBankData() {
      try {
        const response = await axios.get(
          `/bancos/${params.bancoId}/agencias/${params.agenciaId}/`
        );
        setAgencia(response.data);
      } catch (errors) {
        setErrors(errors);
      }
    }
    loadBankData();
  }, [params.bancoId, params.agenciaId]);

  return (
    <div>
      <h3>Edição</h3>
      <Link to={`/bancos/${params.bancoId}/agencias/${params.agenciaId}/`}>
        Voltar
      </Link>
      {agencia ? (
        <Formik
          initialValues={{
            numero: agencia.numero,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            async function putBankData() {
              try {
                const response = await axios.put(
                  `/bancos/${params.bancoId}/agencias/${params.agenciaId}/`,
                  values
                );
                navigate(`/bancos/${params.bancoId}/`);
              } catch (errors) {
                setErrors(errors);
              }
            }

            putBankData();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="numero" placeholder="Numero" type="text" />
              {errors.numero && touched.numero ? (
                <div>{errors.numero}</div>
              ) : null}
              <button type="submit">Alterar</button>
            </Form>
          )}
        </Formik>
      ) : !errors ? (
        <div>Carregando...</div>
      ) : (
        <div>{JSON.stringify(errors)}</div>
      )}
    </div>
  );
}
