import { Link } from "react-router-dom";

export default function index() {
  return (
    <div>
      <h2>Ops. Rota desconhecida.</h2>
      <p>
        Clique aqui para voltar ao <Link to="/">inicio</Link>
      </p>
    </div>
  );
}
