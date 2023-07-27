describe("Visits the backend", () => {
  it("returns 403 Forbidden", () => {
    cy.request({
      url: "http://localhost:8080/",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
    });
  });
});