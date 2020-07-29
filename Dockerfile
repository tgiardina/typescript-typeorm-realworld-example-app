FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
ADD ./scripts/migrate.sh /
RUN chmod +x /migrate.sh

COPY ./package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./config/ ./
COPY ./scripts/ ./scripts/

EXPOSE 3000