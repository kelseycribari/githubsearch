describe("Testing main application page for gitsearch", () => {
  it("test username correct", () => {
    cy.visit("/kelseycribari");
    cy.url().should("contain", "kelseycribari");
    cy.findByTestId("username").should("contain", "kelseycribari");
  });

  it("test secondary username", () => {
    cy.visit("/webpack");
    cy.url().should("contain", "webpack");
    cy.findByTestId("username").should("contain", "webpack");
  });

  it("test correct repository name", () => {
    cy.visit("/kelseycribari");
    cy.findByTestId("reponame-CS410").should("contain", "CS410");
  });

  it("test repo link (github icon) redirects to github repository page", () => {
    cy.visit("/kelseycribari");
    cy.findByTestId("repobutton-CS410").click();
    cy.origin("https://github.com", () => {
      cy.get('[href="/kelseycribari"]').should("be.visible");
      cy.url().should("include", "https://github.com/kelseycribari/CS410");
    });
  });

  it("test repo link (repo name) redirects to github repository page", () => {
    cy.visit("/kelseycribari");
    cy.findByTestId("reponamebutton-CS410").click();
    cy.origin("https://github.com", () => {
      cy.get('[href="/kelseycribari"]').should("be.visible");
      cy.url().should("include", "https://github.com/kelseycribari/CS410");
    });
  });

  it("test user header (github icon) link redirects to github user profile", () => {
    cy.visit("/kelseycribari");
    cy.findByTestId("username").should("contain", "kelseycribari");
    cy.findByTestId("userbutton").click();
    cy.origin("https://github.com", () => {
      cy.url().should("include", "https://github.com/kelseycribari");
    });
  });

  it("test user header (username) link redirects to github user profile", () => {
    cy.visit("/kelseycribari");
    cy.findByTestId("username").should("contain", "kelseycribari");
    cy.findByTestId("usernamebutton").click();
    cy.origin("https://github.com", () => {
      cy.url().should("include", "https://github.com/kelseycribari");
    });
  });

  it("load more button disabled when no next page is available", () => {
    cy.visit("/kelseycribari");
    cy.findByTestId("loadmorebutton").should("be.disabled");
  });

  it("load more button enabled when next page is available", () => {
    cy.visit("/webpack");
    cy.findByTestId("username").should("contain", "webpack");
    cy.findByTestId("loadmorebutton").should("not.be.disabled");
  });

  it("load more button loads more results when next page is available", () => {
    cy.visit("/webpack");
    cy.findByTestId("username").should("contain", "webpack");
    cy.findByTestId("loadmorebutton").click();
    cy.findByTestId("reponame-schema-utils").should("contain", "schema-utils");
  });

  it("display error message when user not found", () => {
    cy.visit("/kelseycribar");
    cy.findByTestId("errortext").should(
      "contain",
      "There are no users available by that name. Please enter a valid user and try again."
    );
  });
});
