// This file isn't transpile, so must use CommonJS and ES5

// Register Babel to transpile before our tests run.
require('babel-register')();

// Disable webpack features Mocha doesn't understand
require.extensions['.css'] = function() {};