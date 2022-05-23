import axios from "config/axios";
import { useFormik } from "formik";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
  valor: yup
    .number("Valor inválido")
    .required("Voce precisa escolher algum valor")
    .positive("Valor deve ser positivo"),
});

function Sacar() {
  const params = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      valor: 0.0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      async function sendData() {
        try {
          const { data } = await axios.post(
            `/bancos/${params.bancoId}/agencias/${params.agenciaId}/contas/${params.contaId}/sacar/`,
            values
          );
          navigate(`/bancos/${params.bancoId}/agencias/${params.agenciaId}/`);
        } catch (err) {
          console.error(err);
          formik.resetForm();
        }
      }
      sendData();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="number"
        name="valor"
        placeholder="Valor do Saque"
        value={formik.values.valor}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.touched.valor && formik.errors.valor ? (
        <div>{formik.errors.valor}</div>
      ) : null}
      <button type="submit">Sacar</button>
    </form>
  );
}

export default Sacar;
