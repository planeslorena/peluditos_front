# Etapa base: dependencias comunes
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Etapa de build
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Etapa final (producción)
FROM node:20-alpine AS production
WORKDIR /app

# Copiamos solo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/node_modules ./node_modules

# Exponemos el puerto donde corre Next.js
EXPOSE 3000

# Comando para iniciar la app en modo producción
CMD ["npm", "run", "start"]
