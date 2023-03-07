FROM node:latest

WORKDIR /app

COPY . .
RUN npm install

COPY . .
RUN npm run build

CMD npm run prod ${DB_ENTITIES_AMOUNT}