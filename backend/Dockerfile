
# Use official Node.js 18 LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json files for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source files
COPY . .

# Expose port 3000 to match server.js
EXPOSE 3000

# Run as non-root user for security
RUN adduser -D appuser
USER appuser

# Start the server
CMD ["node", "server.js"]
