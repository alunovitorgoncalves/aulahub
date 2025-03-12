// frontend/src/pages/Login.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/login", { email, senha });
      const { token, user } = res.data;
      login(token, user);
      navigate("/aulas-aluno");
    } catch (err) {
      setError(err.response?.data?.error || "Erro no login");
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: "20px" }}>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
