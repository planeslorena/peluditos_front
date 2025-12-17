# Etapa base: dependencias comunes
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci --no-audit --no-fund

# Etapa de build
FROM base AS builder
WORKDIR /app
COPY . .
ENV NEXT_DISABLE_ESLINT=true
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
CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "3000"]
