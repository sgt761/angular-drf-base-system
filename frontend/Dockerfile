FROM node:20

WORKDIR /app


RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build -- --output-path=dist
