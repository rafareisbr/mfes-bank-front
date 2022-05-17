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
          <div>Numero: {agencia.numero}</div>
          <div>Contas criadas: {agencia.contas_registradas}</div>

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
        <div>Carregando...</div>
      ) : (
        <div>{JSON.stringify(errors)}</div>
      )}
      <Link to={`/bancos/${params.bancoId}/`}>Voltar</Link>
    </div>
  );
}

export default Detalhes;
