import React, { useEffect, useState } from "react";
import api from "../services/api";
import FormularioUsuario from "./FormularioUsuario"; // Importando o formulário

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = () => {
    api.get("/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <FormularioUsuario onUsuarioAdicionado={carregarUsuarios} />
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>Nome:</strong> {usuario.nome} <br />
            <strong>Email:</strong> {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;
