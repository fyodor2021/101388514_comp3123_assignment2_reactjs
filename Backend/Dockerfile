FROM node:alpine


COPY . ./app

WORKDIR /app

RUN npm install

RUN npm install express mongoose

EXPOSE 3001

CMD npm start
