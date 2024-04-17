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

Cypress.Commands.add('createRecipy', () => {
    cy.get('a[href="/recipes/new"]').click();
    cy.get('input[name="title"]').type('test-title');
    cy.get('input[name="cookingTime"]').type('01:00');
    cy.get('input[name="ingredient"]').type('test-ingredient');
    cy.get('input[name="amount"]').type('1');
    cy.get('select[name="unit"]').select('g');
    cy.get('.ingredient-inputs>button').click();
    cy.get('textarea[name="description"]').type('test-description');
    cy.get('textarea[name="instructions"]').type('test-instructions');
    cy.get('input[name="category"]').type('test-category');
    cy.get('button[name="addCategory"]').click();
    cy.get('button[type="submit"]').click();
})

Cypress.Commands.add('createAnotherUserWithRecipy', () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:5173')
    cy.get('a[href="/signup"]').click();
    cy.get('input[name="username"]').type('test-user2');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="password2"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.get('a[href="/recipes/new"]').click();
    cy.get('input[name="title"]').type('test-title2');
    cy.get('input[name="cookingTime"]').type('01:00');
    cy.get('input[name="ingredient"]').type('test-ingredient');
    cy.get('input[name="amount"]').type('1');
    cy.get('select[name="unit"]').select('g');
    cy.get('.ingredient-inputs>button').click();
    cy.get('textarea[name="description"]').type('test-description');
    cy.get('textarea[name="instructions"]').type('test-instructions');
    cy.get('input[name="category"]').type('test-category');
    cy.get('button[name="addCategory"]').click();
    cy.get('button[type="submit"]').click();
    cy.contains('test-title')
    cy.get('a[href="/logout"]').click();
    })
  