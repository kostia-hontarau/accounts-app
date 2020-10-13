This app is an example of how can look backend/frontend architecture
of account management app.
This is a demo app, it's not a production ready solution. 
However, this can be used as a template and as a demonstration of some architectural concepts.

# Backend

The backend is basic json API service written in Typescript.
It does use MongoDb as a storage solution, the communication/interaction is based on Mongoose ORM;
As an API framework it was used Koa, as the best simple alternative to express;
Through service there are demonstrated usage of some cross-cutting concerns, such as logging (pino), performance-monitoring (newrelic);
Service built having in mind layer architecture (application, api, business and dataAccess layers) and Dependency Injection (Awilix as container)

There are next available API endpoints

- GET - `/api/v1/account` -  retrieves the current logged in account or 401
- POST - `/api/v1/account/login` - log in the user based on email/password (passport lib used under the hood, sessions handled in-memory);
- POST - `/api/v1/account/logout` - log out for the current user;
- POST - `/api/v1/account` - register user (provide name, surname, email, city, postalCode, phone, password within body);
- PATCH `/api/v1/account` - updates currently logged in user. (provide name, surname, email, city, postalCode, phone, oldPassword, newPassword within body)
- DELETE `/api/v1/account` - removes currently logged in user

For all pre-processing validations of requests @hapi/joi is used.
Details of endpoints logic can be found in `src/service/api/v1/` folder.

P.S. Forgot to implement graceful shutdown - at some point will add it.

# Frontend

The frontend build using create-react-app as the best available template of configuration;
As a state manager I have used redux + redux-thunk + redux-promise-middleware. 
All actions done in the application are going through redux;
Any data required in components - is provided by redux connectors;
The component usually consist of jsx definition, scss styles and index.js file for providing necessary high-level behavior;
The css architecture is BEM.

The application architecture is represented with components hierarchy.

1. Layout - highest in components hierarchy, represents some common app behavior and helps group app pages. 
Potentially can use each other. In this app there are 3 layouts - Master, Public, Dashboard.
2. Page - represent 1 page of the web-app, responsible about handling page state / url address and control underlying components;
3. Component - any other components required to provide business logic / view representation of the app


# Quality

To ensure quality of the project, next tools are used:
- `eslint`. The config for backend is default ts/eslint recommended. For frontend - default react-app + airbnb standard.
- `prettier`. The config is default and integrated with eslint
- `husky / lint-staged`. Git hooks used to run linting on commits, and run tests + building on the push.

# How to Run

##Local machine run
- install and run mongo
- Backend. Set correct `.env` (you can use .env.example), run command: `npm install && npm run start:ts`
- Frontend. Set correct `.env` (you can use .env.example), run command: `npm install && npm run start`

##Docker / Docker-Compose

Docker environment trying to represent production-like environment and works with compiled code.
1) Setup service configuration if necessary using `docker-compose.yml`. By default - port 3333 for the backend and 8000 for the frontend.
2) Run `docker-compose up`
3) It might take some time... When you see "Application initialization finished" - most likely it's ready.
4) The app should be available on the `localhost:8000`

To change address/ports - go to `docker-compose.yml` file. 

The REACT_APP_ACCOUNT_API should reflect the address of the backend
The FRONTEND_URL should reflect the address of the frontend
```
  accounts-frontend:
    build:
      context: "./frontend-example"
      args:
        - REACT_APP_ACCOUNT_API=http://localhost:3333
    expose:
      - "8000"
    ports:
      - "8000:80/tcp"

  accounts-backend:
    build: "./backend-example"
    environment:
      - FRONTEND_URL=http://localhost:8000
    expose:
      - "3333"
    ports:
      - "3333:3333/tcp"
```