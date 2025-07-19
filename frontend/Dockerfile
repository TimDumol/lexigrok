# Use the official Node.js image.
FROM node:22-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory in the container.
WORKDIR /app

# Copy the dependency files.
COPY package.json pnpm-lock.yaml ./

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Copy the rest of the frontend code.
COPY . .

# Build the frontend.
RUN pnpm build

# Run the frontend server.
CMD ["pnpm", "preview", "--host", "0.0.0.0"]
