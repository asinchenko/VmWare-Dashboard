# Fetching the latest node image on apline linux
FROM node:16 AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx files
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/server.crt /etc/nginx/ssl/server.crt
COPY ./nginx/server.key /etc/nginx/ssl/server.key