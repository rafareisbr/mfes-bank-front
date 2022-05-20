import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios";

import ContasListagem from "../Contas/Listagem";

function Detalhes() {
  const params = useParams();
  const [agencia, setAgencia] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(
          `/bancos/${params.bancoId}/agencias/${params.agenciaId}/`
        );
        setAgencia(response.data);
      } catch (errors) {
        console.log(errors);
      }
    }
    loadData();
  }, [agencia, params.bancoId, params.agenciaId]);

  return (
    <div>
      <h3>Detalhes da Agencia</h3>
      {agencia ? (
        <div>
          {Object.entries(agencia).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}

          <br />

          <div>
            <ContasListagem />
          </div>

          <br />

          <Link
            to={`/bancos/${params.bancoId}/agencias/${params.agenciaId}/editar`}
          >
            Alterar
          </Link>
        </div>
      ) : !errors ? (
        <div>Sem resultados</div>
      ) : (
        <div>{JSON.stringify(errors)}</div>
      )}
      <Link to={`/bancos/${params.bancoId}/`}>Voltar</Link>
    </div>
  );
}

export default Detalhes;
