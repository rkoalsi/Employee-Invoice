describe('register spec', () => {
  it('registration', async () => {
    cy.visit('http://localhost:3000/register');
    cy.get('#name').type('World Hello2');
    cy.get('#email').type('hello212@gmail.com');
    cy.get('#password').type('hello12');
    cy.get('#organizationId').type('63959159154d611a212daf0f');
    cy.get('#demo-select-small')
      .parent()
      .click()
      .get('ul > li[data-value="employee"]')
      .click();
    cy.get('#register').click();
    cy.url().should('include', '/dashboard');
  });
});
