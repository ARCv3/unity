FROM node

RUN apt-get update && apt-get install -y npm
WORKDIR /app

COPY ./package*.json .
RUN node $(which npm) i

COPY . .
RUN node  $(which npm) run build

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]
