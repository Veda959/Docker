# Use the official Node.js LTS base image
FROM node:18-alpine 

# Run the upgrade command to uudate all the dependencies
RUN apk update && apk upgrade

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) first
COPY package*.json ./

# Install dependencies
RUN npm install 
# Copy the rest of the application files
COPY . .

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "demo_fileserver.js"]
