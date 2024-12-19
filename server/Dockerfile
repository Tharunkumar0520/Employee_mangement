FROM node:20 AS build
WORKDIR /
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
RUN npm install -g prisma
RUN prisma generate
EXPOSE 3000 
CMD ["npm", "start"]