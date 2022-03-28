FROM node:14

WORKDIR /home/node/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start:prod"]