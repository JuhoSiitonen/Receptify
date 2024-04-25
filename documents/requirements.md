# Requirements of the app

## Features
- [x] Users can sign in
- [x] Users can log in
- [x] Users can post recipies
- [x] User can post pictures of the recipy
    - [x] User can update said pictures
- [x] User sees clear error and success notifications upon actions
- [x] User can update and delete their own recipies
- [x] Users can view recipies in a scrollable list
    - [x] Recipy view
    - [x] Paginated scrolling
    - [x] User can view own recipies in a list
- [x] User can filter recipies view
    - [x] Filtering recipies by user
    - [x] Filtering recipies by categories
    - [x] Filtering recipies by incredients
    - [x] Filtering recipies by title
    - [x] Filtering recipies by cooking time
- [x]  User can sort recipies
    - [x] Recipy sorting newest -> oldest and vice versa
    - [x] Average rating best -> worst and vice versa
- [x] User can type in specific incredients and find recipies which match those (even partially)
- [x] User can compose a shopping list out of selected recipies
    - [x] Same items on shopping list will be combined, and units converted to match
    - [x] Shopping list can be printed or sent to email
    - [x] User can add miscellaneous items to list
- [x] The app has privileged users, e.g maintenance which can delete recipies and users
- [x] Users can comment on recipies
- [x] Users can rate each others recipies (1-5 rating)
    - [x] Only one rating per recipy per user
    - [x] User can't rate own recipies
    - [x] Rating average is shown to all users
    - [x] Rating only for logged in users
- [x] User can add recipies as favorites
    - [x] User can see a list of favorited recipies
- [x] User can subscribe to other users recipy posts
    - [x] User can see a list of newest recipies from subscribed users

## Technical requirements
- Redis session based authentication for requests
- Session validation expiry within certain amount of time
- The app frontend is made with React
- The backend is an Express server with PostgreSQL database
- The app has a Redis session cache
- The api is REST
- The frontend state handling is done with Redux
- The application development done with a Docker compose setup
- The app has a CICD pipeline with Github Actions
- The app has unit testing with Jest in backend and end to end testing with Cypress
- Uploadcare for validating, storing and getting stored pictures
- The application is hosted in Google Kubernetes Engine as a Kubernetes cluster
- Application domain is with Cloudflare 

## Architechture
- Node.js
- Express server
- Redis session cache
- PostgreSQL database
- React frontend
- Redux state management
- Kubernetes cluster 

## Known issues
- Frontend components folder is bloated and needs to be divided to pages and components.
- CSS styles are not entirely cohesive and naming conventions somewhat peculiar.
- Too many reducer methods, refactoring needed.
- Too many service methods, refactoring needed.
- No frontend unit tests, tried with Jest and MSW with usage of Redux state and react router but after many different confs deleted the files, next try with Vitest.
- No secure connection.
- Visible column is unused in db tables at the moment.
- Kubernetes cluster update on tag releases is not optimal, should use Helm or Kustomize or something else to manipulate kubernetes yaml files on new release.
- Kubernetes load balancing not yet fully functional.
- Usage of proper kubernetes ingress instead of dockerized frontend + NGINX.
- No hooks extracted yet.
- Proper setup for Express-Async errors
- A few confusing usages of reducers, userReducer using recipyReducer on a few methods.
- Admin user deletion does not yet delete subscriptions correctly.
- Contend needs to be better scaled to mobile users.
- Shoppinglist email sending can be exploited at the moment.
- Email address from which shoppinglists are sent from isn't a business address, Cloudflare email workers not yet configured.
- Comments shown in wrong way due to CSS rules.
- Rating a recipy with half stars and showcasing ratings with closer to half a star would be an improvement. 

## Further development
- Direct messaging between users
- Password change possibility
- CSS styles
- Pub/Sub
- HTTPS/TLS
- Kubernetes load balancing
- Cloudflare email workers to send email from @receptifyonline.com
- Own structure to storing recipy pictures
- Redis cache
- Google artifact registry instead of Docker hub for images
- Better unit testing for frontend
- Shoppinglist via SMS or WhatsApp
