// frontend/src/components/Layout.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Layout = ({ children }) => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderBottom: "1px solid #fff" }}>
        <h1 className="site-title">AulaHub</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          {auth ? (
            <>
              <span style={{ marginRight: "10px" }}>Bem-vindo, {auth.user?.nome || auth.user?.name || "Usuário"}</span>
              <button onClick={logout} className="form-button">Logout</button>
            </>
          ) : (
            <span>Não logado</span>
          )}
        </div>
      </header>

      {/* Menu de Navegação */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        {/* Removido o link para Aulas Abertas */}
        <Link to="/aulas-aluno" className="nav-link">Aulas do Aluno</Link>
        <Link to="/contato" className="nav-link">Contato</Link>
        <Link to="/cadastrar" className="nav-link">Cadastrar</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>

      {/* Conteúdo Principal */}
      <main style={{ padding: "20px 0" }}>
        {children}
      </main>

      {/* Rodapé */}
      <footer style={{ marginTop: "40px", padding: "10px", borderTop: "2px solid #fff", textAlign: "center", fontSize: "0.9rem", opacity: 0.8 }}>
        © {new Date().getFullYear()} AulaHub - Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Layout;
