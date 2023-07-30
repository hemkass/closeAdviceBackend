FROM node:buster As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build db-manager

EXPOSE 4000
EXPOSE 80
CMD ["node","dist/main"]