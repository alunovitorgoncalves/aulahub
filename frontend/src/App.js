// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import Contato from "./pages/Contato";
import AulasAluno from "./pages/AulasAluno";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/contato" element={<Contato />} />
          <Route
            path="/aulas-aluno"
            element={
              <ProtectedRoute>
                <AulasAluno />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
