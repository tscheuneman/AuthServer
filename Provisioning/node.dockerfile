FROM node:12-alpine

ENV enviorment = ${ENV}

WORKDIR /var/www/auth

COPY ./Webserver/package*.json ./
RUN yarn install

COPY ./Webserver .

RUN yarn tsc -p ./tsconfig.json

EXPOSE 5000
CMD ["yarn", "run", "start"]