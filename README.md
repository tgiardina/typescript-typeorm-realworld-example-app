## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project uses Docker. If you haven't already, install [Docker](https://docs.docker.com/get-docker/) and then [Docker Compose](https://docs.docker.com/compose/install/). Note, you may have to restart your computer after these installations.

### Installing

Once you have Docker set up, clone this repository:
```
git clone https://github.com/tgiardina/typescript-typeorm-realworld-example-app.git;
cd typescript-typeorm-realworld-example-app;
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

### Goals

This template shows off

- TypeScript
- Express
- Inversify
- TypeOrm

and how they all fit together. It aims to

1. Conform to the [RealWorld API specs](https://github.com/gothinkster/realworld/tree/master/api#realworld-api-spec).
2. Follow industry best practices -- REST, OOP, MVC, and database normalization.
3. Remain as minimal as possible.
4. Provide users with the resources necessary to
  a. know when to use a similar setup,
  b. know how to build a similar setup.

### Style

This project is based loosely off the structure described [here](https://softwareontheroad.com/ideal-nodejs-project-structure/). Please use `npm run lint` or `npm run lint-and-fix` to ensure you are adhering to TypeScript best practices.