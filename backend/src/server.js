import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.js";

// Conectar ao banco e iniciar o servidor
connectDB().then(() => {
  app.listen(config.port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${config.port}`);
  });
});
