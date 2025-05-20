import './commands'
afterEach(function () {
    if (this.currentTest.state === 'passed') {
      cy.screenshot(`passed-${this.currentTest.title}`);
    }
  });