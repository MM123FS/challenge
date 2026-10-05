# ---- Stage 1 : dépendances de production ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---- Stage 2 : image finale ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY . .

# Exécution avec l'utilisateur non-root fourni par l'image node
USER node

EXPOSE 3000
CMD ["node", "src/app.js"]