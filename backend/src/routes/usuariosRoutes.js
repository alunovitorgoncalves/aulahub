const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

// Criar um novo usuário
router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const novoUsuario = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );

    res.json(novoUsuario.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
});

// Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await pool.query("SELECT * FROM usuarios");
    res.json(usuarios.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
});

// Buscar um usuário por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

    if (usuario.rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});

// Atualizar um usuário por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuarioAtualizado = await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *",
      [nome, email, senha, id]
    );

    if (usuarioAtualizado.rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuarioAtualizado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
});

// Deletar um usuário por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioDeletado = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);

    if (usuarioDeletado.rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar usuário" });
  }
});

module.exports = router;
