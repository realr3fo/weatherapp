# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code to the container
COPY . .

# Expose port 8000 for the server
EXPOSE 8000

# Start NGINX when the container starts
CMD ["npm", "start"]
