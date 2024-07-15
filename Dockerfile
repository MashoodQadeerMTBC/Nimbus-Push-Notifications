FROM node:14-alpine

# Create app directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies as the node user
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure views directory is copied correctly
COPY views ./views

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]