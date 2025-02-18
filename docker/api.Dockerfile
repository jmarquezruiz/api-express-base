# Use the official Node.js image.
FROM node:21-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app/

# Copy application dependency manifests to the container image.
COPY api/package*.json ./api/

# Change to the 'web' directory
WORKDIR /usr/src/app/api

# Install production dependencies.
RUN npm install

# Copy the entire project to the container image.
COPY . /usr/src/app

# Add npm global bin to PATH
ENV PATH /usr/local/bin:$PATH

CMD ["npm", "start"]