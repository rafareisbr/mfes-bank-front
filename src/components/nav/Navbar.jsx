import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthProvider";

function Navbar() {
  const { token, onLogout } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>Navbar</div>
      <>
        {token ? (
          <button onClick={() => onLogout()}>Sair</button>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </>
    </div>
  );
}

export default Navbar;
