FROM node:12

WORKDIR /var/www/html/server/

COPY ./package*.json ./

RUN npm install

RUN npm rebuild bcrypt --update-binary

RUN npm install pm2 -g

COPY . .

EXPOSE 54110

CMD ["pm2-runtime","server.js"]
# CMD ["pm2-runtime","server.js","--watch"]
# CMD ["node","server.js"]
