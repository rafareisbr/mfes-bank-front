import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      <h2>Ops. Rota desconhecida.</h2>
      <p>
        Clique aqui para voltar ao <Link to="/">inicio</Link>
      </p>
    </div>
  );
}
