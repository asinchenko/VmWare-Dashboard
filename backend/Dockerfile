FROM node:16

WORKDIR /backend
COPY package.json .
RUN npm install --force
RUN npm uninstall -g bcrypt --force
RUN npm install bcrypt --force
RUN npm install -g --force nodemon
COPY . .
RUN apt update -y
RUN apt upgrade -y
RUN apt install vim -y
CMD nodemon server