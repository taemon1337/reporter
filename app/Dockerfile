FROM node:alpine

RUN npm install surveyjs-editor

COPY ./ /work
WORKDIR /work

EXPOSE 8080
ENV PORT=8080

CMD node run.js
