// /**
//  * Created by yura on 24.10.17.
//  */
// describe('Dispatch on catalog', function() {
//   it('Legkovie', function () {
//     cy.server();
//     cy.route('/api/catego**').as('getCat');
//     cy.route('https://auto.ria.com/leg**').as('leg');
//     cy.visit('https://auto.ria.com').wait('@getCat');
//     cy.get(".button-primary").click();
//     cy.url().should('include', '/legkovie');
//   });
//  it('Legkovie -> Acura', function() {
//  cy.server();
//  cy.route('/api/categories/**/marks/**').as('getMark');
//  cy.visit('https://auto.ria.com');
//  cy.wait('@getMark');
//  cy.get("[for='brandTooltipBrandAutocompleteInput-1']").click();
//  cy.get("[data-text='Acura']").click();
//  cy.get(".button-primary").click();
//  cy.url().should('include', '/legkovie/acura')
//  });
//
//  it('Legkovie -> Acura -> TL', function() {
//  cy.server();
//  cy.route('/api/categories/**/marks/**').as('getMark');
//  cy.route('/api/categories/**/marks/**/models/**').as('getModel')
//  cy.visit('https://auto.ria.com');
//  cy.wait('@getMark');
//  cy.get("[for='brandTooltipBrandAutocompleteInput-1']").click();
//  cy.get("[data-text='Acura']").click();
//  cy.wait('@getModel');
//  cy.get("[for='brandTooltipModelAutocompleteInput-1']").click();
//  cy.get("[data-text='TL']").click();
//  cy.get(".button-primary").click();
//  cy.url().should('include', '/legkovie/acura/tl')
//  });
//
//  it('Acura -> MDX', function() {
//  cy.server();
//  cy.route('/api/catego**').as('getCat');
//  cy.route('/api/marks/**').as('getMark');
//  cy.route('/api/marks/**/models/**').as('getModel')
//  cy.visit('https://auto.ria.com');
//  cy.wait('@getCat');
//  cy.get("#categories").select('0');
//  cy.wait('@getMark');
//  cy.get("[for='brandTooltipBrandAutocompleteInput-1']").click();
//  cy.get("[data-text='Acura']").click();
//  cy.wait('@getModel');
//  cy.get("[for='brandTooltipModelAutocompleteInput-1']").click();
//  cy.get("[data-text='MDX']").click();
//  cy.get(".button-primary").click();
//  cy.url().should('include', '/car/acura/mdx')
//  });
//
//  it('Moto -> BMW -> Kiev', function() {
//  cy.server();
//  cy.route('/api/catego**').as('getCat');
//  cy.route('/api/categories/2/marks/**').as('getMark');
//  cy.route('/api/categories/2/marks/**/models/**').as('getModel');
//  cy.visit('https://auto.ria.com');
//  cy.wait('@getCat');
//  cy.get("#categories").select('2');
//  cy.wait('@getMark');
//  cy.get("[for='brandTooltipBrandAutocompleteInput-1']").click();
//  cy.get("[data-text='BMW']").click();
//  cy.get("#regionCenters").select("10");
//  cy.get(".button-primary").click();
//  cy.url().should('include', '/moto/bmw/state/kiev')
//  });
//
//  });
//
//
