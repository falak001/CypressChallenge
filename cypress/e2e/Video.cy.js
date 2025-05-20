describe('Video playback', () => {
    it('Open first item in recently added and Check if video is playing', () => {
        cy.login();
        cy.get('body', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="sidebar"]').should('be.visible');
        cy.wait(300);
        cy.scrollTo('bottom');
        cy.contains('RECENTLY ADDED', {timeout:20000}).scrollIntoView().should('be.visible');
        cy.contains('RECENTLY ADDED')
            .parents('.carousel-title')
            .nextAll('.relative.w-full.group').first()
            .find('.carousel__container .tile.cursor-pointer.default').first()
            .click();
        cy.url().should('include', 'RECENTLYADDED');
        cy.get('h1, .video-title').should('exist');
        cy.contains('RECENTLY ADDED').should('exist');
        cy.get('video', { timeout: 10000 })
            .should('be.visible')
            .should($video => {
                expect($video[0].readyState).to.be.greaterThan(1);
            })
            .then($video => {
                const initialTime = $video[0].currentTime;
                cy.wait(1000).then(() => {
                    cy.get('video').then($clip => {
                        expect($clip[0].currentTime).to.be.greaterThan(initialTime);
                    });
                });
            });
    });
});