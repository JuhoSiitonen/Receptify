# Requirements of the app

## Features
- [x] Users can sign in
- [x] Users can log in
- [x] Users can post recipies
- [x] User can post pictures of the recipy
    - [ ] User can update said pictures
- [x] User sees clear error and success notifications upon actions
- [x] User can update and delete their own recipies
- [ ] Users can view recipies in a scrollable list
    - [x] Recipy view
    - [ ] Paginated scrolling
    - [x] User can view own recipies in a list
- [ ] User can filter recipies view
    - [x] Filtering recipies by user
    - [x] Filtering recipies by categories
    - [x] Filtering recipies by incredients
    - [x] Filtering recipies by title
    - [ ] Filtering recipies by cooking time
- [ ]  User can sort recipies
    - [ ] Recipy sorting newest -> oldest and vice versa
    - [ ] Average rating best -> worst and vice versa
- [ ] User can type in specific incredients and find recipies which match those (even partially)
- [ ] User can compose a shopping list out of selected recipies
    - [ ] User can select to multiply chosen recipies incredient amounts on shopping list
    - [ ] Shopping list can be printed or sent to email
    - [ ] Certain incredients are optional on the shopping list, e.g spices
    - [ ] User can add miscellaneous items to list
- [ ] The app has privileged users, e.g maintenance which can delete posts, comments and users
- [x] Users can comment on recipies
- [ ] Users can rate each others recipies (1-5 rating)
    - [ ] Only one rating per recipy per user
    - [x] User can't rate own recipies
    - [x] Rating average is shown to all users
    - [x] Rating only for logged in users
- [ ] Users can favorite recipies 
- [ ] User can add recipies as favorites
- [ ] User can subscribe to other users recipy posts
    - [ ] While using the app user can get notifications on new recipies from subscribed users
    - [ ] User can see a list of newest recipies from subscribed users

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
- The app has unit testing with Jest and end to end testing with Cypress
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
