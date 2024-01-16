# Requirements of the app

## Features
- [x] Users can sign in
- [x] Users can log in
- [x] Users can post recipies
- [ ] User sees clear error and success notifications upon actions
- [ ] User can update and delete their own recipies
- [ ] Users can view recipies in a scrollable list
    - [x] Recipy view
    - [ ] Paginated scrolling
    - [x] User can view own recipies in a list
- [ ] User can search for recipies
    - [ ] Filtering recipies by user
    - [ ] Filtering recipies by categories
    - [ ] Filtering recipies by incredients
    - [ ] Filtering recipies by title
    - [ ] Filtering recipies by cooking time¨
    - [ ] Recipy sorting newest -> oldest and vice versa plus other sort orders
- [ ] User can type in specific incredients and find recipies which match those (even partially)
- [ ] User can compose a shopping list out of selected recipies
    - [ ] User can select to multiply chosen recipies incredient amounts on shopping list
    - [ ] Shopping list can be printed or sent to email
    - [ ] Certain incredients are optional on the shopping list, e.g spices
    - [ ] User can add miscellaneous items to list
- [ ] The app has privileged users, e.g maintenance which can delete posts, comments and users
- [ ] Users can comment on recipies
- [ ] Users can rate each others recipies (1-5 rating)
- [ ] Users can like recipies and add them as favorites
- [ ] User can follow other users recipy posts

## Technical requirements
- Token based authentication for requests
- Token validation expiry within certain amount of time
- The app frontend is made with React
- The backend is an Express server with PostgreSQL database
- The app has a Redis cache and Redis pub/sub
- The api is REST
- The frontend state handling is done with Redux
- The application development database is set with Docker
- The app has a CICD pipeline with Github Actions
- The app has unit testing with Jest and end to end testing with Cypress
- The application is hosted in ???
- Docker containers in deployment???
- Other aspects???

## Architechture
- TBA