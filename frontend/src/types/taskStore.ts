// store/types.ts

import type { Task } from './task';

export interface TaskStore {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (task: Task) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  setFilter: (filter: string) => void;
  filter: string;

  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
