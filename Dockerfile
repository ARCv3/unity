FROM node:18

WORKDIR /app

COPY ./package*.json .

RUN node $(which npm) i

COPY . .
RUN node  $(which npm) run build

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]
