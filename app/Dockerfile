FROM node:alpine

RUN npm install express http-proxy winston

COPY ./ /work
WORKDIR /work

EXPOSE 8080
ENV PORT=8080

CMD node run.js
