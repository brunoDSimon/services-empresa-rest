# Use a imagem Node.js como base
FROM node:20 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências e o projeto
COPY package*.json ./
RUN npm install
COPY . .

# Remova a pasta dist se ela existir
RUN rm -rf dist
# Execute o build
RUN npm run build

# Use uma imagem Node.js mais leve para a aplicação final
FROM node:20-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos construídos e as dependências
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY start.sh ./

# Torne o script start.sh executável
RUN chmod +x start.sh

# Exponha a porta que o NestJS usa
EXPOSE 3000

# Comando para iniciar a aplicação usando o script start.sh
CMD ["./start.sh"]
