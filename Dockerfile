# Use Alpine Linux as base image
FROM node:alpine

# Set working directory in the container
WORKDIR /usr/berry

# Copy all files from current directory to /usr/berry in container
COPY . .

# Install dependencies, if any (uncomment and modify if needed)
# RUN npm install

# Expose port 3000
EXPOSE 3000

# Set command to run the application
CMD ["npm", "run", "dev"]
