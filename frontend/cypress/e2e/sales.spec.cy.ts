import { generateRandomNumber} from '../helpers';
describe('sales', ()=>{
    before(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('#email').type('hello@gmail.com');
        cy.get('#password').type('hello12');
        cy.get('#sign-in').click();
        cy.url().should('include', '/dashboard');
        cy.visit('http://localhost:3000/sales-orders');
      });
    it('Sales', async() => {
        //Create a Sales Order
        // const amt = generateRandomNumber(1);
        cy.get('.MuiButtonBase-root').click();
        cy.get('#demo-select-small2')
            .click()
            .get('.MuiList-root > [tabindex="0"]')
            .click();
        cy.get('.css-mmtzvg > .MuiButtonBase-root').click();
        cy.get('.css-mmtzvg > .MuiBox-root > :nth-child(1) > .MuiInputBase-root > #demo-select-small2')
            .click()
            .get('.MuiList-root > [tabindex="-1"]')
            .click();
        cy.get(':nth-child(2) > .MuiInputBase-root > #demo-select-small2')
            .click()
            .get('[data-value="7"]')
            .click();
        cy.get('.MuiButton-outlinedPrimary').click();
        //Verifying the details within the table
        //cy.get('#salesOrder-table').should('contain', )

    });
});