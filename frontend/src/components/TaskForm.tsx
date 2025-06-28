import { useState } from 'react';
import '../styles/TaskForm.scss';
import { FaStar, FaRegStar } from 'react-icons/fa';
import api from '../services/api';
import { useTasks } from '../store/useTasks';

export const TaskForm = () => {
  const { fetchTasks } = useTasks();

  // Estados locais para os campos do formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // Verifica se o formulário é válido (evita envio vazio)
  const isFormValid = title.trim() !== '' && description.trim() !== '';

  // Função chamada ao submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const userEmail = localStorage.getItem('userEmail');

    try {
      // Envia a nova tarefa para a API
      await api.post('/tasks', {
        title,
        description,
        isFavorite,
        userEmail,
        color: '#ffffff',
      });

      // Limpa os campos após o envio
      setTitle('');
      setDescription('');
      setIsFavorite(false);

      // Atualiza a lista de tarefas
      fetchTasks();
    } catch (error) {
      console.error('Erro ao criar tarefa2:', error);
      alert('Erro ao criar a tarefa. Tente novamente.');
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="top-row">
          <input
            type="text"
            className="title"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="button" className="icon star" onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? <FaStar color="#f4b400" /> : <FaRegStar color="#888" />}
          </button>
        </div>

        <hr className="divider" />

        <textarea
          placeholder="Criar nota..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="submit" disabled={!isFormValid}>
          Criar
        </button>
      </form>
    </div>
  );
};
