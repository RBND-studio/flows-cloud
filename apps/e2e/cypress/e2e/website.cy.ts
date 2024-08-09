describe("website", () => {
  it("Homepage loads", () => {
    cy.visit("https://stage.flows.sh/");
    cy.get("h1").contains("User onboarding for modern SaaS");
  });
  it("Pricing loads", () => {
    cy.visit("https://stage.flows.sh/pricing");
    cy.get("h1").contains("Pricing");
  });
});
