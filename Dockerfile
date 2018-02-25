FROM node:8.9.4

WORKDIR /www

COPY package*.json ./

RUN npm config set registry https://registry.npm.taobao.org \
    && npm install

COPY . .

EXPOSE 3002

CMD npm run start
