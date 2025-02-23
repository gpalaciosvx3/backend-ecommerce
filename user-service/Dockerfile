# Usar la imagen base de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos importantes para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código al contenedor
COPY . .

# Compilar TypeScript
RUN npm run build

# Generar prisma orm
RUN npx prisma generate

# Exponer el puerto del servidor
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["node", "dist/server.js"]
