# Usar la imagen base de Node.js con Alpine
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar dependencias necesarias para compilar `bcrypt`
RUN apk add --no-cache python3 make g++ libc6-compat

# Copiar archivos de dependencias antes del código
COPY package.json package-lock.json ./

# Instalar dependencias dentro del contenedor
RUN npm install --force

# Copiar el resto del código después de instalar dependencias
COPY . .

# Compilar TypeScript
# RUN npm run build

# Generar Prisma ORM
RUN npx prisma generate

# Exponer el puerto del servidor
EXPOSE 4000

# Ejecutar migraciones de Prisma y arrancar la app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
#CMD ["npm", "run", "dev"]


