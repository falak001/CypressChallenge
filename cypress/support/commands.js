Cypress.Commands.add('login', () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visit("https://victoryplus.com");
    cy.get("a[href='/login']").contains("Login").should("be.visible").click();
    cy.url().should("include", "/login");
    cy.get('[data-cy="auth-title"]').should("be.visible");
    cy.get("form").should("be.visible");
    cy.get('[data-cy="field-login-email"]').should("be.visible").clear().type(email);
    cy.get('[data-cy="field-login-password"]').should("be.visible").clear().type(password);
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("equal", "https://victoryplus.com/hub/hub_default?default=true");
    cy.get('[data-cy="hub-page"]').should("be.visible");
    cy.get("body").then(($body) => {
        if ($body.find("#onesignal-slidedown-dialog").length > 0) {
            cy.get("#onesignal-slidedown-cancel-button").contains("Later").click();
        } else {
            cy.log("No subscription dialogue found");
        }
    });
});
