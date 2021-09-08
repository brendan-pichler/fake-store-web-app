# Fake Store Web Application - Brendan Pichler

This is a dummy online store web application built using React and the [fake store api](http://fakestoreapi.com/)

This application is publically hosted using AWS Elastic Beanstalk and can be accessed at [http://fakestorewebapp-env-2.eba-3x8fvp3s.ap-southeast-2.elasticbeanstalk.com/](http://fakestorewebapp-env-2.eba-3x8fvp3s.ap-southeast-2.elasticbeanstalk.com/)

This application will change dynamically based on the screen size. Try it on mobile or use the browser debug tools to change the resolution and refresh the application.

## Running the application locally

### With Docker

The application comes with an included Dockerfile. To run the application locally, install [docker](https://www.docker.com/).

With docker installed, build the image:

> docker build -t fake-store-app . 

Then run the image:

> docker run -p 80:3000 fake-store-app

You should now be able to access the application on [http://localhost](http://localhost).

### Without Docker

To run this application without docker, please download NodeJS v14.17.6 [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and then, in root directory, install the dependencies:

> npm install

And run the application with:

> npm start

You should now be able to access the application on [http://localhost:3000](http://localhost:3000).

## Setting up the development environment

The React web application sits in ./client.

To develop the application, navigate to ./client and install the dependencies with:

> npm install

To start the development environment:

> npm start

## About this application

This application uses React with TypeScript. TypeScript is a must have and is incredibly useful for teams and software maintainability. It also works to self document code.

This application uses [Redux Saga](https://redux-saga.js.org/) to manage application state and calls to the fake store api. This makes it easy to share state around the application and handle errors. Folder structure for Redux has been designed to group actions, reducers, and state with their components, in this way, each module is self contained.

The application uses [Sass](https://sass-lang.com/) for styling which extends css with hierarchies, variables, and more. Hierarchies in particular help greatly with having readable and maintainable style sheets as the software grows.

The application uses a NodeJS backend.

For Git, I used branching workflows. Branch for new feature, develop with atomic commits, create pull request, merge into master. I didn't bother with pull requests for this application, but in a team I would.

Please note: Only the cart view functionality has been implemented based on the spec. The buttons are there to add and remove from cart but they do nothing, same with the checkout button.

## Notes about Application Architecture

Obviously, the Fake Store API is insecure, everyone can access everyone's carts, user details, etc. In a real application, the calls to the api would be passed to the backend where the session key of the user is authenticated and data is retrieved.

In this application, filtering has been done after receiving data from the database (except in the case of retrieving the Category) as the API doesn't support filtering on arbitrary fields. The filtering algorithm will match the search attribute to the corresponding product attribute, after pulling all the products from the database. If there were a lot of products, having all the products rendered or in memory could cause poor performance. Normally, I would make a call to the backend with the filters as parameters, which would then construct a database query with the filters and return the results. Pagination would also normally be done in a similar way to avoid pulling all of the products, but has been done with front end logic in the application. (E.g. using OFFSET and FETCH NEXT in SQL).

## Notes about Software Design and Principles

Code linting and formatting: When working with a team, I always enforce code linting and formatting with pre-commit hooks using tools like eslint and prettify. Pre-merge I would run unit tests. Although, for this project, I haven't bothered.

Comments: My normal philosphy is comment why when the why isn't obvious, code should more or less comment itself with well named functions and variables.

Repo structure: Normally, I would use a DEV, UAT, PROD branching scheme in the repo and each would use a continuous delivery pipeline to automatically build and deploy to the relevant environment on AWS.

Project Management: In an actual project, I would set up the project in Jira, create a backlog, prioritise, etc. and link the commits to the Jira tasks.
