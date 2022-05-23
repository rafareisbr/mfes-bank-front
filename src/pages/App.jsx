import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import NotFound from "pages/NotFound";

import Context from "contexts/Context";
import AuthProvider from "contexts/AuthProvider";
import ProtectedRoute from "components/auth/ProtectedRoute";

import BancoListagem from "pages/Banco/Listagem";
import BancoDetalhes from "pages/Banco/Detalhes";
import BancoEdicao from "pages/Banco/Edicao";
import BancoCriacao from "pages/Banco/Criacao";

import AgenciaCriacao from "pages/Banco/Agencia/Criacao";
import AgenciaDetalhes from "pages/Banco/Agencia/Detalhes";

import ContaDetalhes from "pages/Banco/Contas/Detalhes";
import AgenciaEdicao from "pages/Banco/Agencia/Edicao";
import BancoIndex from "pages/Banco/Index";

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <Context.Provider value={[counter, setCounter]}>
      <AuthProvider>
        <Routes>
          <Route path="/bancos" element={<BancoIndex />}>
            {/** bancos */}
            <Route path="" element={<BancoListagem />} />
            <Route path=":bancoId/" element={<BancoDetalhes />} />
            <Route
              path="novo/"
              element={
                <ProtectedRoute>
                  <BancoCriacao />
                </ProtectedRoute>
              }
            />
            <Route
              path=":bancoId/editar/"
              element={
                <ProtectedRoute>
                  <BancoEdicao />
                </ProtectedRoute>
              }
            />
            {/** end bancos */}
            {/** agencias */}
            <Route
              path=":bancoId/agencias/novo/"
              element={
                <ProtectedRoute>
                  <AgenciaCriacao />
                </ProtectedRoute>
              }
            />
            <Route
              path=":bancoId/agencias/:agenciaId/editar/"
              element={
                <ProtectedRoute>
                  <AgenciaEdicao />
                </ProtectedRoute>
              }
            />
            <Route
              path=":bancoId/agencias/:agenciaId/"
              element={<AgenciaDetalhes />}
            />
            {/** end agencias */}
            {/** contas */}
            <Route
              path=":bancoId/agencias/:agenciaId/contas/novo/"
              element={
                <ProtectedRoute>
                  <AgenciaCriacao />
                </ProtectedRoute>
              }
            />
            <Route
              path=":bancoId/agencias/:agenciaId/contas/:contaId/"
              element={<ContaDetalhes />}
            />
            {/** end contas */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/bancos" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div id="portal"></div>
      </AuthProvider>
    </Context.Provider>
  );
}
