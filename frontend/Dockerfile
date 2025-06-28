# Imagem base leve e atualizada
FROM node:20

# Define o diretório de trabalho
WORKDIR /app

# Cria um usuário não-root
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências como root (necessário para instalar node_modules)
RUN npm install && npm cache clean --force

# Copia o restante do projeto
COPY . .

# Corrige as permissões para o diretório de trabalho e node_modules
RUN chown -R appuser:appgroup /app && chmod -R 755 /app

# Usa usuário não-root para segurança
USER appuser

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para iniciar com Vite no modo host (acessível via localhost)
CMD ["npm", "run", "dev", "--", "--host"]
