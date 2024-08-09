describe("docs", () => {
  it("Docs load", () => {
    cy.visit("https://stage.flows.sh/docs");
    cy.get("h1").contains("Flows documentation");
  });
});
