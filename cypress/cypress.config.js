const { pa11y, prepareAudit } = require('@cypress-audit/pa11y');

module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000', // this is your app
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        pa11y: pa11y(),
      });
    },
  },
};
