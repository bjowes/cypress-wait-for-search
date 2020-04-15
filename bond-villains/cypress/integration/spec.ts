beforeEach(() => {
  cy.visit('http://localhost:4200');
  cy.get('button')
    .contains('Reload from cache')
    .as('reload-cache');
  cy.get('button')
    .contains('Reload 0 ms')
    .as('reload-0');
  cy.get('button')
    .contains('Reload 100 ms')
    .as('reload-100');
  cy.get('button')
    .contains('Reload 1000 ms')
    .as('reload-1000');
  cy.get('button')
    .contains('Background request')
    .as('background-request');
});

describe('wait for spinner', () => {
  function waitForSpinnerToAppearAndDisappear() {
    cy.get('mat-progress-spinner', { timeout: 2000 }).should('exist');
    cy.get('mat-progress-spinner', { timeout: 2000 }).should('not.exist');
  }

  it('is ok for slower requests', () => {
    let start;
    cy.wrap(null).then(() => {
      start = new Date().getTime();
    });

    cy.get('@reload-1000').click();
    waitForSpinnerToAppearAndDisappear();

    cy.get('@reload-100').click();
    waitForSpinnerToAppearAndDisappear();

    cy.wrap(null).then(() => {
      const end = new Date().getTime();
      expect(end - start).to.be.greaterThan(1100);
    });
  });

  it('breaks on fast requests', () => {
    cy.get('@reload-0').click();
    waitForSpinnerToAppearAndDisappear();
  });
});

describe('wait for http request', () => {
  beforeEach(() => {
    cy.server();
    cy.route({ method: 'GET', url: '/api/get/*' }).as('getVillains');
  });

  function waitForHttpRequestToComplete() {
    cy.wait('@getVillains', { timeout: 2000 });
  }

  it('ok for slow and fast requests', () => {
    let start;
    cy.wrap(null).then(() => {
      start = new Date().getTime();
    });

    cy.get('@reload-1000').click();
    waitForHttpRequestToComplete();

    cy.get('@reload-100').click();
    waitForHttpRequestToComplete();

    cy.get('@reload-0').click();
    waitForHttpRequestToComplete();

    cy.wrap(null).then(() => {
      const end = new Date().getTime();
      expect(end - start).to.be.greaterThan(1100);
    });
  });

  it('breaks (continues too early) on unknown background requests', () => {
    let start;
    cy.wrap(null).then(() => {
      start = new Date().getTime();
    });
    cy.get('@background-request').click();
    cy.get('@background-request').click();
    cy.get('@reload-1000').click();
    waitForHttpRequestToComplete();

    cy.get('@reload-1000').click();
    waitForHttpRequestToComplete();
    cy.wrap(null).then(() => {
      const end = new Date().getTime();
      expect(end - start).to.be.greaterThan(2000);
    });
  });

  it('breaks on cached requests', () => {
    cy.get('@reload-cache').click();
    waitForHttpRequestToComplete();
  });
});

describe('wait for timestamp', () => {
  function waitForLoadTimestamp() {
    cy.get('app-villain-list table').should(t => {
      const start = t.attr('loadStart');
      expect(+start).to.be.lessThan(new Date().getTime());
    });
    cy.get('app-villain-list table').should(t => {
      const load = t.attr('loadComplete');
      expect(+load).to.be.lessThan(new Date().getTime());
    });
  }

  it('ok for slow and fast requests', () => {
    let start;
    cy.wrap(null).then(() => {
      start = new Date().getTime();
    });

    cy.get('@reload-1000').click();
    waitForLoadTimestamp();

    cy.get('@reload-100').click();
    waitForLoadTimestamp();

    cy.get('@reload-0').click();
    waitForLoadTimestamp();

    cy.wrap(null).then(() => {
      const end = new Date().getTime();
      expect(end - start).to.be.greaterThan(1100);
    });
  });

  it('ok for cached requests', () => {
    cy.get('@reload-cache').click();
    waitForLoadTimestamp();
  });

  it('ok for unknown background requests', () => {
    let start;
    cy.wrap(null).then(() => {
      start = new Date().getTime();
    });
    cy.get('@background-request').click();
    cy.get('@background-request').click();
    cy.get('@reload-1000').click();
    waitForLoadTimestamp();

    cy.get('@reload-1000').click();
    waitForLoadTimestamp();
    cy.wrap(null).then(() => {
      const end = new Date().getTime();
      expect(end - start).to.be.greaterThan(2000);
    });
  });
});
