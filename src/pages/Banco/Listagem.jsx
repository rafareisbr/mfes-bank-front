import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "config/axios";
import { AuthContext } from "contexts/AuthProvider";

export default function Listagem() {
  const title = "Bancos";

  const [bancos, setBancos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadBankData = async () => {
      setLoading(true);

      try {
        const response = await axios.get("/bancos");
        setBancos(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadBankData();
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <Link to="/bancos/novo">Novo</Link>
      <div>{token}</div>
      <table>
        <thead>
          <tr>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Carregando...</td>
            </tr>
          ) : error ? (
            <tr>
              <td>{error.message}</td>
            </tr>
          ) : (
            bancos.map((banco) => {
              return (
                <tr key={banco.numero}>
                  <td>{banco.numero}</td>
                  <td>{banco.nome}</td>
                  <td>
                    <Link to={`/bancos/${banco.numero}/`}>Detalhes</Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
