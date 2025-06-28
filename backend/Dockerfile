# Versão mais específica e leve da imagem base
FROM node:18.20.8-slim

# Cria um diretório de trabalho com permissões seguras
WORKDIR /app

# Copia apenas arquivos de dependência para instalar mais rápido e com cache
COPY package*.json ./

# Executa como usuário não-root para segurança
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup && \
    npm install && \
    npm cache clean --force

# Copia o restante da aplicação
COPY . .

# Muda para o usuário não-root
USER appuser

# Expõe a porta da aplicação
EXPOSE 5000

# Comando padrão
CMD ["npm", "start"]
