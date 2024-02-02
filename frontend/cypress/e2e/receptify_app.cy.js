describe('Receptify', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
  })
  it('frontpage opens', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Receptify')
    })
  it('sign up form opens', () => {
    cy.visit('http://localhost:5173')
    cy.get('a[href="/signup"]').click();
    cy.contains('Sign up')
    cy.get('input[name="username"]').type('test-user');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="password2"]').type('password');
    cy.get('input[type="submit"]').click();
    cy.contains('Welcome to Receptify!')
  })
})