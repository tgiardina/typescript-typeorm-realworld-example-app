![Node.js CI](https://github.com/tgiardina/express-boilerplate-2/workflows/Node.js%20CI/badge.svg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project uses Docker. If you haven't already, install [Docker](https://docs.docker.com/get-docker/) and then [Docker Compose](https://docs.docker.com/compose/install/). Note, you may have to restart your computer after these installations.

### Installing

Once you have Docker set up, clone this repository:
```
git clone https://github.com/tgiardina/express-boilerplate-2.git;
cd express-boilerplate-2;
```
You will now need to create your environment variables for the project. To start, init `.env` files for both your development and test environment:
```
cp config/dev/.env.example config/dev/.env
cp config/test/.env.example config/test/.env
```
Edit these files if you so desire. You can now spin up the project using
```
docker-compose -f scripts/dev/docker-compose.yml up
```
and the tests using
```
docker-compose -f scripts/test/docker-compose.yml up
```
Both use `nodemon`, so any changes you make in `src` will yield automatic updates.

### Style

This project is based loosely off the structure described [here](https://softwareontheroad.com/ideal-nodejs-project-structure/). Please use `npm run lint` or `npm run lint-and-fix` to ensure you are adhering to TypeScript best practices.