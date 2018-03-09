FROM node:8.9.4

WORKDIR /www

RUN npm config set registry https://registry.npm.taobao.org \
    && npm i -g nodemon

EXPOSE 3002

CMD npm run start
