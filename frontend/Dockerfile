# Use the official Node.js image.
FROM node:20-slim

# Set the working directory in the container.
WORKDIR /app

# Copy the dependency files.
COPY package.json pnpm-lock.yaml ./

# Install pnpm.
RUN npm install -g pnpm

# Install dependencies.
RUN pnpm install

# Copy the rest of the frontend code.
COPY . .

# Build the frontend.
RUN pnpm build

# Expose the port that the frontend will run on.
EXPOSE 5173

# Run the frontend server.
CMD ["pnpm", "preview", "--host", "0.0.0.0"]
