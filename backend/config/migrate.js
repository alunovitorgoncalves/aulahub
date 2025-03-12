const pool = require("./db");

const criarTabelaUsuarios = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ Tabela 'usuarios' criada com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao criar a tabela 'usuarios':", err);
  } finally {
    pool.end();
  }
};

// Executa a migração
criarTabelaUsuarios();
