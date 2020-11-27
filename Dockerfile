FROM node:alpine

WORKDIR /data

COPY ./src/ /data/
COPY package.json /data 

RUN yarn

EXPOSE 3000

CMD ["node", "./app.js"]