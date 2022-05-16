import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function Home() {
  return (
    <div>
      <Link to="/bancos">Bancos</Link>
    </div>
  );
}

export default Home;
