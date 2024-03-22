# Working hours

## December 2023
- 2h 30.12 : Initialization of frontend, backend and documentation.
- 3h 31.12 : Basic setup of backend and frontend.

Month total : 5h 

## January 2024
- 1h 1.1: Creating component structure and Redux basic setup.
- 1h 2.1: Added page for posting recipies.
- 1h 3.1: Added basic login page and more functionality to recipy post page.
- 6h 5.1: Added Sequelize and models for it.
- 8h 6.1: Working with Sequelize and frontend actions.
- 4h 7.1: Implementing endpoints for healthcheck and testing, fixed posting new recipies.
- 5h 8.1: LoadingSpinner added, userpage setup, filter and notification reducers added and endpoints for comments.
- 5h 9.1: Endpoint ratings and comments implemented in backend and frontend.
- 1h 10.1: New page for viewing comments and rating average.
- 4h 11.1: Refactoring and debugging.
- 2h 12.1: Recipy finder.
- 3h 15.1: Notifications and update/delete endpoints and services.
- 2h 16.1: Recipy update form and recipy deletion.
- 1h 19.1: Update form.
- 2h 22.1: Updating recipies possible, direct url navigation possible, rating average.
- 1h 23.1: Deleting comments, refactoring, removing unnecessary parameters and imports. 
- 8h 29.1: Migrations, backend testing and dockerfiles
- 7h 30.1: More testing for backend and refactoring tests. Redis session setup. Redis session bug hunting.
- 3h 31.1: Redis session cookie settings debugging. Frontend testing.

Month total : 65h

## February 2024
- 5h 1.2: Frontend integration testing.
- 3h 2.2: Started with E2E testing by using Cypress, Redis session debugging.
- 2h 3.2: Redis sessions work! Component for viewing a single users recipies.
- 1h 5.2: Uploadcare added to handle validation and storage of pictures.
- 1h 9.2: Debugging uploadcare context provider 
- 1h 11.2: Switched to using Uploadcare React widget. 
- 3h 12.2: Uploadcare pictures showcased in recipiesview, also added basic support for adding friends. 
- 3h 13.2: Friends table changed to subscriptions, favorites table and support within front and backend.
- 1h 14.2: Adding user favorites and subscriptions to Redux state and Redis session. 
- 2h 16.2: Debugging Redux and Redis to get favorites and subscriptions working correctly.  
- 2h 20.2: Redis and Redux logic working for favorites and subscriptions.
- 1h 21.2: Debugging session cookie settings with Nginx setup. 
- 1h 22.2: Session endpoint had a hidden issue with a pending request, fixed. 
- 1h 23.2: Session cookies now work with docker compose environment with nginx.
- 3h 24.2: Making frontend a more cohesive system, recipies url queries added.
- 5h 25.2: Recipies URL queries, filtering and sorting, even both together. Favorites and subscribed to users recipies by button click.
- 1h 26.2: Filtering and sorting in recipiesview combined with selecting user favorites and subscriptions, not yet fully functional.

Month total: 36h

## March 2024
- 1h 7.3: Preliminary Kubernetes yaml file setting and testing.
- 1h 8.3: More Kubernetes yaml files and testing.
- 1h 10.3: Nginx conf for serving frontend and proxying backend in Kubernetes settings. 
- 2h 11.3: Kubernetes setup for frontend and backend communication working!!!
- 1h 12.3: Login form user input validation, login form, mainpage, navigationbar and App component css style added.
- 1h 13.3: SignUp component user validation and css. Addrecipe component first css draft. 
- 3h 17.3: Add recipe component rearrangement and css, recipies feed css. Chosenrecipy component extracted to SingleRecipy component. Recipies component user actions from Singlerecipy also.
- 1h 19.3: Updated Docker compose setup, and created first draft of a github action testing pipeline with Docker compose.
- 1h 20.3: App deployed via Google Kubernetes engine and is hosted by Cloudflare at receptifyonline.com.
- 1h 22.3: Added github action to build and push docker images for frontend and backend when a new release is published. 

Total hours: 119h