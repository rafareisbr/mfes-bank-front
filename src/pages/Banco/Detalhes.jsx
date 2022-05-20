import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios";

import AgenciasListagem from "../Agencia/Listagem";

export default function Listagem() {
  const params = useParams();
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
      <h3>Detalhes</h3>
      {banco ? (
        <div>
          {Object.entries(banco).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}

          <br />

          <div>
            <AgenciasListagem />
          </div>

          <br />
        </div>
      ) : !errors ? (
        <div>Carregando...</div>
      ) : (
        <div>{JSON.stringify(errors)}</div>
      )}
      <Link to={`/bancos/${params.bancoId}/editar`}>Alterar</Link>
      <Link to="/bancos/">Voltar</Link>
    </div>
  );
}
