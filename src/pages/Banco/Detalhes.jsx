import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios";

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
          <div>{banco.numero}</div>
          <div>{banco.nome}</div>
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
