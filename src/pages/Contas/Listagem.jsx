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
      <div></div>
      <table>
        {!contas ? (
          <div>Carregando...</div>
        ) : contas.length > 0 ? (
          contas.map((conta) => (
            <tr>
              <td>{conta.numero}</td>
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
          <div>Sem resultados</div>
        )}
      </table>
    </div>
  );
}
