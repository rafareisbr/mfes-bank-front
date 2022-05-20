import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import NotFound from "./NotFound";

import Context from "../contexts/Context";
import AuthProvider from "../contexts/AuthProvider";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import BancoListagem from "./Banco/Listagem";
import BancoDetalhes from "./Banco/Detalhes";
import BancoEdicao from "./Banco/Edicao";
import BancoCriacao from "./Banco/Criacao";

import AgenciaCriacao from "./Agencia/Criacao";
import AgenciaDetalhes from "./Agencia/Detalhes";

import ContaDetalhes from "./Contas/Detalhes";
import AgenciaEdicao from "./Agencia/Edicao";

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <Context.Provider value={[counter, setCounter]}>
      <AuthProvider>
        <Routes>
          {/** bancos */}
          <Route path="/bancos/" element={<BancoListagem />} />
          <Route path="/bancos/:bancoId/" element={<BancoDetalhes />} />
          <Route
            path="/bancos/novo/"
            element={
              <ProtectedRoute>
                <BancoCriacao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bancos/:bancoId/editar/"
            element={
              <ProtectedRoute>
                <BancoEdicao />
              </ProtectedRoute>
            }
          />
          {/** end bancos */}
          {/** agencias */}
          <Route
            path="/bancos/:bancoId/agencias/novo/"
            element={
              <ProtectedRoute>
                <AgenciaCriacao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bancos/:bancoId/agencias/:agenciaId/editar/"
            element={
              <ProtectedRoute>
                <AgenciaEdicao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bancos/:bancoId/agencias/:agenciaId/"
            element={<AgenciaDetalhes />}
          />
          {/** end agencias */}
          {/** contas */}
          <Route
            path="/bancos/:bancoId/agencias/:agenciaId/contas/novo/"
            element={
              <ProtectedRoute>
                <AgenciaCriacao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bancos/:bancoId/agencias/:agenciaId/contas/:contaId/"
            element={<ContaDetalhes />}
          />
          {/** end contas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div id="portal"></div>
      </AuthProvider>
    </Context.Provider>
  );
}
