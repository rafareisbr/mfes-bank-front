import { useParams } from "react-router-dom";

function Detalhes() {
  const params = useParams();

  return (
    <div>
      Detalhes da agencia {params.bancoId} e {params.agenciaId}
    </div>
  );
}

export default Detalhes;
