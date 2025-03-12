import React from "react";

function Home() {
  // Defina quantos itens deseja exibir (3 colunas x 5 linhas = 15 itens)
  const totalItems = 15;

  // Cria um array com 'totalItems' posições (1..15)
  const gridItems = Array.from({ length: totalItems }, (_, index) => {
    const imageNum = index + 1; // 1, 2, 3, ..., 15
    return (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #fff",
          padding: "5px",
        }}
      >
        {/* Carrega a imagem da pasta public/images/1.png, 2.png, etc. */}
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
      <p style={{ marginBottom: "1rem" }}>
        Bem-vindo(a) à Plataforma de Aulas Online
      </p>
      <p>Explore as nossas aulas e acesse conteúdos exclusivos.</p>

      {/* Grid de 3 colunas (repeat(3, 1fr)) e 5 linhas (total de 15 itens) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "10px",
          marginTop: "20px",
        }}
      >
        {gridItems}
      </div>
    </div>
  );
}

export default Home;
