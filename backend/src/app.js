import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/tasks", taskRoutes);

// Middleware de erros
app.use(errorHandler);

export default app;
