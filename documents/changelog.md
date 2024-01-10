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
    - Fixed posting a new recipy, now the new recipy is returned from backend with the ingredients and categories which are in a connection table.
    - Frontend navigates to recipy view after posting a new recipy and new recipy is immediately shown.
    - Added component and page for users own recipies.
- 8.1 :
    - Added LoadingSpinner as a component to view as app is loading.
    - Preliminary setup of userpage. Shows users own recipies. 
    - Logout functionality added, and user info stored in localstorage for now. Logout clears localstorage and navigates to login page. 
    - Notification component added to show below navbar.
    - Filter component added to recipy view. 
    - Endpoint for getting and posting comments.
    - Notification and filter reducers added with preliminary content. 
- 9.1 :
    - Added endpoint for requesting average ratings for a recipy. 
    - Components for commenting a recipy and rating a recipy.
    - Component for making elements togglable by buttons.
    - Services for adding comments and ratings.
    - Get and Post works for ratings, get request for ratings sends the rating average. Had to re import sequelize in the recipyRouter module.
    - Get and Post for ratings and comments implemented for frontend with separate reducers.
- 10.1 :
    - New components added for a single recipy view showing all comments and the rating average.


