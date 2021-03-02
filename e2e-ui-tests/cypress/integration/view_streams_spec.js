describe("View Streams", () => {
  it("should display a list of streams", () => {
    cy.visit("http://localhost:8080");

    cy.get('[data-test-id="stream-tile"]')
      .should("have.length.at.least", 3)
  })

  it("should open a stream in a new tab when clicked", () => {
    cy.visit("http://localhost:8080");

    cy.get('[data-test-id="stream-tile"]')
      .first()
      .click();
  })

  it("should filter streams by the entered game name", () => {
    cy.visit("http://localhost:8080");

    cy.get('[placeholder="Search"]')
      .type("fortnite{enter}");

    cy.contains("fortnite");
  })
})