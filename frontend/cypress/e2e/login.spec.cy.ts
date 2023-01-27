describe('login spec', () => {
  it('login', async () => {
    cy.visit('http://localhost:3001/login');
    cy.get('#email').type('hello@gmail.com');
    cy.get('#password').type('hello12');
    cy.get('#sign-in').click();
    cy.url().should('include', '/dashboard');
  });
});
