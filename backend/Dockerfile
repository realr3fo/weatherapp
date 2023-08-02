# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code to the container
COPY . .

# Expose port 8080 for the Node.js server
EXPOSE 8080

# Start the Node.js backend server
CMD ["npm", "start"]
