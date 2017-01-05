/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'testaria',
    environment: environment,
    // firebase: 'https://blazing-inferno-2549.firebaseio.com/',
    firebase: '',
    torii: {
      sessionServiceName: 'session'
    },
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    intl: {
      baseLocale: 'en-us' // default build-time locale
    },
    moment: {
     // To cherry-pick specific locale support into your application.
     // Full list of locales: https://github.com/moment/moment/tree/2.10.3/locale
     includeLocales: ['en-us', 'pt-BR']
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      dateSeparator:     '/',
      dateFormat:        'dd/mm/yyyy',
      decimalSeparator:  '.',
      thousandSeparator: ',',
      language:          'pt-BR',
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
