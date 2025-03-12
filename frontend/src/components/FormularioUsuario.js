import React, { useState } from "react";
import api from "../services/api";

function FormularioUsuario({ onUsuarioAdicionado }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/usuarios", { nome, email, senha });
      alert("Usuário cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
      onUsuarioAdicionado(response.data); // Atualiza a lista de usuários
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Cadastrar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default FormularioUsuario;
