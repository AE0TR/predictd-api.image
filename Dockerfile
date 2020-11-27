FROM node:alpine

WORKDIR /data

COPY src/ /data/

CMD ["node", "./app.js"]