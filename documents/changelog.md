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