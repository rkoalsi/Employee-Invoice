import { getProducts } from '../../api/product';
import { generateRandomPhoneNumber, generateRandomString } from '../helpers';
const d = async () => {
  const res = await getProducts;
};
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
    // cy.get('.MuiButtonBase-root').click();
    // cy.get('#demo-select-small2').parent().click();
    // cy.get('.MuiList-root > .MuiButtonBase-root').click();
    // cy.get('.css-mmtzvg > .MuiButtonBase-root').click();
    // cy.get('#product').parent().click();
    // cy.get('.MuiList-root > [tabindex="0"]').click({ multiple: false });
    // cy.get('#amount').parent().click();
    // cy.get('[data-value="3"]').click();
    // cy.get('.MuiButton-outlinedPrimary').click();
    // cy.get('#estimate-table').should('contain', '3');
    /* Update Estimate */
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6)').click();
    cy.get('#product').parent().click();
    cy.get('.MuiList-root > [tabindex="1"]').click({ multiple: false });
    cy.get('#amount').parent().click();
    cy.get('[data-value="7"]').click();
    cy.get('.MuiButton-outlinedPrimary').click();
    cy.get('#estimate-table').should('contain', '7');
  });
});
