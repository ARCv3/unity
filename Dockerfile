FROM node

RUN apt-get update && apt-get install -y npm
WORKDIR /app

COPY ./package*.json .
RUN node --max-old-space-size=1000 $(which npm) i

COPY . .
RUN node --max-old-space-size=1000 $(which npm) run build

EXPOSE 443

ENTRYPOINT [ "npm", "run", "start" ]

