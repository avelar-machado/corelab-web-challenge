import { useState } from 'react';
import type { Task } from '../types/task';
import '../styles/TaskCard.scss';
import api from '../services/api';
import { useTasks } from '../store/useTasks';
import { ColorPicker } from './ColorPicker';
import { MdStarBorder, MdDelete, MdEdit, MdColorLens, MdCheck } from 'react-icons/md';

export const TaskCard = ({ _id, title, description, color, isFavorite }: Task) => {
  const { fetchTasks } = useTasks();
  const [showColors, setShowColors] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  // Alterna favorito e atualiza tarefas
  const toggleFavorite = async () => {
    try {
      await api.patch(`/tasks/${_id}/fav`);
      fetchTasks();
    } catch (error: unknown) {
      console.error('Erro ao favoritar:', error);
      alert('Erro ao favoritar tarefa.');
    }
  };

  // Deleta tarefa e atualiza tarefas
  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${_id}`);
      fetchTasks();
    } catch (error: unknown) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar tarefa.');
    }
  };

  // Muda cor da tarefa e atualiza
  const changeColor = async (newColor: string) => {
    try {
      await api.patch(`/tasks/${_id}/color`, { color: newColor });
      setShowColors(false);
      fetchTasks();
    } catch (error: unknown) {
      console.error('Erro ao mudar cor:', error);
      alert('Erro ao mudar cor!');
    }
  };

  // Salva edição da tarefa
  const saveEdit = async () => {
    try {
      await api.patch(`/tasks/${_id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      setIsEditing(false);
      fetchTasks();
    } catch (error: unknown) {
      console.error('Erro ao editar:', error);
      alert('Erro ao editar tarefa!');
    }
  };

  return (
    <div className="task-card" style={{ backgroundColor: color || '#fff' }}>
      <div className="task-card__header">
        {isEditing ? (
          <input
            className="task-title-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <strong className="task-title">{editedTitle || 'Título'}</strong>
        )}
        <button className="icon" onClick={toggleFavorite}>
          {isFavorite ? '⭐' : <MdStarBorder />}
        </button>
      </div>

      <hr className="divider" />

      {isEditing ? (
        <textarea
          className="task-description-input"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      ) : (
        <p className="task-description">
          {editedDescription || 'Clique ou arraste o arquivo para esta área para fazer upload'}
        </p>
      )}

      <div className="task-card__actions">
        <div className="left-icons">
          {isEditing ? (
            <button className="icon save" onClick={saveEdit}>
              <MdCheck />
            </button>
          ) : (
            <button className="icon" onClick={() => setIsEditing(true)}>
              <MdEdit />
            </button>
          )}
          <button className="icon" onClick={() => setShowColors((s) => !s)}>
            <MdColorLens />
          </button>
        </div>

        <div className="right-icon">
          <button className="icon" onClick={deleteTask}>
            <MdDelete />
          </button>
        </div>
      </div>

      {showColors && (
        <div className="color-picker-container">
          <ColorPicker onSelect={changeColor} />
        </div>
      )}
    </div>
  );
};
