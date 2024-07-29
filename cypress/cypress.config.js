require('@cypress-audit/pa11y/commands');

const { defineConfig } = require('cypress');

// this package has a typescript bug and must remain a JS file.
// see: https://github.com/mfrachet/cypress-audit/issues/230
const { pa11y, prepareAudit } = require('@cypress-audit/pa11y');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // this is your app
    setupNodeEvents(on) {
      on('before:browser:launch', (_, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        pa11y: pa11y(),
      });
    },
  },
});
