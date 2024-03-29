FROM node:21-slim

ENV NODE_ENV development

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

CMD ["npm", "run", "serve"]

EXPOSE 4000