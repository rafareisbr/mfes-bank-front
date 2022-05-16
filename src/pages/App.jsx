import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import { Login } from "./Login";
import { NotFound } from "./NotFound";
import BancoListagem from "./Banco/Listagem";
import BancoDetalhes from "./Banco/Detalhes";
import AgenciaDetalhes from "./Agencia/Detalhes";

import Context from "../contexts/Context";
import { useState } from "react";
import AuthProvider from "../contexts/AuthProvider";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <Context.Provider value={[counter, setCounter]}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/** bancos */}
            <Route path="/bancos" element={<BancoListagem />} />
            <Route path="/bancos/:bancoId" element={<BancoDetalhes />} />
            <Route
              path="/bancos/:bancoId/agencias/:agenciaId"
              element={<AgenciaDetalhes />}
            />
            <Route
              path="/bancos/novo"
              element={
                <ProtectedRoute>
                  <BancoDetalhes />
                </ProtectedRoute>
              }
            />
            {/** end bancos */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Context.Provider>
  );
}
