# Use the node:18-alpine base image and define an intermediate stage named 'builder'
FROM node:18-alpine AS builder

# Set the working directory to /app inside the container
WORKDIR /app

# Copy package.json, package-lock.json, and prisma directory to the working directory
COPY package*.json ./
COPY prisma ./prisma/

# Install project dependencies
RUN npm install

# Copy all files and directories to the working directory
COPY . .

# Build the project
RUN npm run build

# Set a new base image as node:18-alpine for the final stage
FROM node:18-alpine

# Copy node_modules from the 'builder' stage to the final image
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose port 3000 for external access
EXPOSE 3000

# Define the command to be executed when the container starts
CMD [ "npm", "run", "start:migrate:prod" ]
