import { generateRandomPhoneNumber, generateRandomString } from '../helpers';

describe('customer', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('hello@gmail.com');
    cy.get('#password').type('hello12');
    cy.get('#sign-in').click();
    cy.url().should('include', '/dashboard');
    cy.visit('http://localhost:3000/customers');
  });
  it('Customer', async () => {
    /* Create Customer */
    const name = generateRandomString(6);
    const email = generateRandomString(6) + '@gmail.com';
    const newName = generateRandomString(8);
    const shopName = generateRandomString(12);
    const phone = generateRandomPhoneNumber();
    cy.get('.MuiButtonBase-root').click();
    cy.get('#name').click().type(name);
    cy.get('#shopName').click().type(shopName);
    cy.get('#email').click().type(email);
    cy.get('#gstin').click().type('27AAPFU0939F1ZV');
    cy.get('#phone').click().type(phone);
    cy.get('.MuiButton-outlinedPrimary').click();
    cy.get('#customer-table').should('contain', name);
    cy.get('#customer-table').should('contain', shopName);
    cy.get('#customer-table').should('contain', phone);
    /* Edit Customer */
    cy.get('#edit-customer').click();
    cy.get('#name').click().type(newName);
    cy.get('.MuiButton-outlinedPrimary').click();
    cy.get('#customer-table').should('contain', newName);
    /* Delete Customer */
    // cy.get('#delete-customer').click();
    // cy.get('#customer-table').should('not.contain', newName);
    // cy.get('#customer-table').should('not.contain', shopName);
    // cy.get('#customer-table').should('not.contain', phone);
  });
});
