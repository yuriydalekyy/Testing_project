describe("Test on new add page", () => {
  it("Elements", (done) => {
    cy.server();
    cy.visit("https://auto.ria.com/demo/add_auto.html");
    cy.get('.characteristics').as('characteristics')
        .then((characteristics) => {
          expect(characteristics).to.be.visible;
          cy.get('@characteristics').find('[name="categories.main.id"]').should('visible');
          cy.get('@characteristics').find('[name="brand.id"]').should('visible');
          cy.get('@characteristics').find('[name="model.id"]').should('visible');
          cy.get('@characteristics').find('[name="year"]').should('visible');
          cy.get('@characteristics').find('[name="modification"]').should('visible');
          cy.get('@characteristics').find('[name="body.id"]').should('visible');
          cy.get('@characteristics').find('[name="mileage"]').should('visible');
          cy.get('@characteristics').find('[name="region.id"]').should('visible');
          cy.get('@characteristics').find('#agree').should('not.visible');
          cy.get('@characteristics').find('[name="VIN"]').should('visible');
          cy.get('@characteristics').find('[name="city.id"]').should('visible');



        })
  })
})