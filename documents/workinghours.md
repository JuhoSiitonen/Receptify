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
- 1h 21.3: Added github action to build and push docker images for frontend and backend when a new release is published. First draft of GKE deployment pipeline in github actions, runs on release.
- 1h 22.3: Fixing backend tests to be able to implement the github action for testing pipeline.
- 1h 23.3: New test file for session, new logic for doing tests with correct session management.
- 6h 24.3: Backend tests work again! Testing pipeline implemented. Refactoring plus more coherent css styles. 
- 2h 25.3: RecipyFinder component and associated logic implemented.
- 2h 26.3: RecipiesView sorting and filtering logic fixed. Docker build push pipeline.
- 2h 27.3: Frontend fixes, pre release with new deployment to GKE.
- 3h 28.3: Refactoring reducers, user rating updating. Shoppinglist component.
- 5h 29.3: Shoppinglist item deletion and related methods and endpoint. Shoppinglist styles and sending it via email to user, with email info formatting.
- 5h 30.3: Bcrypt in backend, Userpage modifications, ViewUser modifications, Chosenrecipy and Userpage useEffect to have data after refresh. GKE deployment pipeline.
- 3h 31.3: Refactoring and removing unnecessary code. Started refactoring controllers, new architecture is to have a routes folder with routers, a services folder with services for database methods and controllers only manage business logic between them. 

Month total: 43h

## April 2024
- 3h 1.4: Refactoring continues. Comment list styles, filter/sort bug in recipiesview fixed.
- 1h 8.4: User input validation, infinite scroll.
- 2h 9.4: Infinite scroll bug fixes and implementation to viewing one users recipies.
- 2h 10.4: Refactoring, RecipyFinder function to show user ingredient matches, combinedShoppinglist correct units and amounts.
- 1h 12.4: Autocomplete search implemented in RecipyFinder.
- 1h 13.4: New migration for new columns about favorite amount and subscriber amount data. Implemented in backend and frontend. 
- 1h 14.4: Uploadcare widget fix, new user db column info in state, session and frontend. 
- 3h 16.4: More coherent styles, user input validation. 
- 2h 17.4: Cypress E2E pipeline testing.
- 1h 18.4: Cypress testing in pipeline. 
- 1h 19.4: Cypress tests and admin functions.
- 1h 21.4: Cypress flakyness debugging.
- 4h 22.4: Configuring Jest unit tests with MSW api mocking. Can't configure Jest with MSW so deleted all Jest conf files, tests, scripts and npm packets. Admin methods and services.
- 1h 24.4: Moved CSS styles to own folder, style fixes, known issues documentation.
- 2h 26.4: Fixed bug in filtering and sorting in recipiesview.
- 1h 28.4: Removing unnecessary props, comments time and username formatted.

Total hours: 176h