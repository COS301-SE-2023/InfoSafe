describe('The Login Page', () => {
  beforeEach(() => {
    cy.exec('npm start')
    cy.request('POST', 'api/auth/Login', {username: 'alistairmikeross@gmail.com'})
    .its('body')
    .as('currentuser')
  })
})