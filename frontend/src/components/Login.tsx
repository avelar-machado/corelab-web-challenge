import { useState } from 'react';
import '../styles/Login.scss';
import type { LoginProps } from '../types/loginProps';

export const Login = ({ onLogin }: LoginProps) => {
  // Estado para controlar a visibilidade do modal
  const [isOpen, setIsOpen] = useState(true);

  // Estado do campo de e-mail e mensagens de erro
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Valida o formato do e-mail com expressão regular
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Executado ao clicar no botão de login
  const handleSubmit = () => {
    // Se o e-mail for inválido, exibe erro e interrompe
    if (!validateEmail(email)) {
      setError('E-mail inválido');
      return;
    }

    // Salva o e-mail no armazenamento local
    localStorage.setItem('userEmail', email);

    // Fecha o modal
    setIsOpen(false);

    // Se a função onLogin existir, chama para, por exemplo, buscar tarefas do usuário
    if (onLogin) onLogin();
  };

  // Se o modal estiver fechado, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Informe seu e-mail</h2>

        {/* Campo de entrada de e-mail */}
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(''); // Limpa erro ao digitar
          }}
          className="modal-input"
        />

        {/* Exibe mensagem de erro, se houver */}
        {error && <p className="modal-error">{error}</p>}

        {/* Botão de login */}
        <button onClick={handleSubmit} className="modal-button">
          Entrar
        </button>
      </div>
    </div>
  );
};
