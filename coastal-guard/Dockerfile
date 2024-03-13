# Use a lightweight Linux distribution as the base image
FROM alpine:latest

# Install necessary tools for orchestration (e.g., Docker Compose)
RUN apk --no-cache add \
    bash \
    docker \
    docker-compose \
    && rm -rf /var/cache/apk/*

# Set the working directory
WORKDIR /app

# Copy the docker-compose.yml file
# Copy the client and server scripts into the container
COPY client /usr/src/app/client
COPY server /usr/src/app/server

# Grant execute permissions to the scripts
RUN chmod +x /usr/src/app/client
RUN chmod +x /usr/src/app/server

# Default command when container starts
CMD ["docker-compose", "up"]