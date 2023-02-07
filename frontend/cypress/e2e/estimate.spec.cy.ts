import { generateRandomPhoneNumber, generateRandomString } from '../helpers';

describe('estimate', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('hello@gmail.com');
    cy.get('#password').type('hello12');
    cy.get('#sign-in').click();
    cy.url().should('include', '/dashboard');
    cy.visit('http://localhost:3000/estimates');
  });
  it('Estimate', async () => {
    /* Create Estimate */
    cy.get('.MuiButtonBase-root').click();
    cy.get('#demo-select-small2')
      .parent()
      .click()
      .get('ul > li[data-value="63d7730f9679cf0cf9a12615"]')
      .click();
    cy.get('.css-mmtzvg > .MuiButtonBase-root').click();
    cy.get('#product')
      .parent()
      .click()
      .get('ul > li[data-value="63da5922e6f9ca18bfbefa91"]')
      .click();
    cy.get('#amount').parent().click().get('ul > li[data-value="3"]').click();
    cy.get('.MuiButton-outlinedPrimary').click();
    // cy.get('#name').click().type(name);
    // cy.get('#shopName').click().type(shopName);
    // cy.get('#gstin').click().type('27AAPFU0939F1ZV');
    // cy.get('#phone').click().type(phone);
    cy.get('#estimate-table').should('contain', '63d7730f9679cf0cf9a12615');
    // cy.get('#estimate-table').should('contain', shopName);
    // cy.get('#estimate-table').should('contain', phone);
    // /* Edit Estimate */
    // cy.get('#edit-estimate').click();
    // cy.get('#name').click().type(newName);
    // cy.get('.MuiButton-outlinedPrimary').click();
    // cy.get('#estimate-table').should('contain', newName);
    // /* Delete Estimate */
    // cy.get('#delete-estimate').click();
    // cy.get('#estimate-table').should('not.contain', newName);
    // cy.get('#estimate-table').should('not.contain', shopName);
    // cy.get('#estimate-table').should('not.contain', phone);
  });
});
