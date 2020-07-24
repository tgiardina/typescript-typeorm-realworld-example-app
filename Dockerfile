FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install -g nodemon
RUN npm install -g sequelize-cli
ADD ./init/migrate.sh /
RUN chmod +x /migrate.sh

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000