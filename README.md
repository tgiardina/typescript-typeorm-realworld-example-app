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
You will now need to create your environment variables for the project. To start, init `.env` files for both your development and test environments:
```
cp config/dev/.env.example config/dev/.env
cp config/test/.env.example config/test/.env
```
Edit these files if you'd like. You can now spin up the project using
```
docker-compose -f scripts/dev/docker-compose.yml up
```
and the tests using
```
docker-compose -f scripts/test/docker-compose.yml up
```
Both use `nodemon`, so they will automatically update  whenever you make changes in `src` or `tests`.

### Goals

This template shows off

- TypeScript
- Express
- Inversify
- TypeOrm

and how they all fit together. It aims to

1. Conform to the [RealWorld API specs](https://github.com/gothinkster/realworld/tree/master/api#realworld-api-spec).
2. Follow industry best practices -- REST, MVC, OOP, DI, and database normalization.
3. Remain as minimal as possible.
4. Provide users with the resources necessary to
    1. know **when** to use a similar setup,
    2. know **how** to build a similar setup.

### Learning Resources

1. ["Bulletproof node.js project architecture"](https://softwareontheroad.com/ideal-nodejs-project-structure/) 
    1. **(+)** This article will explain both **how** and **why** to set up a robust MVC API like ours.
    2. **(-)** This article does a bad job of explaining **when** to build your API similarly. Indeed, if this project wasn't a demo, it would be very over-engineered.
2. [Martin Fowler's canonical "Inversion of Control Containers and the Dependency Injection Pattern"](https://www.martinfowler.com/articles/injection.html#InversionOfControl) 
    1. **(+)** This is *the* article to read if you don't yet know about Inversion of Control (IoC) and Dependency Injection (DI). 
    2. **(-)** The article uses Java rather than TypeScript, but the discussion is mostly theoretical.
    3. **(-)** It provides a lot of context that you may not be interested in. But if you only want a basic understanding of DI, you can just read the first few paragraphs, up until ["Using a Service Locator"](https://www.martinfowler.com/articles/injection.html#UsingAServiceLocator)
