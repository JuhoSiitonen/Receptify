# Changelog

## December 2023
- 30.12 : Initialization of frontend, backend and documentation.
- 31.12 : Basic setup of backend, added Express. Also made a logger for request info and a basic recipy endpoint controller. Redux chosen as state management, Axios handles frontend requests.

## Janurary 2024
- 1.1 : Creating component structure and Redux basic setup.
- 2.1 : Page for posting recipies added along with Redux, Axios and backend support.
- 3.1 : Added possibility to add multiple ingredients and categories to one recipy. Also added basic login form and page. 
- 5.1 : 
    - Added Nodemon to backend dev depencies
    - Added Sequelize and an initial schema file with initial models for said schema. 
    - Also added a connection info string when starting backend. During dev stage PostgreSQL is run by Docker container, and backend has a .env file with the connection string for it. 
    - Created models for using Sequelize with initial schema.
    - Removed mock data for recipies and replaced with actual working post request with current Sequelize models (only in backend).
- 6.1 : 
    - Added post for a new user in backend, frontend to be implemented.
    - Sequelize models initialized with models/index.js file and synced at startup. 
    - GET works in frontend from database.
    - Added page for logging in and signing up, also preliminary Axios services and reducers in userReducer.js
    - Logging in through separate loginService and signing up through userService.
    - Logging in and signing up works in frontend! User information in Redux state. Signing up also logs user in and navigates to mainpage.
    - Posting new recipies works through add recipies page, now in use with hardcoded user id, actual id will be implemented with authenticated login.
- 7.1 :
    - Added endpoints for testing and healthchecks to backend.