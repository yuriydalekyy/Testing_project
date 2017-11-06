const {header} = require("../support/Function/Verstka");
describe("Some tests", function () {
   it('Moto -> BMW -> Kiev', function() {
     cy.server();
     cy.route('**/manager/**').as('manager');
     cy.visit('https://auto.ria.com/autoseller/addpackage/').wait('@manager');

     cy.get('div.auto-seller-benefits').as('diva').then(()=>{
       let dNow= Date.now();
       cy.get('div.auto-seller-benefits').then(()=>{
         console.log(Date.now()-dNow);
       })
     })
 });
});

