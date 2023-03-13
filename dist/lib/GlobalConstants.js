"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeCurrency = exports.displaySerializedCurrency = exports.displayCurrency = exports["default"] = exports.backendPath = void 0;
//THIS LIBRARY IS DEPRECATED.
//The underlying functions might be deleted or redistirbuted to other libraries.

/*Shared constants between the frontend and the backend*/
var GlobalConstants = {
  AURORA_AWS_REGION: 'us-east-1'
};

//deprecated
var backendPath = function backendPath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return '';
};
exports.backendPath = backendPath;
var serializeCurrency = function serializeCurrency(amount) {
  return amount * 1000;
};
exports.serializeCurrency = serializeCurrency;
var displayCurrency = function displayCurrency(amount) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(amount);
};
exports.displayCurrency = displayCurrency;
var displaySerializedCurrency = function displaySerializedCurrency(amount) {
  return displayCurrency(amount / 1000);
};
exports.displaySerializedCurrency = displaySerializedCurrency;
var _default = GlobalConstants;
exports["default"] = _default;