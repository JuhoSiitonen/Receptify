# Testing document

## Unit testing
- Unit testing is done with Jest. 

## End to end testing
- End to end testing is done with Cypress

## Integration testing
- Integration testing is executed with Github Actions to ensure a working build is served to deployment. 

- Frontend integration testing is done with Jest and MSW (Mock service worker). Redux store has a test configuration wrapper in util/test-utils.jsx which is used to render components which use Redux state. 

