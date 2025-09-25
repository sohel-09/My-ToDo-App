FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Copy wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Start backend only after db is ready
CMD ["./wait-for-it.sh", "db:3306", "--timeout=30", "--strict", "--", "node", "server.js"]
