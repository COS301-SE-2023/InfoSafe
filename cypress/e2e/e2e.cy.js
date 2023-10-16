const sendurl = "http://localhost:8080/";
const useremail = "ali@gmail.com";
const  userpassword = "1234";

describe("Visits the backend", () => {
  it("returns 403 Forbidden", () => {
    cy.request({
      url: "http://localhost:8080:8080/",
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
    cy.contains("Users").click();

    const firstname1 = "Bob";
    const lastname2 = "Man";

    cy.get("button[data-testid=\"CreateUserButton\"]").should("exist");
    cy.get("button[data-testid=\"CreateUserButton\"]").click();

    cy.wait(1000);

    cy.get("input[data-testid=\"nameInput\"]").should("exist");
    cy.get("input[data-testid=\"surnameInput\"]").should("exist");
    cy.get("input[data-testid=\"emailInput\"]").should("exist");
    cy.get("button[data-testid=\"backArrow\"]").should("exist");
    cy.get("button[data-testid=\"createuser_finish\" ]").should("exist");

    cy.get("input[data-testid=\"nameInput\"]").type(firstname1);
    cy.get("input[data-testid=\"surnameInput\"]").type(lastname2);

    cy.get("button[data-testid=\"createuser_finish\" ]").click();
    cy.get("button[data-testid=\"backArrow\"]").click();

    cy.on("window:console", (consoleMessage) => {
      const errorMessages = consoleMessage.console.error;
      const has403Error = errorMessages.some((error) => error.includes("403"));
      expect(has403Error).to.be.true;
    });
      cy.contains("Users").click();
      const firstname3 = "ali";
      const lastname3 = "Ross";
      const email = "ali@gmail.com"

      cy.get("button[data-testid=\"CreateUserButton\"]").should("exist");
      cy.get("button[data-testid=\"CreateUserButton\"]").click();

      cy.wait(1000);

      cy.get("input[data-testid=\"nameInput\"]").should("exist");
      cy.get("input[data-testid=\"surnameInput\"]").should("exist");
      cy.get("input[data-testid=\"emailInput\"]").should("exist");
      cy.get("button[data-testid=\"backArrow\"]").should("exist");
      cy.get("button[data-testid=\"createuser_finish\" ]").should("exist");

      cy.get("input[data-testid=\"nameInput\"]").type(firstname3);
      cy.get("input[data-testid=\"surnameInput\"]").type(lastname3);
      cy.get("input[data-testid=\"emailInput\"]").type(email);

      cy.get("button[data-testid=\"createuser_finish\" ]").click();
      cy.get("button[data-testid=\"backArrow\"]").click();
      cy.on("window:console", (consoleMessage) => {
        const consoleMessages = consoleMessage.console.messages;

        const hasUserExistsMessage = consoleMessages.some((message) =>
            message.includes("User already exists")
        );
      });
      cy.wait(300);
      cy.contains("Users").click();
      cy.wait(300);
        cy.get("[data-testid='editButton']").first().should("be.visible").click();

        cy.get("[data-testid='editUserPopup']").should("be.visible");

        cy.get("input[data-testid='firstNameEdit']").should("exist").then(($input) => {
          const currentValue = $input.val();
          if (currentValue === "Alistair") {
            cy.get("input[data-testid='firstNameEdit']").clear().type("Bob");
          } else {
            cy.get("input[data-testid='firstNameEdit']").clear().type("Alistair");
          }
        });
        cy.get("button[data-testid='finish']").should("be.visible").click();
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

    cy.get("button[data-testid=\"dataScopeMake\"]").should("exist");
    cy.get("button[data-testid=\"dataScopeMake\"]").click();
    cy.get("input[data-testid=\"nameInput\"]").should("exist");
    cy.get("textarea[data-testid=\"Description\"]").should("exist");
    cy.get("[data-testid=\"roles\"]").should("be.visible");
    cy.get("input[data-testid=\"addRole\"]").should("exist");
    cy.get("textarea[data-testid=\"addRoleDescription\" ]").should("exist");
    cy.get("button[data-testid=\"addRoleButton\"]").should("exist");
    cy.get("button[data-testid=\"addDataScope\"]").should("exist");

    cy.get("input[data-testid=\"nameInput\"]").type("datascope1");
    cy.get("textarea[data-testid=\"Description\"]").type("Cool datascope");
    cy.get("[data-testid=\"roles\"]").type("be.visible");
    cy.get("input[data-testid=\"addRole\"]").type("Admin");
    cy.get("textarea[data-testid=\"addRoleDescription\" ]").type("admins are cool");
    cy.get("button[data-testid=\"addRoleButton\"]").click();
    cy.get("button[data-testid=\"addDataScope\"]").click();
  });
});
