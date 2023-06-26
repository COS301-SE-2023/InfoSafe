describe('Login', () => {
  it('Logs in successfully with valid credentials', () => {
    const email = 'alistairmikeross@gmail.com';
    const password = '1234';

    cy.visit('http://localhost:3000');
    cy.get('input[data-testid="userIn"]').should('exist');
    cy.get('input[data-testid="passIn"]').should('exist');


    cy.get('input[data-testid="userIn"]').type(email);

    cy.wait(3000)


    cy.get('input[data-testid="passIn"]').type(password);

    cy.get('button[data-testid="btnTest"]').click();


    Cypress.on('window:before:load', (win) => {
      cy.spy(win.console, 'error');
    });
      cy.window().then((win) => {
        expect(win.console.error).to.have.callCount(0);
    });
    cy.url().should('include', '/home');
  });

  it('Displays an error message with invalid credentials', () => {
    const email = 'invalid@example.com';
    const password = 'incorrect';

    cy.visit('http://localhost:3000');


    cy.get('input[data-testid="userIn"]').should('exist');
    cy.get('input[data-testid="passIn"]').should('exist');
    cy.get('input[data-testid="userIn"]').type(email);
    cy.wait(3000)
    cy.get('input[data-testid="passIn"]').type(password);

    cy.get('button[data-testid="btnTest"]').click();

    cy.url().should('eq', "http://localhost:3000/");
});
});
