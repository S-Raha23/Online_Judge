FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Include environment file
COPY .env .env

EXPOSE 3001
CMD ["node", "index.js"]
