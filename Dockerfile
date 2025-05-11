FROM node:lts-slim AS build

WORKDIR /app
COPY --chown=root:root --chmod=755 ./package*.json ./
RUN node $(which npm) ci --omit=dev

COPY . .
RUN node $(which npm) run build



FROM node:22-alpine AS production

WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --production
COPY --from=build /app/.next ./.next

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]
