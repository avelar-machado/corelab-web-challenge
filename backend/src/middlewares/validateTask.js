import Joi from "joi";

// Schema para CRIAR uma tarefa
const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "O campo título é obrigatório",
    "string.empty": "O campo título é obrigatório"
  }),                                                                  // Título é obrigatório
  description: Joi.string().allow("").required(),                      // Descrição obrigatória (pode estar vazia)
  color: Joi.string().optional(),                                      // Cor é opcional
  userEmail: Joi.string().email({ tlds: { allow: false } }).required(),// E-mail é obrigatório ao criar
  isFavorite: Joi.boolean().optional(),                                // Favorito é opcional
});

// Schema para EDITAR uma tarefa
const editTaskSchema = Joi.object({
  title: Joi.string().min(1).optional(),                               // Campos opcionais para edição
  description: Joi.string().allow("").optional(),
  color: Joi.string().optional(),
  userEmail: Joi.string().email({ tlds: { allow: false } }).optional(),
  isFavorite: Joi.boolean().optional(),
});

// Schema para atualizar apenas a cor
const colorOnlySchema = Joi.object({
  color: Joi.string().required(),                                      // Cor é obrigatória nesse caso
});

/**
 * Middleware de validação de tarefas.
 * Seleciona automaticamente o schema conforme a rota:
 * - POST (criação): usa createTaskSchema
 * - PATCH /:id/color: usa colorOnlySchema
 * - PATCH /:id: usa editTaskSchema
 */
const validateTask = (req, res, next) => {
  let schemaToUse;

  if (req.method === "POST") {
    schemaToUse = createTaskSchema;
  } else if (req.method === "PATCH" && req.path.endsWith("/color")) {
    schemaToUse = colorOnlySchema;
  } else if (req.method === "PATCH") {
    schemaToUse = editTaskSchema;
  } else {
    return next(); // Não valida outros métodos
  }

  const { error } = schemaToUse.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

export default validateTask;
