# Imagen base ligera de Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY app/package*.json ./

# Instalar dependencias
RUN npm install --omit=dev

# Copiar el código fuente
COPY app/ .

# Exponer el puerto donde correrá la app
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
