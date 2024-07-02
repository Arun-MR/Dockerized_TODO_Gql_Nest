# Use Node.js 20.12.0 base image
FROM node:20.12.0-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to WORKDIR
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Install nodemon globally
RUN yarn global add nodemon

# Copy all files from current directory to WORKDIR
COPY . .

# Expose port 4000
EXPOSE 5000

# Command to run your application
CMD ["yarn", "start:dev"]