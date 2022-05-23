import axios from "config/axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
  valor_a_transferir: yup
    .number("Valor inválido")
    .required("Voce precisa escolher algum valor")
    .positive("Valor deve ser positivo"),
  banco_numero_destino: yup.string().required("Voce precisa escolher um banco"),
  agencia_numero_destino: yup
    .string()
    .required("Voce precisa escolher uma agencia"),
  conta_numero_destino: yup
    .string()
    .required("Voce precisa escolher uma conta"),
});

function Transferir() {
  const navigate = useNavigate();
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      valor_a_transferir: 0.0,
      banco_numero_destino: "",
      agencia_numero_destino: "",
      conta_numero_destino: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      async function sendData() {
        try {
          const { data } = await axios.post(
            `/bancos/${params.bancoId}/agencias/${params.agenciaId}/contas/${params.contaId}/transferir/`,
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
        name="valor_a_transferir"
        placeholder="Valor a transferir"
        value={formik.values.valor_a_transferir}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.touched.valor_a_transferir && formik.errors.valor_a_transferir ? (
        <div>{formik.errors.valor_a_transferir}</div>
      ) : null}
      <input
        name="banco_numero_destino"
        placeholder="Numero do banco destinatário"
        value={formik.values.banco_numero_destino}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.touched.banco_numero_destino &&
      formik.errors.banco_numero_destino ? (
        <div>{formik.errors.banco_numero_destino}</div>
      ) : null}
      <input
        name="agencia_numero_destino"
        placeholder="Numero agencia do banco destinatário"
        value={formik.values.agencia_numero_destino}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.touched.agencia_numero_destino &&
      formik.errors.agencia_numero_destino ? (
        <div>{formik.errors.agencia_numero_destino}</div>
      ) : null}
      <input
        name="conta_numero_destino"
        placeholder="Numero da conta do banco destinatário"
        value={formik.values.conta_numero_destino}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.touched.conta_numero_destino &&
      formik.errors.conta_numero_destino ? (
        <div>{formik.errors.conta_numero_destino}</div>
      ) : null}
      <button type="submit">Transferir</button>
    </form>
  );
}

export default Transferir;
