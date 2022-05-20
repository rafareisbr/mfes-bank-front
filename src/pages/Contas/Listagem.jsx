import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios";

export default function ContasListagem() {
  const params = useParams();
  const [contas, setContas] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(
          `/bancos/${params.bancoId}/agencias/${params.agenciaId}/contas/`
        );
        setContas(response.data);
      } catch (errors) {
        setErrors(errors);
        console.log(errors);
      }
    }
    loadData();
  }, [params.agenciaId, params.bancoId]);

  return (
    <div>
      Listagem de Contas
      <table>
        <tbody>
          {!contas ? (
            <tr>
              <td>Carregando...</td>
            </tr>
          ) : contas.length > 0 ? (
            contas.map((conta) => (
              <tr key={conta.numero}>
                <td>{conta.numero}</td>
                <td>{conta?.titular.cpf}</td>
                <td>
                  <Link
                    to={`/bancos/${params.bancoId}/agencias/${params.agenciaId}/contas/${conta.numero}/`}
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Sem resultados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
