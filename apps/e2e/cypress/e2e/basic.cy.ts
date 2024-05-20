it("Create flow -> Load SDK -> check the flow starts -> delete flow", () => {
  cy.visit("https://app.stage.flows.sh/login", {
    auth: {
      username: Cypress.env("http_auth_username"),
      password: Cypress.env("http_auth_password"),
    },
  });

  cy.get("input[type='email']").type(" ", { force: true });
  cy.get("input[type='email']").type(Cypress.env("app_email"));
  cy.get("input[type='password']").type(Cypress.env("app_password"));

  cy.get("button[type='submit']").click();
  cy.intercept("/me").as("me");
  cy.wait("@me");

  cy.get("button").contains("Create your first flow").click();
  cy.get("input[name='name']").type("Test");
  cy.get("button[type='submit']").click();

  cy.get("button").contains("Modal").click();

  cy.get("div").contains("Modal").click();
  cy.get("input[name='steps.0.title']").type("Testing title");
  cy.get("textarea[name='steps.0.body']").type("Flows E2E test");

  cy.get("div").contains("Start").click();
  cy.get("input[name='start.0.location']").type("/");
  cy.get("button").contains("Publish changes").click();
  cy.get("button")
    .contains(/^Publish$/)
    .click();
  cy.get("button").contains("Make live").click();

  cy.location("pathname").should("not.include", "/edit");

  cy.url().then((flowUrl) => {
    cy.visit("https://flows.sh");
    cy.document().then((document) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@flows/js/dist/index.global.js";
      script.onload = () => {
        (document.defaultView as any).flows.init({
          projectId: "8db4fedc-c721-4887-9e2f-97875cd805fc",
          customApiUrl: "https://api.stage.flows-cloud.com",
        });
      };
      document.head.appendChild(script);

      cy.get(".flows-modal").should("be.visible");
      cy.get(".flows-title").contains("Testing title");
      cy.get(".flows-body").contains("Flows E2E test");
    });

    cy.visit(flowUrl, {
      auth: {
        username: Cypress.env("http_auth_username"),
        password: Cypress.env("http_auth_password"),
      },
    });

    cy.get("button[role='switch']").click();

    cy.contains("p", "E2E").should("be.visible");

    cy.get("button").last().click();

    cy.contains("div", "Delete").should("be.visible");

    cy.get("div").contains("Delete").click();
    cy.get("button").contains("Delete flow").click();

    cy.get("flow-list-item").should("not.exist");
  });
});
