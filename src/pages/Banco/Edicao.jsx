import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "config/axios";

const validationSchema = yup.object({
  nome: yup.string("Enter the bank name").required("Bank name is required"),
  numero: yup.string("Enter the bank number").required("Password is required"),
});

export default function BancoEdicao() {
  const params = useParams();
  const navigate = useNavigate();
  const [banco, setBanco] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function loadBankData() {
      try {
        const response = await axios.get(`/bancos/${params.bancoId}/`);
        setBanco(response.data);
      } catch (errors) {
        setErrors(errors);
      }
    }
    loadBankData();
  }, [params.bancoId]);

  return (
    <div>
      <h3>Edição</h3>
      <Link to={`/bancos/${params.bancoId}/`}>Voltar</Link>
      {banco ? (
        <Formik
          initialValues={{
            nome: banco.nome,
            numero: banco.numero,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            async function putBankData() {
              try {
                const response = await axios.put(
                  `/bancos/${params.bancoId}/`,
                  values
                );
                navigate(`/bancos/${params.bancoId}`);
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
              <Field name="nome" placeholder="Nome" type="text" />
              {errors.nome && touched.nome ? <div>{errors.nome}</div> : null}
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
