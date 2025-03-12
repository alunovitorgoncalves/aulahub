// frontend/src/pages/Contato.js
import React, { useState } from "react";
import axios from "axios";

function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/contato", {
        nome,
        email,
        mensagem,
      });
      setResponseMsg(res.data.message || "Mensagem enviada com sucesso!");
      setNome("");
      setEmail("");
      setMensagem("");
    } catch (err) {
      setResponseMsg("Erro ao enviar mensagem");
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: "20px" }}>Contato</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <br /><br />
        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <label>Mensagem:</label>
        <textarea rows="5" value={mensagem} onChange={(e) => setMensagem(e.target.value)} required />
        <br /><br />
        <button type="submit">Enviar</button>
      </form>
      {responseMsg && <p style={{ marginTop: "1rem" }}>{responseMsg}</p>}
    </div>
  );
}

export default Contato;
