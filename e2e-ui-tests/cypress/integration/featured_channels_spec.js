describe("Featured channels", () => {
  it("should allow adding channels", () => {
    cy.visit("http://localhost:8080");

    cy.contains("FEATURED CHANNELS")
      .parent()
      .find('[type="button"]')
      .first()
      .click();
  
    cy.get('[data-test-id="stream-platform"]')
      .find("input")
      .type("Twitch", {force:true})

    cy.get('#channel-name')
      .type("christopherodd");

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