# Choose the base image
FROM node:14

# Create the app directory
WORKDIR /app

# Copy package*.json files to the root directory of our app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Set the API to run on port 3000
EXPOSE 3000

# The command to start our app
CMD [ "node", "./src/index.js" ]
