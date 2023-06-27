
describe('UserCreation', () => {
  it('Creates a new user', () => {
    const firstname = 'Bob';
    const lastname = 'Man';
    const email = 'bobman@gmail.com'
    const password = '123';
    cy.visit('http://localhost:3000/home');

    cy.get('button[data-testid="CreateUserButton"]').should('exist');
    cy.get('button[data-testid="CreateUserButton"]').click();

    cy.wait(1000);
    
    cy.get('input[data-testid="nameInput"]').should('exist');
    cy.get('input[data-testid="surnameInput"]').should('exist');
    cy.get('input[data-testid="emailInput"]').should('exist');
    cy.get('input[data-testid="passwordInput"]').should('exist');
    cy.get('button[data-testid="createuser_finish" ]').should('exist');

    cy.get('input[data-testid="nameInput"]').type(firstname);
    cy.get('input[data-testid="surnameInput"]').type(lastname);
    cy.get('input[data-testid="emailInput"]').type(email);
    cy.get('input[data-testid="passwordInput"]').type(password);

    cy.get('button[data-testid="createuser_finish" ]').click();

    cy.window().then((win) => {
      const consoleErrors = win.console.error;
      expect(consoleErrors).to.have.length(0);
  });
  });

  it('Doesnt make a new user', () => {
    const firstname = 'Bob';
    const lastname = 'Man';
    const password = '123';
    cy.visit('http://localhost:3000/home');

    cy.get('button[data-testid="CreateUserButton"]').should('exist');
    cy.get('button[data-testid="CreateUserButton"]').click();

    cy.wait(1000);
    
    cy.get('input[data-testid="nameInput"]').should('exist');
    cy.get('input[data-testid="surnameInput"]').should('exist');
    cy.get('input[data-testid="emailInput"]').should('exist');
    cy.get('input[data-testid="passwordInput"]').should('exist');
    cy.get('button[data-testid="createuser_finish" ]').should('exist');

    cy.get('input[data-testid="nameInput"]').type(firstname);
    cy.get('input[data-testid="surnameInput"]').type(lastname);
    cy.get('input[data-testid="passwordInput"]').type(password);

    cy.get('button[data-testid="createuser_finish" ]').click();

    cy.on('window:console', (consoleMessage) => {
      const errorMessages = consoleMessage.console.error;
      const has403Error = errorMessages.some((error) => error.includes('403'));
      expect(has403Error).to.be.true;
    });
});
});
