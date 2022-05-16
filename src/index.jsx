import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import BancoListagem from "./pages/Banco/Listagem";
import BancoDetalhes from "./pages/Banco/Detalhes";
import AgenciaDetalhes from "./pages/Agencia/Detalhes";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import AuthContext from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/bancos" element={<BancoListagem />} />
        <Route path="/bancos/:bancoId" element={<BancoDetalhes />} />
        <Route
          path="/bancos/:bancoId/agencias/:agenciaId"
          element={<AgenciaDetalhes />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
