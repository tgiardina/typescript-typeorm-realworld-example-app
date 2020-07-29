## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project uses Docker. If you haven't already, install [Docker](https://docs.docker.com/get-docker/) and then [Docker Compose](https://docs.docker.com/compose/install/).

### Installing

Once you have Docker set up, clone this repository:
```
git clone https://github.com/tgiardina/express-boilerplate-2.git;
cd express-boiler-plate-2;
```
You will now need to set environment variables for the project. To start, init a `.env` file:
```
cp config/.env.example config/.env
```
You can then edit config/.env if you so desire. Finally, spin up the project using:
```
docker-compose up
```
This project uses `nodemon`, so any changes you make to `.ts` files in `src` will automatically update the running API.

### Style

This project is based loosely off the structure described [here](https://softwareontheroad.com/ideal-nodejs-project-structure/). Please use `npm run lint` or `npm run lint-and-fix` to ensure you are adhering to TypeScript best practices.