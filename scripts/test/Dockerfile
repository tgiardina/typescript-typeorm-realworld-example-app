FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
ADD ./scripts/general/migrate.sh ./scripts/
RUN chmod +x ./scripts/migrate.sh

COPY ./package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./config/general ./
COPY ./config/test ./
COPY ./migrations ./migrations

EXPOSE 3000