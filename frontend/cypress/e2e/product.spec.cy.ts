import {
  generateRandomNumber,
  generateRandomPhoneNumber,
  generateRandomString,
} from '../helpers';

describe('Product Flow', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('hello@gmail.com');
    cy.get('#password').type('hello12');
    cy.get('#sign-in').click();
    cy.url().should('include', '/dashboard');
    cy.visit('http://localhost:3000/products');
  });
  it('Product', async () => {
    /* Create Product */
    const name = generateRandomString(8);
    const newName = generateRandomString(8);
    const sku = generateRandomString(6);
    const gst = generateRandomNumber(2);
    const price = generateRandomNumber(2);
    const hsn = generateRandomNumber(2);
    const stock = generateRandomNumber(3);
    cy.get('.MuiButtonBase-root').click();
    cy.get('#name').click().type(name);
    cy.get('#sku').click().type(sku);
    cy.get('#gst').click().type(gst);
    cy.get('#price').click().type(price);
    cy.get('#hsn').click().type(hsn);
    cy.get('#stock').click().type(stock);
    cy.get('.MuiButton-outlinedPrimary').click();
    cy.get('#product-table').should('contain', name);
    cy.get('#product-table').should('contain', sku);
    cy.get('#product-table').should('contain', gst);
    cy.get('#product-table').should('contain', price);
    cy.get('#product-table').should('contain', hsn);
    cy.get('#product-table').should('contain', stock);
    /* Edit Product */
    cy.get('#edit-product').click();
    cy.get('#name').click().type(newName);
    cy.get('.MuiButton-outlinedPrimary').click();
    cy.get('#product-table').should('contain', newName);
    /* Delete Product */
    cy.get('#delete-product').click();
    cy.get('#product-table').should('not.contain', newName);
    cy.get('#product-table').should('not.contain', sku);
    cy.get('#product-table').should('not.contain', gst);
    cy.get('#product-table').should('not.contain', price);
    cy.get('#product-table').should('not.contain', hsn);
    cy.get('#product-table').should('not.contain', stock);
  });
});