describe('Check broken links and missing assets', () => {
  beforeEach(() => {
    cy.login();
  });
  it('Verify if there is any broken links on main hub page of victory+', () => {
    const brokenLinks = [];
    cy.get("a:not([href*='mailto:'])").each(($link) => {
      const broken = $link.attr('href');
      if (broken) {
        cy.request(broken).then((response) => {
          if (response.status !== 200) {
            brokenLinks.push(`${broken}`);
            cy.log(`Broken link found: ${broken}`);
          }
        });
      }
    }).then(() => {
      expect(brokenLinks, `Broken links are: ${brokenLinks.join(' ')}`).to.be.empty;
    });
  });

it('Verify if there is any missing assets on main hub page of victory+', () => {
    const missingAssets = [];
    const assets= ['img', 'script', 'link[rel="stylesheet"]'];
    const attrs = [ 'src', 'src', 'href'];
   assets.forEach((selector, i) => {
      cy.get(selector).each(($element) => {
        const url = $element.attr(attrs[i]);
        if (
          url &&
          !url.startsWith('data:') &&
          !url.startsWith('mailto:')
        ) {
          cy.request({url}).then((response) => {
            if (response.status !== 200) {
              missingAssets.push(`${url}`);
              cy.log(`Missing asset found: ${url}`);
            }
          });
        }
      });
    });
    cy.then(() => {
      expect(missingAssets, `Missing assets are: ${missingAssets.join(' ')}`).to.be.empty;
    });
  });
});