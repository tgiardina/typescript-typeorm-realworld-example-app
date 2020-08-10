## Introduction

### You

You are familiar with REST APIs, MVC, and TypeScript, but maybe inexperienced with Object-Oriented Programming.

You want to develop a robust object-oriented REST API that scales.

### Us

In 30 minutes, we will introduce you to "SOLID" object-oriented principles, Dependency Injection (DI), and how to organize your large TypeScript projects using:

- Express,
- Inversify,
- Inversify Express Utils,
- TypeOrm.

### Prequisites

Before cloning this repository, you should familiarize yourself with some concepts. First, reacquaint yourself with TypeScript and REST architechure. Then read these three articles: 

1. ["Bulletproof node.js project architecture"](https://softwareontheroad.com/ideal-nodejs-project-structure/) 
    - This article will explain how and why you should use our particular flavor of MVC.
2. ["S.O.L.I.D: The First 5 Principles of Object Oriented Design"](https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
    - This article will teach best practices for object-oriented programming.
2. ["Inversion of Control Containers and the Dependency Injection Pattern"](https://www.martinfowler.com/articles/injection.html#InversionOfControl) up until the section ["Using a Service Locator"](https://www.martinfowler.com/articles/injection.html#UsingAServiceLocator)
    - This article will teach you about Dependency Injection.

You now understand the theory behind this project. Get the documentation for [inversify](http://inversify.io/), [inveresify-express-utils](https://github.com/inversify/inversify-express-utils#inversify-express-utils), and [typeorm](https://github.com/typeorm/typeorm#features), clone this repository, and hack away!

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

## Goals

1. Conform to the [RealWorld API specs](https://github.com/gothinkster/realworld/tree/master/api#realworld-api-spec).
2. Follow industry best practices -- REST, MVC, OOP, DI, and database normalization.
3. Remain as minimal as possible.
4. Provide users with the resources necessary to
    1. know **when** to use a similar setup,
    2. know **how** to build a similar setup.
