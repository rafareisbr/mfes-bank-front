import { Link, useParams } from "react-router-dom";

export default function Listagem() {
  const params = useParams();
  return (
    <div>
      Detalhes do Banco {params.bancoId}
      <Link to="/">Voltar</Link>
    </div>
  );
}
