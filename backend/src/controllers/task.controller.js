import Task from "../models/task.model.js";

// Buscar todas as tarefas de um usuário
export const getAllTasks = async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Verifica se o e-mail do usuário foi fornecido
    if (!userEmail) {
      return res.status(400).json({ message: 'E-mail do usuário não fornecido.' });
    }

    // Busca tarefas do usuário ordenadas por favoritas e data de criação
    const tasks = await Task.find({ userEmail }).sort({ isFavorite: -1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar as tarefas.' });
  }
};

// Criar uma nova tarefa
export const createTask = async (req, res) => {
  const task = new Task(req.body);      // Cria instância com os dados do body
  await task.save();                    // Salva no banco de dados
  res.status(201).json(task);           // Retorna a tarefa criada com status 201
};

// Atualizar título e descrição da tarefa
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Atualiza e retorna a nova versão da tarefa
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    // Se não encontrar, retorna erro 404
    if (!updatedTask) {
      return res.status(404).json({ message: "Task não encontrada" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar task", error });
  }
};

// Excluir uma tarefa pelo ID
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send(); // 204 = No Content (remoção sem conteúdo de retorno)
};

// Alternar o status de favorito da tarefa
export const toggleFavorite = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.isFavorite = !task.isFavorite; // Inverte o valor atual
  await task.save();                  // Salva a alteração
  res.json(task);                     // Retorna a tarefa atualizada
};

// Atualizar apenas a cor da tarefa
export const updateColor = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { color: req.body.color },
    { new: true }
  );
  res.json(task); // Retorna a tarefa com a nova cor
};