import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleFavorite,
  updateColor,
} from "../controllers/task.controller.js";

// Middleware de validação com Joi
import validateTask from "../middlewares/validateTask.js";

// Middleware de autenticação (pode ser básico para verificar o e-mail)
import auth from "../middlewares/auth.js";

const router = express.Router();

// Aplica autenticação a todas as rotas abaixo
router.use(auth);

// GET /tasks — Buscar todas as tarefas do usuário (valida se o e-mail foi passado)
router.get("/", validateTask, getAllTasks);

// POST /tasks — Criar nova tarefa (valida o corpo completo com Joi)
router.post("/", validateTask, createTask);

// PATCH /tasks/:id — Editar título e descrição da tarefa
router.patch("/:id", validateTask, updateTask);

// DELETE /tasks/:id — Excluir uma tarefa
router.delete("/:id", validateTask, deleteTask);

// PATCH /tasks/:id/fav — Alternar favorito da tarefa
router.patch("/:id/fav", validateTask, toggleFavorite);

// PATCH /tasks/:id/color — Atualizar cor da tarefa
router.patch("/:id/color", validateTask, updateColor);

// Exporta o roteador para ser usado no app principal
export default router;
