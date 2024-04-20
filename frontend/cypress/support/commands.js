// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUserAndLogin', function(username, password) {
    cy.visit('http://localhost:5173')
    let user = {
        username,
        password
      }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.get('a[href="/login"]').click();
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
})


Cypress.Commands.add('signupLoginCreateRecipyLogout', function({ username, password, recipyTitle }) {
    let sessionCookie;
    let userId;
    let user = {
      username,
      password
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.wait(400)
      
    cy.request('POST', 'http://localhost:3001/api/login', user)
      .then( res => {
        const rawCookies = res.headers['set-cookie'];
        sessionCookie = rawCookies.map(cookie => cookie.split(';')[0]).join(';');
        userId = res.body.id;
      })

    cy.wait(400)

    let recipy = {
      title: recipyTitle,
      cookingTime: '01:00',
      ingredients: [{name: 'test-ingredient', amount: 1, unit: 'g'}],
      description: 'test-description',
      instructions: 'test-instructions',
      categories: [{name: 'test-category'}],
      visible: true,
      userId: userId,
      pictureUuid: '',
      averageRating: 0
    }

    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/recipies',
      body: recipy,
      headers: {
        Cookie: sessionCookie
      }
    })

    cy.wait(400)

    cy.request('POST', 'http://localhost:3001/api/users/logout')

    cy.wait(400)
})


Cypress.Commands.add('login', function(username, password) {
    cy.visit('http://localhost:5173')
    cy.get('a[href="/login"]').click();
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(300)
})