const sendurl = "http://infosafe.live/";
const useremail = "alistairmikeross@gmail.com";
const userpassword = "1234";

describe("Visits the backend", () => {
  it("returns 403 Forbidden", () => {
    cy.request({
      url: "https://infosafe.live/",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
    });
  });
});
describe("Login", () => {
  it("Logs in successfully with valid credentials", () => {

    cy.visit(sendurl);
    cy.get("input[data-testid=\"userIn\"]").should("exist");
    cy.get("input[data-testid=\"passIn\"]").should("exist");


    cy.get("input[data-testid=\"userIn\"]").type(useremail);

    cy.wait(3000)

    cy.get("input[data-testid=\"passIn\"]").type(userpassword);

    cy.get("button[data-testid=\"btnTest\"]").click();


    Cypress.on("window:before:load", (win) => {
      cy.spy(win.console, "error");
    });
      cy.window().then((win) => {
        expect(win.console.error).to.have.callCount(0);
    });
    cy.url().should("include", "/home");
  });

  it("Displays an error message with invalid credentials", () => {
    const emailError = "invalid@example.com";
    const passwordError = "incorrect";

    cy.visit(sendurl);

    cy.get("input[data-testid=\"userIn\"]").should("exist");
    cy.get("input[data-testid=\"passIn\"]").should("exist");
    cy.get("input[data-testid=\"userIn\"]").type(emailError);
    cy.wait(3000)
    cy.get("input[data-testid=\"passIn\"]").type(passwordError);

    cy.get("button[data-testid=\"btnTest\"]").click();

    cy.url().should("eq", sendurl);
});
});

describe("It Navigates to users tab", () => {
    it("Logs in and goes to tab", () => {
        cy.visit(sendurl);
        cy.get("input[data-testid=\"userIn\"]").should("exist");
        cy.get("input[data-testid=\"passIn\"]").should("exist");

        cy.get("input[data-testid=\"userIn\"]").type(useremail);

        cy.wait(1000)

        cy.get("input[data-testid=\"passIn\"]").type(userpassword);
        cy.get('[data-testid="btnTest"]').click();
        cy.wait(3000)

        cy.get('[data-testid=\"btnMenuTest\"]').should("exist");
        cy.get('[data-testid=\"btnMenuTest\"]').click();
        cy.wait(2000)

        cy.contains("Users").click();

        cy.contains("Users").click();
        // const firstname3 = "cyp";
        // const lastname3 = "test";
        // const email = "cyptest@gmail.com"
        //
        // cy.get("button[data-testid=\"CreateUserButton\"]").should("exist");
        // cy.get("button[data-testid=\"CreateUserButton\"]").click();
        //
        // cy.wait(12000);
        //
        // cy.get("input[data-testid=\"nameInput\"]").should("exist");
        // cy.get("input[data-testid=\"surnameInput\"]").should("exist");
        // cy.get("input[data-testid=\"emailInput\"]").should("exist");
        // cy.get("button[data-testid=\"createuser_finish\" ]").should("exist");
        // cy.contains('Select...').should("exist");
        //
        // cy.get("input[data-testid=\"nameInput\"]").type(firstname3);
        // cy.get("input[data-testid=\"surnameInput\"]").type(lastname3);
        // cy.get("input[data-testid=\"emailInput\"]").type(email);
        // cy.contains('Select...').invoke('show').click();
        // cy.contains('Employee').click();
        //
        // cy.get("button[data-testid=\"createuser_finish\" ]").click();
        //
        // cy.wait(10000);
        // cy.get('li').should('be.visible');
        // cy.contains('li', 'cyp test')
        //     .within(() => {
        //         cy.get('[data-testid="deleteUser"]').click();
        //     });
        //
        // cy.get('.deleteTitle').should('be.visible');
        // cy.get('.deleteMessage').should('be.visible');
        //
        // cy.get('[data-testid="confirmDelete"]').click();
        // cy.wait(300);

    });
});

describe("It Navigates to dataScopes tab", () => {
    it("Creates a datascope", () => {

        cy.visit(sendurl);
        cy.get("input[data-testid=\"userIn\"]").should("exist");
        cy.get("input[data-testid=\"passIn\"]").should("exist");


        cy.get("input[data-testid=\"userIn\"]").type(useremail);

        cy.wait(1000)

        cy.get("input[data-testid=\"passIn\"]").type(userpassword);

        cy.get('[data-testid="btnTest"]').click();
        cy.wait(3000)
        cy.contains("Data Scopes").click();
        cy.wait(1000);

        // cy.get("button[data-testid=\"dataScopeMake\"]").should("exist");
        // cy.get("button[data-testid=\"dataScopeMake\"]").click();
        // cy.get("input[data-testid=\"nameInput\"]").should("exist");
        // cy.get("textarea[data-testid=\"Description\"]").should("exist");
        // cy.get("[data-testid=\"roles\"]").should("be.visible");
        // cy.get("input[data-testid=\"addRole\"]").should("exist");
        // cy.get("textarea[data-testid=\"addRoleDescription\" ]").should("exist");
        // cy.get("button[data-testid=\"addRoleButton\"]").should("exist");
        // cy.get("button[data-testid=\"addDataScope\"]").should("exist");
        //
        // cy.get("input[data-testid=\"nameInput\"]").type("datascope1");
        // cy.get("textarea[data-testid=\"Description\"]").type("Cool datascope");
        // cy.get("[data-testid=\"roles\"]").type("be.visible");
        // cy.get("input[data-testid=\"addRole\"]").type("Admin");
        // cy.get("textarea[data-testid=\"addRoleDescription\" ]").type("admins are cool");
        // cy.get("button[data-testid=\"addRoleButton\"]").click();
        // cy.get("button[data-testid=\"addDataScope\"]").click();
    });
});
