'use strict';

// Vendor Libs
window.CryptoJS     = require("crypto-js");
window.moment       = require("moment");
window.Tether       = require("tether");
window._            = require('lodash');

var attachFastClick = require('fastclick');
attachFastClick(document.body);

require("angular");
require("angular-route");
require('restangular');

// Define Review Module
angular.module('Admin', ['ngRoute', 'restangular', 'AdminConfig'])
  .config(['$routeProvider', '$locationProvider', 'me', require("./routes")]);

require("./directives");
require("./filters");

require("./services/api");
require("./services/store");
require("./services/flash");

require("./controllers/app");
require("./controllers/accounts");
require("./controllers/entities");

require("./controllers/domains/domains");
require("./controllers/domains/editDomain");
require("./controllers/domains/newDomain");

require("./controllers/definitions/definitions");
require("./controllers/definitions/editDefinition");
require("./controllers/definitions/newDefinition");
