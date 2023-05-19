describe('Testing sample page', () => {
  it('test username correct', () => {
    cy.visit('/kelseycribari')
    cy.url().should('contain', 'kelseycribari')
    cy.findByTestId('username').should('contain', 'kelseycribari')
  })
  it('test secondary username', () => {
    cy.visit('/webpack')
    cy.url().should('contain','webpack')
    cy.findByTestId('username').should('contain', 'webpack')
  })
  it('test correct repository', () => {
    cy.visit('/kelseycribari')
    cy.findByTestId('reponame-CS410').should('contain', 'CS410')
  })
})
