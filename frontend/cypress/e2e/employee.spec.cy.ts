import { generateRandomNumber, generateRandomString } from '../helpers';
describe('employee', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('hello@gmail.com');
    cy.get('#password').type('hello12');
    cy.get('#sign-in').click();
    cy.url().should('include', '/dashboard');
    cy.visit('http://localhost:3000/employees');
  });
  it('Employees', async () => {
    //Creating an Employee
    const name = generateRandomString(6);
    const email = generateRandomString(15);
    cy.get('.sc-ftTHYK > .MuiButtonBase-root').click();
    cy.get('#Name').click().type(name);
    cy.get('#demo-select-small2')
      .click()
      .get('.MuiList-root > [tabindex="0"]')
      .click();
    cy.get('#Email').type(email.concat('@gmail.com'));
    cy.get('.MuiButton-outlinedPrimary').click();
    cy.wait(2000);
    cy.get('.PrivateSwitchBase-input').click();
  });
});
