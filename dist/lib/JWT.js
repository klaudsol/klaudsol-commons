"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.setToken = exports.getToken = exports.getAuthToken = exports.generateToken = exports.clearToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _TokenExpiredError = _interopRequireDefault(require("../errors/TokenExpiredError"));
var _JsonWebTokenError = _interopRequireDefault(require("../errors/JsonWebTokenError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateToken = function generateToken(_ref) {
  var firstName = _ref.firstName,
    lastName = _ref.lastName;
  // Let's reuse SECRET_COOKIE_PASSWORD instead of creating another one
  var token = _jsonwebtoken["default"].sign({
    firstName: firstName,
    lastName: lastName
  }, process.env.SECRET_COOKIE_PASSWORD, {
    expiresIn: 14400
  });
  return token;
};
exports.generateToken = generateToken;
var verifyToken = function verifyToken(token) {
  var error = function error(err, decoded) {
    if (err.name === "JsonWebTokenError") throw new _JsonWebTokenError["default"]();
    if (err.name === "TokenExpiredError") throw new _TokenExpiredError["default"]();
    throw err;
  };
  var decodedToken = _jsonwebtoken["default"].verify(token, process.env.SECRET_COOKIE_PASSWORD, error);
  return decodedToken;
};
exports.verifyToken = verifyToken;
var setToken = function setToken(token) {
  localStorage.setItem("token", token);
};
exports.setToken = setToken;
var getToken = function getToken() {
  var user = localStorage.getItem("token");
  if (!user) return null;
  return user;
};
exports.getToken = getToken;
var clearToken = function clearToken() {
  localStorage.clear();
};
exports.clearToken = clearToken;
var getAuthToken = function getAuthToken() {
  var token = getToken();
  return "Bearer ".concat(token);
};
exports.getAuthToken = getAuthToken;