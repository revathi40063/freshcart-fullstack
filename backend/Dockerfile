# Use Node 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend code
COPY . .

# Set port environment variable
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
