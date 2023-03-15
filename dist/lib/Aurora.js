"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DB = _interopRequireWildcard(require("../lib/DB"));
var _RecordNotFound = _interopRequireDefault(require("../errors/RecordNotFound"));
var _UnauthorizedError = _interopRequireDefault(require("../errors/UnauthorizedError"));
var _AppNotEnabledError = _interopRequireDefault(require("../errors/AppNotEnabledError"));
var _InsufficientPermissionsError = _interopRequireDefault(require("../errors/InsufficientPermissionsError"));
var _Logger = require("../lib/Logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Aurora = /*#__PURE__*/function () {
  function Aurora() {
    _classCallCheck(this, Aurora);
  }
  _createClass(Aurora, null, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
        var email, password, db, sql, data, user, _user, userId, userSalt, firstName, lastName, forcePasswordChange, capabilitiesSQL, rolesSQL, rawCapabilities, rawRoles, capabilities, roles, session_token, sessionSql, defaultEntityType, defaultEntityTypeData, defaultEntityTypeSQL, _defaultEntityTypeDat;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              email = _ref.email, password = _ref.password;
              if (!(!email || !password)) {
                _context.next = 3;
                break;
              }
              throw new _UnauthorizedError["default"]("Email/username and password are required.");
            case 3:
              db = new _DB["default"]();
              sql = "SELECT id, salt, first_name, last_name, force_password_change FROM people \n        WHERE email=:email AND encrypted_password = sha2(CONCAT(:password, salt), 256) AND login_enabled = 1 LIMIT 1;";
              _context.next = 7;
              return db.executeStatement(sql, [{
                name: "email",
                value: {
                  stringValue: email
                }
              }, {
                name: "password",
                value: {
                  stringValue: password
                }
              }]);
            case 7:
              data = _context.sent;
              if (!(data.records.length === 0)) {
                _context.next = 10;
                break;
              }
              throw new _RecordNotFound["default"]("Username or password is incorrect.");
            case 10:
              user = data.records[0];
              _user = _slicedToArray(user, 5), userId = _user[0].longValue, userSalt = _user[1].stringValue, firstName = _user[2].stringValue, lastName = _user[3].stringValue, forcePasswordChange = _user[4].booleanValue;
              capabilitiesSQL = "SELECT DISTINCT capabilities.name from people_groups \n      LEFT JOIN groups ON groups.id = people_groups.group_id\n      LEFT JOIN group_capabilities ON group_capabilities.group_id = groups.id\n      LEFT JOIN capabilities ON capabilities.id = group_capabilities.capabilities_id\n      WHERE people_groups.people_id = :people_id AND capabilities.name IS NOT NULL";
              rolesSQL = "SELECT DISTINCT groups.name from people_groups \n      LEFT JOIN groups ON groups.id = people_groups.group_id\n      LEFT JOIN group_capabilities ON group_capabilities.group_id = groups.id\n      LEFT JOIN capabilities ON capabilities.id = group_capabilities.capabilities_id\n      WHERE people_groups.people_id = :people_id AND capabilities.name IS NOT NULL"; // separate SQL for capabilities and roles so we dont have to filter duplicated values.
              _context.next = 16;
              return db.executeStatement(capabilitiesSQL, [{
                name: "people_id",
                value: {
                  longValue: userId
                }
              }]);
            case 16:
              rawCapabilities = _context.sent;
              _context.next = 19;
              return db.executeStatement(rolesSQL, [{
                name: "people_id",
                value: {
                  longValue: userId
                }
              }]);
            case 19:
              rawRoles = _context.sent;
              capabilities = rawCapabilities.records.map(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 1),
                  capability = _ref3[0].stringValue;
                return capability;
              });
              roles = rawRoles.records.map(function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 1),
                  roles = _ref5[0].stringValue;
                return roles;
              });
              session_token = (0, _DB.sha256)("".concat(userId).concat(userSalt).concat(Date.now()));
              sessionSql = "INSERT INTO sessions (`people_id`, `session`, `session_expiry`)  \n        VALUES(:id, :session, DATE_ADD(NOW(), INTERVAL 744 HOUR))";
              _context.next = 26;
              return db.executeStatement(sessionSql, [{
                name: "session",
                value: {
                  stringValue: session_token
                }
              }, {
                name: "id",
                value: {
                  longValue: userId
                }
              }]);
            case 26:
              defaultEntityTypeSQL = "SELECT entity_types.slug from entity_types LIMIT 1";
              _context.next = 29;
              return db.executeStatement(defaultEntityTypeSQL, []);
            case 29:
              defaultEntityTypeData = _context.sent;
              _defaultEntityTypeDat = _slicedToArray(defaultEntityTypeData.records[0], 1);
              defaultEntityType = _defaultEntityTypeDat[0].stringValue;
              return _context.abrupt("return", {
                session_token: session_token,
                user: {
                  firstName: firstName,
                  lastName: lastName,
                  roles: roles,
                  capabilities: capabilities,
                  defaultEntityType: defaultEntityType,
                  forcePasswordChange: forcePasswordChange
                }
              });
            case 33:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function login(_x) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "updatePassword",
    value: function () {
      var _updatePassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref6) {
        var session, oldPassword, newPassword, db, sql, data, id, checkPasswordSql, sqlPass, updateSql, salt, executeStatementParam;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              session = _ref6.session, oldPassword = _ref6.oldPassword, newPassword = _ref6.newPassword;
              if (!(!oldPassword || !newPassword)) {
                _context2.next = 3;
                break;
              }
              throw new _UnauthorizedError["default"]("Email/username and password are required.");
            case 3:
              db = new _DB["default"]();
              if (session) {
                _context2.next = 6;
                break;
              }
              throw new _RecordNotFound["default"]("Session not found.");
            case 6:
              sql = "SELECT people_id from sessions where session = :session AND session_expiry > NOW() LIMIT 1";
              _context2.next = 9;
              return db.executeStatement(sql, [{
                name: "session",
                value: {
                  stringValue: session
                }
              }]);
            case 9:
              data = _context2.sent;
              if (!(data.records.length === 0)) {
                _context2.next = 12;
                break;
              }
              throw new _UnauthorizedError["default"]("Session not found.");
            case 12:
              id = data.records.map(function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 1),
                  people_id = _ref8[0].longValue;
                return {
                  people_id: people_id
                };
              })[0]; //Check if the provided oldPassword is correct.
              checkPasswordSql = "SELECT id FROM people \n                             WHERE id = :id AND encrypted_password = sha2(CONCAT(:oldPassword, salt), 256) AND login_enabled = 1  LIMIT 1";
              _context2.next = 16;
              return db.executeStatement(checkPasswordSql, [{
                name: "id",
                value: {
                  longValue: id
                }
              }, {
                name: "oldPassword",
                value: {
                  stringValue: oldPassword
                }
              }]);
            case 16:
              sqlPass = _context2.sent;
              if (!(sqlPass.records.length === 0)) {
                _context2.next = 19;
                break;
              }
              throw new _RecordNotFound["default"]("Incorrect username or password.");
            case 19:
              updateSql = "\n   UPDATE people  \n   SET\n     encrypted_password = sha2(CONCAT(:newPassword, :salt), 256),\n     force_password_change = :force_password_change,\n     salt = :salt\n   WHERE id = :id";
              _context2.next = 22;
              return generateRandVals(5);
            case 22:
              salt = _context2.sent;
              executeStatementParam = [{
                name: "id",
                value: {
                  longValue: id
                }
              }, {
                name: "newPassword",
                value: {
                  stringValue: newPassword
                }
              }, {
                name: "force_password_change",
                value: {
                  booleanValue: false
                }
              }, {
                name: "salt",
                value: {
                  stringValue: salt
                }
              }];
              _context2.next = 26;
              return db.executeStatement(updateSql, executeStatementParam);
            case 26:
              return _context2.abrupt("return", false);
            case 27:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function updatePassword(_x2) {
        return _updatePassword.apply(this, arguments);
      }
      return updatePassword;
    }()
  }, {
    key: "assert",
    value: function () {
      var _assert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(conditions, sessionToken) {
        var sql, sqlArray, params, appsEnabledArray, permissionsArray, db, isLoggedInSQL, appsEnabledSQL, userHasPermissionSQL, _appsEnabledArray$, _appsEnabledArray$2, app1, app2, app3, _permissionsArray$, _permissionsArray$2, permission1, permission2, permission3, rawData, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              sql = "";
              sqlArray = [];
              params = {};
              appsEnabledArray = [];
              permissionsArray = [];
              db = new _DB["default"]();
              isLoggedInSQL = "\n      SELECT 'isLoggedIn' AS name, EXISTS(SELECT sessions.session FROM sessions \n      JOIN people ON sessions.people_id = people.id \n      WHERE \n        sessions.session = :session AND\n        sessions.session IS NOT NULL AND\n        sessions.session_expiry >= NOW() AND\n        people.login_enabled = 1\n      LIMIT 1) as value\n      ";
              appsEnabledSQL = "\n      SELECT name, value FROM (select 'appsEnabled' AS name, count(sme_apps.slug) = :apps_count AS value from sme_sessions\n      LEFT JOIN sme_tenants ON sme_tenants.id = sme_sessions.sme_tenant_id \n      LEFT JOIN sme_tenant_apps ON sme_tenant_apps.sme_tenant_id = sme_tenants.id\n      LEFT JOIN sme_apps ON sme_tenant_apps.sme_app_id = sme_apps.id\n      WHERE \n        sme_sessions.session = :session AND\n        sme_apps.slug IN (:app1, :app2, :app3)\n      ORDER BY sme_sessions.session_expiry DESC) table_apps_enabled \n    ";
              userHasPermissionSQL = "\n      SELECT name, value FROM (SELECT 'userHasPermission' AS name, count(sme_permissions.name) = :permissions_count AS value from sme_sessions \n        LEFT JOIN sme_people ON sme_sessions.people_id = sme_people.id\n        LEFT JOIN sme_people_groups ON sme_people_groups.sme_people_id = sme_people.id AND sme_sessions.sme_tenant_id = sme_people_groups.sme_tenant_id\n        LEFT JOIN sme_group_permissions ON sme_group_permissions.sme_group_id = sme_people_groups.sme_group_id AND sme_group_permissions.sme_tenant_id = sme_sessions.sme_tenant_id\n        LEFT JOIN sme_permissions ON sme_group_permissions.sme_permission_id = sme_permissions.id\n        WHERE \n          sme_sessions.session = :session AND\n          sme_permissions.name IN (:permission1, :permission2, :permission3)\n      ) table_user_has_permission;\n    ";
              if (conditions.loggedIn) {
                sqlArray = [].concat(_toConsumableArray(sqlArray), [isLoggedInSQL]);
                params = _objectSpread(_objectSpread({}, params), {}, {
                  session: {
                    name: "session",
                    value: {
                      stringValue: sessionToken
                    }
                  }
                });
              }
              if (conditions.appsEnabled) {
                sqlArray = [].concat(_toConsumableArray(sqlArray), [appsEnabledSQL]);
                appsEnabledArray = Array.isArray(conditions.appsEnabled) ? conditions.appsEnabled : [conditions.appsEnabled];
                appsEnabledArray = _toConsumableArray(new Set(appsEnabledArray)); //remove duplicate entries.

                //The Aurora Data API does not support array parameters at the time of this writing.
                //As a workaround, we allow a maximum of 3 app dependencies.
                //Rewrite once array parameters are supported in the future.
                app1 = appsEnabledArray[0];
                app2 = (_appsEnabledArray$ = appsEnabledArray[1]) !== null && _appsEnabledArray$ !== void 0 ? _appsEnabledArray$ : app1;
                app3 = (_appsEnabledArray$2 = appsEnabledArray[2]) !== null && _appsEnabledArray$2 !== void 0 ? _appsEnabledArray$2 : app1;
                params = _objectSpread(_objectSpread({}, params), {}, {
                  session: {
                    name: "session",
                    value: {
                      stringValue: sessionToken
                    }
                  },
                  appsCount: {
                    name: "apps_count",
                    value: {
                      longValue: appsEnabledArray.length
                    }
                  },
                  app1: {
                    name: "app1",
                    value: {
                      stringValue: app1
                    }
                  },
                  app2: {
                    name: "app2",
                    value: {
                      stringValue: app2
                    }
                  },
                  app3: {
                    name: "app3",
                    value: {
                      stringValue: app3
                    }
                  }
                });
              }
              if (conditions.userHasPermission) {
                sqlArray = [].concat(_toConsumableArray(sqlArray), [userHasPermissionSQL]);
                permissionsArray = Array.isArray(conditions.userHasPermission) ? conditions.userHasPermission : [conditions.userHasPermission];
                permissionsArray = _toConsumableArray(new Set(permissionsArray)); //remove duplicate entries.
                permission1 = permissionsArray[0];
                permission2 = (_permissionsArray$ = permissionsArray[1]) !== null && _permissionsArray$ !== void 0 ? _permissionsArray$ : permission1;
                permission3 = (_permissionsArray$2 = permissionsArray[2]) !== null && _permissionsArray$2 !== void 0 ? _permissionsArray$2 : permission1;
                params = _objectSpread(_objectSpread({}, params), {}, {
                  session: {
                    name: "session",
                    value: {
                      stringValue: sessionToken
                    }
                  },
                  permissionsCount: {
                    name: "permissions_count",
                    value: {
                      longValue: permissionsArray.length
                    }
                  },
                  permission1: {
                    name: "permission1",
                    value: {
                      stringValue: permission1
                    }
                  },
                  permission2: {
                    name: "permission2",
                    value: {
                      stringValue: permission2
                    }
                  },
                  permission3: {
                    name: "permission3",
                    value: {
                      stringValue: permission3
                    }
                  }
                });
              }
              sql = sqlArray.join(" UNION ");
              _context3.next = 15;
              return db.executeStatement(sql, Object.values(params));
            case 15:
              rawData = _context3.sent;
              data = Object.fromEntries(rawData.records.map(function (_ref9) {
                var _ref10 = _slicedToArray(_ref9, 2),
                  key = _ref10[0].stringValue,
                  value = _ref10[1].longValue;
                return [key, value];
              }));
              _context3.next = 19;
              return (0, _Logger.log)(JSON.stringify(rawData.records));
            case 19:
              _context3.next = 21;
              return (0, _Logger.log)(JSON.stringify(data));
            case 21:
              if (!Object.keys(data).includes("isLoggedIn")) {
                _context3.next = 24;
                break;
              }
              if (!(data.isLoggedIn !== 1)) {
                _context3.next = 24;
                break;
              }
              throw new _UnauthorizedError["default"]();
            case 24:
              if (!Object.keys(data).includes("appsEnabled")) {
                _context3.next = 27;
                break;
              }
              if (!(data.appsEnabled !== 1)) {
                _context3.next = 27;
                break;
              }
              throw new _AppNotEnabledError["default"]("One of the dependency apps is not enabled: ".concat(conditions.appsEnabled.join(",")));
            case 27:
              if (!Object.keys(data).includes("userHasPermission")) {
                _context3.next = 30;
                break;
              }
              if (!(data.userHasPermission !== 1)) {
                _context3.next = 30;
                break;
              }
              throw new _InsufficientPermissionsError["default"]("You do not have one of the required permissions: ".concat(permissionsArray.join(",")));
            case 30:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function assert(_x3, _x4) {
        return _assert.apply(this, arguments);
      }
      return assert;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(session_token) {
        var db, sessionSql;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              db = new _DB["default"]();
              sessionSql = "DELETE FROM sessions WHERE `session` = :session";
              _context4.next = 5;
              return db.executeStatement(sessionSql, [{
                name: "session",
                value: {
                  stringValue: session_token
                }
              }]);
            case 5:
              return _context4.abrupt("return", true);
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 8]]);
      }));
      function logout(_x5) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "getCapabilitiesByLoggedInUser",
    value: function () {
      var _getCapabilitiesByLoggedInUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(session_token) {
        var db, sql, rawCapabilites, userCapabilities;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              db = new _DB["default"]();
              sql = "SELECT DISTINCT capabilities.name from people_groups \n    LEFT JOIN groups ON groups.id = people_groups.group_id\n    LEFT JOIN group_capabilities ON group_capabilities.group_id = groups.id\n    LEFT JOIN capabilities ON capabilities.id = group_capabilities.capabilities_id\n    WHERE people_groups.people_id IN (select people_id from sessions where session = :session_token) AND capabilities.name IS NOT NULL";
              _context5.next = 4;
              return db.executeStatement(sql, [{
                name: "session_token",
                value: {
                  stringValue: session_token
                }
              }]);
            case 4:
              rawCapabilites = _context5.sent;
              userCapabilities = rawCapabilites.records.map(function (_ref11) {
                var _ref12 = _slicedToArray(_ref11, 1),
                  capability = _ref12[0].stringValue;
                return capability;
              });
              return _context5.abrupt("return", userCapabilities);
            case 7:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function getCapabilitiesByLoggedInUser(_x6) {
        return _getCapabilitiesByLoggedInUser.apply(this, arguments);
      }
      return getCapabilitiesByLoggedInUser;
    }()
  }]);
  return Aurora;
}();
var _default = Aurora;
exports["default"] = _default;