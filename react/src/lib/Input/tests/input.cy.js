describe('@momentum-ui/react', function() {
  it('snapshot of input', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/input`)
      .get('.md-input')
      .should('be.visible')
      .percySnapshot();
  });
});
