const { Pool } = require("pg");
require("dotenv").config();

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(() => console.log("✅ Conectado ao banco de dados PostgreSQL!"))
  .catch((err) => console.error("❌ Erro ao conectar ao banco de dados:", err));

module.exports = pool;
