require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Endpoint: Usuários
app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    // Verifica se o usuário já existe
    const userExists = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Usuário já existe" });
    }
    // Gera hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);
    // Insere o usuário
    const newUser = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, hashedSenha]
    );
    res.json({ user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no cadastro" });
  }
});

// Endpoint: Login
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    // Busca o usuário
    const userResult = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }
    const user = userResult.rows[0];
    // Compara senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }
    // Cria token JWT (expira em 1h)
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no login" });
  }
});

// Middleware para verificar token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Acesso negado" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token inválido" });
  }
}

// Endpoint: Contato
app.post("/contato", async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;
    // Aqui você pode salvar a mensagem no banco ou enviar um email
    console.log(`Mensagem de ${nome} (${email}): ${mensagem}`);
    res.json({ message: "Mensagem recebida" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao enviar mensagem" });
  }
});

// Endpoint: Aulas Abertas (pública)
app.get("/aulas-abertas", (req, res) => {
  res.json({ aulas: ["Aula 1", "Aula 2", "Aula 3"] });
});

// Endpoint: Aulas do Aluno (protegido)
app.get("/aulas-aluno", verifyToken, (req, res) => {
  res.json({ aulas: ["Aula exclusiva 1", "Aula exclusiva 2"] });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
