
describe('Signin and logout', () => {
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
    cy.get('button[type="submit"]').click();
    cy.contains('Welcome to Receptify!')
  })
  it('can logout', ()=> {
    cy.createUserAndLogin('test-user', 'password')
    cy.wait(500)
    cy.contains('Welcome to Receptify!')
    cy.get('a[href="/logout"]').click();
    cy.contains('Login')
  })
})


describe('Adding a recipy', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.wait(300)
    cy.createUserAndLogin('test-user', 'password')
  })
  it('can add recipe', () => {
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
    cy.on('window:confirm', () => true);
    cy.contains('test-title')
  })
  it('can expand recipy and delete', () => {
    cy.createRecipy();
    cy.get('.single-recipe-clickarea').click();
    cy.get('button[name="deleteRecipy"]').click();
    cy.contains('test-title').should('not.exist')
  })
  it('can edit recipy', () => {
    cy.createRecipy();
    cy.get('.single-recipe-clickarea').click();
    cy.get('.user-actions>:nth-child(1)>button').click();
    cy.contains('Update').click()
    cy.get('input[name="title"]').clear().type('edited-title');
    cy.contains('Submit').click()
    cy.get('[href="/recipes"]').click()
    cy.contains('edited-title')
  })
  it('can add to shoppinglist', () => {
    cy.createRecipy();
    cy.get('button[name="shoppinglistbutton"]').click();
    cy.get('a[href="/shoppinglist"]').click();
    cy.contains('test-title')
  })
 it('can see in my recipes', () => {
    cy.createRecipy();
    cy.get('a[href="/mypage"]').click();
    cy.contains('test-title')
  })
})

describe('Multiple recipies', () => {
  beforeEach(function() {
    cy.createAnotherUserWithRecipy();
    cy.wait(300)
    cy.createUserAndLogin('test-user', 'password')
    cy.createRecipy();
  })
  it('can see multiple recipies', () => {
    cy.get('a[href="/recipes"]').click();
    cy.contains('test-title')
    cy.contains('test-2')
  })
  it('can favorite a recipy and filter to see it', () => {
    cy.get('.single-recipe-clickarea').click();
    cy.get(':nth-child(2) > :nth-child(1) > .single-recipe-clickarea').click();
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .user-actions > :nth-child(2) > div > button').click();
    cy.wait(300)
    cy.contains('1 times favorited')
    cy.get('.show-favorites-button').click();
    cy.wait(150)
    cy.contains('test-2')
    cy.contains('test-title').should('not.exist')
  })

})