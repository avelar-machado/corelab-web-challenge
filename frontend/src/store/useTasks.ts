import { create } from 'zustand';
import api from '../services/api';
import type { TaskStore } from '../types/taskStore';

// Criação da store com Zustand
export const useTasks = create<TaskStore>((set, get) => ({
  tasks: [],
  filter: 'all',
  searchTerm: '',

  // Atualiza o termo de pesquisa
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Busca todas as tarefas do usuário logado
  fetchTasks: async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const res = await api.get('/tasks', {
        params: { userEmail },
      });
      set({ tasks: res.data });
    } catch (error: unknown) {
      console.error('Erro ao buscar tarefas:', error);
    }
  },

  // Cria nova tarefa e atualiza lista
  createTask: async (task) => {
    try {
      await api.post('/tasks', task);
      await get().fetchTasks();
    } catch (error: unknown) {
      console.error('Erro ao criar tarefa:', error);
    }
  },

  // Atualiza uma tarefa existente
  updateTask: async (id, updates) => {
    try {
      await api.put(`/tasks/${id}`, updates);
      await get().fetchTasks();
    } catch (error: unknown) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  },

  // Exclui uma tarefa pelo ID
  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await get().fetchTasks();
    } catch (error: unknown) {
      console.error('Erro ao excluir tarefa:', error);
    }
  },

  // Alterna o status de favorito da tarefa
  toggleFavorite: async (id) => {
    try {
      const current = get().tasks.find((t) => t._id === id);
      if (current) {
        await get().updateTask(id, { isFavorite: !current.isFavorite });
      }
    } catch (error: unknown) {
      console.error('Erro ao alternar favorito:', error);
    }
  },

  // Atualiza o filtro (ex: "all", "favorites", etc.)
  setFilter: (filter) => set({ filter }),
}));
