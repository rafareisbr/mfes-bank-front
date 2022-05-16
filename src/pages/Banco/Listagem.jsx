import { useEffect, useState } from "react";
import { http } from "../../config/axios";

export default function Listagem() {
  const title = "Bancos";

  const [bancos, setBancos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadBankData = async () => {
      setLoading(true);

      try {
        const response = await http.get("/bancos", {
          headers: {
            Authorization: "Token a386c1b8110bc9320535e362477bb9e874086af2",
          },
        });
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
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
