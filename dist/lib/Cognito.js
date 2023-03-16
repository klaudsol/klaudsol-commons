"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _awsSdk = _interopRequireWildcard(require("aws-sdk"));
var _UnauthorizedError = _interopRequireDefault(require("../errors/UnauthorizedError"));
var _RecordNotFound = _interopRequireDefault(require("../errors/RecordNotFound"));
var _cookie = require("cookie");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
_awsSdk["default"].config.update({
  accessKeyId: process.env.AURORA_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AURORA_AWS_SECRET_ACCESS_KEY,
  region: process.env.AURORA_AWS_REGION
});
var ClientId = process.env.COGNITO_CLIENT_ID;
var UserPoolId = process.env.USER_POOL_ID;
var Cognito = /*#__PURE__*/function () {
  function Cognito() {
    _classCallCheck(this, Cognito);
  }
  _createClass(Cognito, null, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
        var email, password, res, _userDataResult$UserA, _userDataResult$UserA2, _userDataResult$UserA3, access_token, refresh_token, cognito, params, authResult, _authResult$userAttri, _authResult$userAttri2, _authResult$userAttri3, _authResult$userAttri4, _authResult$userAttri5, _authResult$userAttri6, tokenParams, userDataResult;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              email = _ref.email, password = _ref.password, res = _ref.res;
              _context.prev = 1;
              // authenticate user and obtain session and access tokens
              cognito = new _awsSdk.CognitoIdentityServiceProvider();
              params = {
                AuthFlow: "USER_PASSWORD_AUTH",
                ClientId: ClientId,
                AuthParameters: {
                  USERNAME: email,
                  PASSWORD: password
                }
              };
              _context.next = 6;
              return cognito.initiateAuth(params).promise();
            case 6:
              authResult = _context.sent;
              if (!((authResult === null || authResult === void 0 ? void 0 : authResult.ChallengeName) === "NEW_PASSWORD_REQUIRED")) {
                _context.next = 11;
                break;
              }
              return _context.abrupt("return", {
                session_token: authResult.Session,
                // note: The session token is exclusively intended for responding to challenges and can only be obtained if a challenge exists.
                user: {
                  username: authResult.ChallengeParameters.USER_ID_FOR_SRP,
                  firstName: ((_authResult$userAttri = authResult.userAttributes) === null || _authResult$userAttri === void 0 ? void 0 : (_authResult$userAttri2 = _authResult$userAttri.find(function (attr) {
                    return attr.Name === "given_name";
                  })) === null || _authResult$userAttri2 === void 0 ? void 0 : _authResult$userAttri2.Value) || "",
                  lastName: ((_authResult$userAttri3 = authResult.userAttributes) === null || _authResult$userAttri3 === void 0 ? void 0 : (_authResult$userAttri4 = _authResult$userAttri3.find(function (attr) {
                    return attr.Name === "family_name";
                  })) === null || _authResult$userAttri4 === void 0 ? void 0 : _authResult$userAttri4.Value) || "",
                  roles: [],
                  // decode accessToken using JWT library to get the user's groups belong
                  capabilities: ((_authResult$userAttri5 = authResult.userAttributes) === null || _authResult$userAttri5 === void 0 ? void 0 : (_authResult$userAttri6 = _authResult$userAttri5.find(function (attr) {
                    return attr.Name === "custom:capabilities";
                  })) === null || _authResult$userAttri6 === void 0 ? void 0 : _authResult$userAttri6.Value.split(",")) || [],
                  forcePasswordChange: true
                }
              });
            case 11:
              if (!(authResult !== null && authResult !== void 0 && authResult.ChallengeName)) {
                _context.next = 13;
                break;
              }
              throw (0, _UnauthorizedError["default"])("");
            case 13:
              access_token = authResult === null || authResult === void 0 ? void 0 : authResult.AuthenticationResult.AccessToken;
              refresh_token = authResult === null || authResult === void 0 ? void 0 : authResult.AuthenticationResult.RefreshToken;
              tokenParams = {
                AccessToken: access_token
              };
              _context.next = 18;
              return cognito.getUser(tokenParams).promise();
            case 18:
              userDataResult = _context.sent;
              res.setHeader("Set-Cookie", ["refreshToken=".concat(refresh_token, "; Path=/; HttpOnly; SameSite=strict; Max-Age=86400")]);

              // We should store the refreshToken in a cookie and then use the 'parse' function from the 'cookie' 
              // library to extract it at a later stage in our code. This will allow us to refresh our accessToken.
              return _context.abrupt("return", {
                access_token: access_token,
                user: {
                  username: userDataResult.Username,
                  firstName: ((_userDataResult$UserA = userDataResult.UserAttributes.find(function (attr) {
                    return attr.Name === "given_name";
                  })) === null || _userDataResult$UserA === void 0 ? void 0 : _userDataResult$UserA.Value) || "",
                  lastName: ((_userDataResult$UserA2 = userDataResult.UserAttributes.find(function (attr) {
                    return attr.Name === "family_name";
                  })) === null || _userDataResult$UserA2 === void 0 ? void 0 : _userDataResult$UserA2.Value) || "",
                  roles: [],
                  capabilities: ((_userDataResult$UserA3 = userDataResult.UserAttributes.find(function (attr) {
                    return attr.Name === "custom:capabilities";
                  })) === null || _userDataResult$UserA3 === void 0 ? void 0 : _userDataResult$UserA3.Value.split(",")) || [],
                  forcePasswordChange: false // user has successfully logged in, so forcePasswordChange is false
                }
              });
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](1);
              if (!(_context.t0.code === "NotAuthorizedException")) {
                _context.next = 29;
                break;
              }
              throw new _UnauthorizedError["default"](_context.t0.message);
            case 29:
              if (!(_context.t0.code === "InvalidPasswordException")) {
                _context.next = 33;
                break;
              }
              throw new _RecordNotFound["default"](_context.t0.message);
            case 33:
              throw _context.t0;
            case 34:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 23]]);
      }));
      function login(_x) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "updatePassword",
    value: function () {
      var _updatePassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
        var email, session, oldPassword, newPassword, forcePasswordChange, cognito, params, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              email = _ref2.email, session = _ref2.session, oldPassword = _ref2.oldPassword, newPassword = _ref2.newPassword, forcePasswordChange = _ref2.forcePasswordChange;
              _context2.prev = 1;
              if (!(!oldPassword || !newPassword)) {
                _context2.next = 4;
                break;
              }
              throw new _UnauthorizedError["default"]("Passwords are required.");
            case 4:
              cognito = new _awsSdk.CognitoIdentityServiceProvider();
              params = {
                ChallengeName: "NEW_PASSWORD_REQUIRED",
                ClientId: ClientId,
                ChallengeResponses: {
                  USERNAME: email,
                  NEW_PASSWORD: newPassword,
                  PASSWORD: oldPassword
                },
                Session: session
              };
              _context2.next = 8;
              return cognito.respondToAuthChallenge(params).promise();
            case 8:
              result = _context2.sent;
              if (!(result !== null && result !== void 0 && result.ChallengeName)) {
                _context2.next = 11;
                break;
              }
              throw new _UnauthorizedError["default"]();
            case 11:
              return _context2.abrupt("return", false);
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](1);
              if (!(_context2.t0.code === "NotAuthorizedException")) {
                _context2.next = 20;
                break;
              }
              throw new _UnauthorizedError["default"](_context2.t0.message);
            case 20:
              if (!(_context2.t0.code === "InvalidPasswordException")) {
                _context2.next = 24;
                break;
              }
              throw new _RecordNotFound["default"](_context2.t0.message);
            case 24:
              throw _context2.t0;
            case 25:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 14]]);
      }));
      function updatePassword(_x2) {
        return _updatePassword.apply(this, arguments);
      }
      return updatePassword;
    }()
  }, {
    key: "assert",
    value: function () {
      var _assert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req) {
        var cognito, sessionToken, username, params, accessToken, _params;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              cognito = new _awsSdk.CognitoIdentityServiceProvider();
              _context3.prev = 1;
              if (!req.session.cache.forcePasswordChange) {
                _context3.next = 11;
                break;
              }
              sessionToken = req.session.session_token;
              username = req.session.cache.username; // If a newly logged-in user in Cognito has a challenge status of 'NEW_PASSWORD_REQUIRED', 
              // they will only receive a sessionToken that is exclusively intended for responding to challenges. 
              // At this stage, we only have the sessionToken we obtained in the challenge for assertion.
              // in this case, use authflow ADMIN_NO_SRP_AUTH to verify if the sessionToken is still valid.
              // assert using session_token
              params = {
                AuthFlow: 'ADMIN_NO_SRP_AUTH',
                UserPoolId: UserPoolId,
                ClientId: ClientId,
                AuthParameters: {
                  USERNAME: username,
                  SESSION: sessionToken
                }
              };
              _context3.next = 8;
              return cognito.adminInitiateAuth(params).promise();
            case 8:
              return _context3.abrupt("return", true);
            case 11:
              // assert using access_token
              accessToken = req.session.cache.access_token;
              _params = {
                AccessToken: accessToken
              };
              _context3.next = 15;
              return cognito.getUser(_params).promise();
            case 15:
              return _context3.abrupt("return", true);
            case 16:
              _context3.next = 21;
              break;
            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](1);
              throw _context3.t0;
            case 21:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 18]]);
      }));
      function assert(_x3) {
        return _assert.apply(this, arguments);
      }
      return assert;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(token) {
        var cognito, params;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              // If a newly logged-in user in Cognito has a challenge status of 'NEW_PASSWORD_REQUIRED', 
              // they will only receive a sessionToken that is exclusively intended for responding to challenges. 
              // At this stage, we are using the sessionToken we obtained in the challenge to logout the user if the forcePasswordChange is true.
              // else accessToken.
              cognito = new _awsSdk.CognitoIdentityServiceProvider();
              params = {
                AccessToken: token
              };
              _context4.next = 5;
              return cognito.globalSignOut(params).promise();
            case 5:
              _context4.next = 10;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function logout(_x4) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "getCapabilitiesByLoggedInUser",
    value: function () {
      var _getCapabilitiesByLoggedInUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(access_token) {
        var _userDataResult$UserA4, cognito, params, userDataResult, capabilities;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              cognito = new _awsSdk.CognitoIdentityServiceProvider();
              params = {
                AccessToken: access_token
              };
              _context5.next = 5;
              return cognito.getUser(params).promise();
            case 5:
              userDataResult = _context5.sent;
              capabilities = ((_userDataResult$UserA4 = userDataResult.UserAttributes.find(function (attr) {
                return attr.Name === "custom:capabilities";
              })) === null || _userDataResult$UserA4 === void 0 ? void 0 : _userDataResult$UserA4.Value.split(",")) || [];
              return _context5.abrupt("return", capabilities);
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              if (!(_context5.t0.code === "NotAuthorizedException")) {
                _context5.next = 16;
                break;
              }
              throw new _UnauthorizedError["default"](_context5.t0.message);
            case 16:
              throw _context5.t0;
            case 17:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 10]]);
      }));
      function getCapabilitiesByLoggedInUser(_x5) {
        return _getCapabilitiesByLoggedInUser.apply(this, arguments);
      }
      return getCapabilitiesByLoggedInUser;
    }()
  }]);
  return Cognito;
}();
var _default = Cognito;
exports["default"] = _default;