[![Testing pipeline](https://github.com/JuhoSiitonen/Receptify/actions/workflows/test-pipeline.yml/badge.svg)](https://github.com/JuhoSiitonen/Receptify/actions/workflows/test-pipeline.yml)
[![Publish Docker images](https://github.com/JuhoSiitonen/Receptify/actions/workflows/docker-pipeline.yml/badge.svg)](https://github.com/JuhoSiitonen/Receptify/actions/workflows/docker-pipeline.yml)

# Receptify
Repository for Fullstackopen course project. 

## Inspiration
To have an app for seeking recipies to cook by inputting available ingredients. App also has light social media like features like following, commenting or rating other users and their recipies.

## Technical aspects
The app is a React app with Redux state management with Axios library for servicing requests to backend. Image handling in the frontend is done Uploadcare React widget. In the backend requests are handled with an Express server with Sequelize PostgreSQL database reached with a REST API. User sessions are handled with Redis Express sessions in the backend. The app has a CICD pipeline using Github Actions and is hosted via Google Kubernetes engine as a Kubernetes cluster. The page has a domain by Cloudflare in receptifyonline.com (www.receptifyonline.com). Testing is done with Jest on a unit level and Cypress for end to end testing. Tests are run in the CICD github actions pipeline with Docker Compose for all the elements (frontend, backend, Redis and Postgresql). The app uses a reverse proxy NGINX to handle traffic within the cluster. The frontend and backend of the app are load balanced within the cluster and all the pods in the cluster have one replica. 


## Documentation
- [Requirements](https://github.com/JuhoSiitonen/Receptify/blob/main/documents/requirements.md)
- [Testing documentation](https://github.com/JuhoSiitonen/Receptify/blob/main/documents/testingdocument.md)
- [Changelog](https://github.com/JuhoSiitonen/Receptify/blob/main/documents/changelog.md)
- [Working hours](https://github.com/JuhoSiitonen/Receptify/blob/main/documents/workinghours.md)
- [User instructions](https://github.com/JuhoSiitonen/Receptify/blob/main/documents/userinstructions.md)
