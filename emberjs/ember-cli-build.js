'use strict';
const join = require("path").join;

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const purgeCSS = require('@fullhuman/postcss-purgecss')({
  content: [
    join(__dirname, './app/styles/app.postcss'),
    join(__dirname, './app/index.html'),
    join(__dirname, './app/templates/**/*.hbs'),
    join(__dirname, './app/components/**/*.hbs')
  ],
  whitelistPatterns: [/data-/],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = function(defaults) {
  console.log("process.env.EMBER_ENV", process.env.EMBER_ENV)
  let app = new EmberApp(defaults, {
    // Add options here
    tests: false,
    postcssOptions: {
      compile: {
        extension: 'postcss',
        enabled: true,
        plugins: [
          require('autoprefixer'),
          { module: require('postcss-import') },
          require('tailwindcss')('./app/styles/tailwind.js'),
          ...(process.env.EMBER_ENV == "production" ? [purgeCSS] : [])
        ]
      },
      filter: {
        enabled: true,
        include: ['styles/*.postcss'],
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
