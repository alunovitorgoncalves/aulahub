import React from "react";

function Aulas() {
  return (
    <>
      {/* Aulas Abertas */}
      <h2 style={{ marginTop: "20px" }}>Aulas Abertas</h2>
      <p>Descrição do estilo de aula que se encontra aqui e blablabla</p>
      <div className="banner">BANNER_2.PNG</div>
      <button className="form-button">Acessar Aulas Abertas</button>

      {/* Aulas do Aluno */}
      <h2 style={{ marginTop: "40px" }}>Aulas do Aluno</h2>
      <p>Descrição do estilo de aula que se encontra aqui e blablabla</p>
      <div className="banner">BANNER_3.PNG</div>
      <button className="form-button">Acessar Aulas do Aluno</button>
    </>
  );
}

export default Aulas;
