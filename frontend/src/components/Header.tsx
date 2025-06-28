import '../styles/Header.scss';
import { FaSearch } from 'react-icons/fa';
import { useTasks } from '../store/useTasks';
import type { HeaderProps } from '../types/headerProps.ts';

export const Header = ({ onLogout }: HeaderProps) => {
  const { searchTerm, setSearchTerm } = useTasks(); // Estado global para filtro de busca

  return (
    <header className="header">
      {/* Logo da aplicação */}
      <div className="logo">
        <img src="./logo.png" alt="Logo" />
        <span>CoreNotes</span>
      </div>

      {/* Campo de busca */}
      <div className="search-container">
        <input
          type="text"
          className="search-notes"
          placeholder="Pesquisar notas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
        />
        <FaSearch className="search-icon" />
      </div>

      {/* Botão para logout/reinício de sessão */}
      <button className="icon close-btn" onClick={onLogout}>
        ✕
      </button>
    </header>
  );
};
