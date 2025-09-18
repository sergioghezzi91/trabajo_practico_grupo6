import React from 'react';
import './Layout.css';

/**
 * Componente de layout principal de la aplicación
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido a renderizar
 * @param {string} props.title - Título de la página
 * @returns {JSX.Element} - Componente de layout
 */
const Layout = ({ children, title = 'Sistema de Estudiantes' }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="container">
          <h1 className="layout-title">{title}</h1>

        </div>
      </header>
      
      <main className="layout-main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="layout-footer">
        <div className="container">
          <p>&copy; 2024 Sistema de Gestión de Estudiantes</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;