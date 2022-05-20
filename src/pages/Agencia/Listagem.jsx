import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios";

export default function Listagem() {
  const params = useParams();
  const [agencias, setAgencias] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`/bancos/${params.bancoId}/agencias/`);
        setAgencias(response.data);
      } catch (errors) {
        console.log(errors);
      }
    }
    loadData();
  }, [agencias, params.bancoId]);

  return (
    <div>
      <Link to={`/bancos/${params.bancoId}/agencias/novo/`}>Nova agencia</Link>
      <h4>Listagem de Agencias</h4>
      <br />
      <table>
        <tbody>
          {!agencias ? (
            <tr>
              <td>Carregando...</td>
            </tr>
          ) : agencias.length > 0 ? (
            agencias.map((agencia) => (
              <tr key={agencia.numero}>
                <td>{agencia.numero}</td>
                <td>
                  <Link
                    to={`/bancos/${params.bancoId}/agencias/${agencia.numero}/`}
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
