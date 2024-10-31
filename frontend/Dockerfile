FROM node:22.11.0

WORKDIR /frontend

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "start"]

EXPOSE 3000