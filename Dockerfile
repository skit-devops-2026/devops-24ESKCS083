# Stage 1: Build stage using lightweight Node.js 24 on Alpine Linux
FROM node:24-alpine AS builder

# Set the working directory inside the container for the build process
WORKDIR /app

# Copy package manifests first to leverage Docker layer caching when dependencies do not change
COPY Frontend/package*.json ./

# Install exact dependencies listed in package-lock.json cleanly and deterministically
RUN npm ci

# Copy the rest of the Frontend application source code into the build container
COPY Frontend/ ./

# Compile and build the production-ready static assets into the /app/dist directory
RUN npm run build

# Stage 2: Production serving stage using lightweight Nginx on Alpine Linux
FROM nginx:alpine

# Copy the custom Nginx configuration enabling try_files fallback for React Router SPA routes
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from the builder stage to Nginx web root directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to document the port on which Nginx listens inside the container
EXPOSE 80

# Start Nginx in the foreground to prevent the container from terminating immediately
CMD ["nginx", "-g", "daemon off;"]
