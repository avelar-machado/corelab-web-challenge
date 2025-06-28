export interface Task {
  _id?: string;
  title: string;
  description?: string;
  color?: string;
  isFavorite?: boolean;
  userEmail: string;
  createdAt?: string;
  updatedAt?: string;
}
