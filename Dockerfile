FROM node:alpine

WORKDIR /data

COPY ./src/ /data/
COPY package.json /data 

RUN yarn

EXPOSE 3000

ENV PREDICTD_HOST predictd
ENV PREDICTD_PORT 1210

CMD ["node", "./app.js"]