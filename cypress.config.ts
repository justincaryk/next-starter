import { defineConfig } from 'cypress';

// need to mix import / require. see: https://github.com/mfrachet/cypress-audit/issues/230
const { pa11y, prepareAudit } = require('@cypress-audit/pa11y');
// import { pa11y, prepareAudit } from '@cypress-audit/pa11y';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // this is your app
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {} as Cypress.Browser, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        pa11y: pa11y(),
      });
    },
  },
});
