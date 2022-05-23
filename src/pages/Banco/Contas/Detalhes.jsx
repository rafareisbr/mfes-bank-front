import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "config/axios";
import Sacar from "components/conta/Sacar";
import Depositar from "components/conta/Depositar";
import Transferir from "components/conta/Transferir";

function Detalhes() {
  const params = useParams();
  const [conta, setConta] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(
          `/bancos/${params.bancoId}/agencias/${params.agenciaId}/contas/${params.contaId}/`
        );
        setConta(response.data);
      } catch (errors) {
        console.log(errors);
      }
    }
    loadData();
  }, [params.bancoId, params.agenciaId, params.contaId]);

  return (
    <div>
      <h3>Detalhes da Conta</h3>
      {conta ? (
        <div>
          {Object.entries(conta).map(([key, value]) => {
            return typeof value === "object" ? (
              Object.entries(conta).map(([key, value]) => {
                <div key={key}>
                  {key}: {value}
                </div>;
              })
            ) : (
              <div key={key}>
                {key}: {value}
              </div>
            );
          })}

          <br />

          <div>
            <h3>Operações</h3>
            <Sacar />
            <Depositar />
            <Transferir />
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
      <Link to={`/bancos/${params.bancoId}/agencias/${params.agenciaId}/`}>
        Voltar
      </Link>
    </div>
  );
}

export default Detalhes;
