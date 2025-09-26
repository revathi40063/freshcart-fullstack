# Use Node 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

COPY .env ./
# Install dependencies
RUN npm install

# Copy all frontend code
COPY . .

# Set port environment variable for React
ENV PORT=3000
ENV REACT_APP_API_URL=http://localhost:5000/api

# Expose the port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
