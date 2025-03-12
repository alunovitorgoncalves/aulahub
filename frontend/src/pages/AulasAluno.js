// frontend/src/pages/AulasAluno.js
import React from "react";

function AulasAluno() {
  // Cria um array de 5 itens para imagens 15..19
  const totalItems = 5; // 5 imagens
  const startImageNum = 15; // começa em 15

  const gridItems = Array.from({ length: totalItems }, (_, index) => {
    const imageNum = startImageNum + index; // 15,16,17,18,19
    return (
      <div
        key={imageNum}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #fff",
          padding: "5px",
        }}
      >
        <img
          src={`/images/${imageNum}.png`}
          alt={`Imagem ${imageNum}`}
          width="80"
          height="80"
        />
      </div>
    );
  });

  return (
    <div>
      <h2 style={{ marginTop: "20px" }}>Aulas do Aluno</h2>
      <p>Esta é a área exclusiva para alunos autenticados.</p>

      {/* Grid de 5 colunas x 1 linha */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridGap: "10px",
          marginTop: "20px",
        }}
      >
        {gridItems}
      </div>
    </div>
  );
}

export default AulasAluno;
