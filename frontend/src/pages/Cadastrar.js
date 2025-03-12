// frontend/src/pages/Cadastrar.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/usuarios", {
        nome,
        email,
        senha,
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Erro no cadastro");
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: "20px" }}>Cadastrar</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <br /><br />
        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <br /><br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastrar;
