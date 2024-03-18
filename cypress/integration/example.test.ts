describe("List Page", () => {
  before(() => {
    // default azure configuration to use Hub Example KeyVault and complete the login
    cy.loginWithKeyVaultCredentials(Cypress.env("keyvault")); 
    // OR
    // Login with credentials stored in environment variables
    // cy.login(Cypress.env("auth").int); // will work once you update the TODOs on cypress.json

    // Emulate an application host
    cy.addHostInteropHandlers();
  });

  after(() => {
    // Logout after running tests
    cy.logout();

    // Stop emulating host
    cy.removeHostInteropHandlers();
  });

  it("renders", () => {
    cy.visit("/");
  });

  it("shows an alert when clicking the button", () => {
    cy.visit("/");
    cy.get("#PrimaryAction").click();
    cy.get(".ant-alert").should("contain", "You clicked the button!");
  });

  it("links to invidual post pages", () => {
    cy.server();
    cy.route("GET", "https://jsonplaceholder.typicode.com/posts?").as("getPosts");

    cy.visit("/");

    cy.wait("@getPosts", { timeout: 50000 });

    // Click first table link
    cy.get(".ant-table-row-level-0 > .ant-table-cell > a").first().click();

    cy.location("hash").should("eq", "#/1");
    cy.get(".ant-page-header-heading-title").should("contain", "Example Resource 1");
  });
});
