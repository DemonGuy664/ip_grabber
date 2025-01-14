# Use official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port (change as per your app)
EXPOSE 3000

# Command to run the app (for example, a Node.js app)
CMD ["npm", "start"]
