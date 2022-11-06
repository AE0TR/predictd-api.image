FROM node:alpine3.15

WORKDIR /data

COPY ./src/ /data/
COPY package.json /data 

RUN npm install

EXPOSE 3000

ENV PREDICTD_HOST predictd
ENV PREDICTD_PORT 1210

ENTRYPOINT ["node", "./app.js"]
