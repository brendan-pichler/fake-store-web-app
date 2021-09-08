# Fake Store Web Application

This is a dummy online store web application built using React and the [fake store api](http://fakestoreapi.com/)

This application is publically hosted using AWS Elastic Beanstalk and can be accessed at [http://fakestorewebapp-env.eba-dpmgtf2b.ap-southeast-2.elasticbeanstalk.com/](http://fakestorewebapp-env.eba-dpmgtf2b.ap-southeast-2.elasticbeanstalk.com/)

## Running the application locally

### With Docker

The application comes with an included Dockerfile. To run the application locally, install [docker](https://www.docker.com/).

With docker installed, build the image:

> docker build -t fake-store-app . 

Then run the image:

> docker run -p 80:3000 fake-store-app

You should now be able to access the application on [http://localhost](http://localhost)

### Without Docker

To run this application without docker, please download NodeJS 16 [https://nodejs.org/en/download/current/](https://nodejs.org/en/download/current/) and then, in root directory, install the dependencies:

> npm install

And run the application with:

> npm start

You should now be able to access the application on [http://localhost:3000](http://localhost:3000)

## Setting up the development environment

The React web application sits in ./client.

To develop the application, navigate to ./client and install the dependencies with:

> npm install

To start the development environment:

> npm start

### Testing the application

The frontend can be testing after setting up the development environment using:

> npm test

## About this application

This application uses React with TypeScript. TypeScript is a must have and is incredibly useful for software maintainability and also works to self document code.

This application uses [Redux Saga](https://redux-saga.js.org/) to manage application state and calls to the fake store api. This makes it easy to share state around the application and handle errors. Folder structure for Redux has been designed to group actions, reducers, and state with their components, in this way, each module is self contained.

The application uses [Sass](https://sass-lang.com/) for styling which extends css with hierarchies, variables, and more. Hierarchies in particular help greatly with having readable and maintainable style sheets as the software grows.

The application uses a NodeJS backend.

For Git, I used branching workflows. Branch for new feature, develop with atomic commits, create pull request, merge into master. I didn't bother with pull requests for this application, but in a team I would.

## Notes about Application Architecture

I am including some notes about the application architecture here where it differs from what I would design for an enterprise application here.

Obviously, the Fake Store API is completely insecure, everyone can access everyone's carts, user details, etc. In a real application, the calls to the api would be passed to the backend where the session key is authenticated and data is retrieved. I would also never display a user password in the application, or even store it in a database without hashing and salting first, but have included it because it is in the requirements.

In this application, filtering has been done after receiving data from the database (except in the case of retrieving the Category) as the API doesn't support filtering on arbitrary fields. The filtering algorithm will match the search attribute to the corresponding product attribute, after pulling all the products from the database. With a lot of products, this would cause poor performance. Normally, I would make a call to the backend, which would then construct a database query with the filter and return the results. Pagination would be done in a similar way, but has been done with front end logic in the application. (E.g. using OFFSET and FETCH NEXT in SQL).

## Notes about Software Design and Principles

Code linting and formatting: When working with a team, I always enforce code linting and formatting with pre-commit hooks using tools like eslint and prettify. Pre-merge I would run unit tests. Although, for this project, I haven't bothered.

Comments: My normal philosphy is comment why when the why isn't obvious, code should more or less comment itself with well named functions and variables.

Repo structure: Normally, I would use a DEV, UAT, PROD branching scheme in the repo and each would use a continuous delivery pipeline to automatically build and deploy to the relevant environment on AWS.

Project Management: I an actual project, I would also set up the project in Jira, create a backlog, prioritise, etc. and link the commits to the Jira tasks.
