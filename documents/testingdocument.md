# Testing document

## Unit testing
- Unit testing is done with Jest in backend and Vitest in frontend. 

## End to end testing
- End to end testing is done with Cypress

## Integration testing
- Integration testing is executed with Github Actions to ensure a working build is served to deployment. 

- Frontend integration testing is done with Vitest and MSW (Mock service worker). Redux store has a test configuration wrapper in util/test-utils.jsx which is used to render components which use Redux state. Mock service worker is used to intercept requests to the backend and respond accordingly. Redux is treated as an implementation detail and only Redux state is checked in tests to see if frontend services make correct calls to update state. 

