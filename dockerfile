from node:16

WORKDIR /usr/local/simple-mail

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
