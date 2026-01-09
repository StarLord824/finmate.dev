FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json ./
COPY tsconfig.json ./

# Copy source
COPY src ./src

# Install dependencies
RUN pnpm install

# Build
RUN pnpm build

# Start
CMD ["node", "dist/index.js"]
