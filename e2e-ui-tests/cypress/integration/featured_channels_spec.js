describe("Featured channels", () => {
  it("should allow adding channels", () => {
    cy.visit("http://localhost:8080");

    cy.contains("FEATURED CHANNELS")
      .parent()
      .find('[type="button"]')
      .first()
      .click();

    cy.get('#channel-name')
      .type("christopherodd");

    cy.contains("Streaming platform")
      .parent()
      .find("input")
      .type("Twitch", {force:true})

    cy.contains('Save')
      .parent()
      .click();
  })

  it("should display added channels", () => {
    cy.contains("ChristopherOdd");
  })

  it("should open channel in a channel in a new tab", () => {
    cy.contains("ChristopherOdd")
      .click();
  })
})