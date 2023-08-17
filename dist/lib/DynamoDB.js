"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clientDynamodb = require("@aws-sdk/client-dynamodb");
var _libDynamodb = require("@aws-sdk/lib-dynamodb");
var _ref, _process$env$KS_DYNAM, _ref2, _process$env$KS_DYNAM2, _ref3, _process$env$KS_DYNAM3;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DYNAMO_DB_AWS_ACCESS_KEY = (_ref = (_process$env$KS_DYNAM = process.env.KS_DYNAMO_DB_AWS_ACCESS_KEY_ID) !== null && _process$env$KS_DYNAM !== void 0 ? _process$env$KS_DYNAM : process.env.KS_AWS_ACCESS_KEY_ID) !== null && _ref !== void 0 ? _ref : '';
var DYNAMO_DB_AWS_SECRET_ACCESS_KEY = (_ref2 = (_process$env$KS_DYNAM2 = process.env.KS_DYNAMO_DB_AWS_SECRET_ACCESS_KEY) !== null && _process$env$KS_DYNAM2 !== void 0 ? _process$env$KS_DYNAM2 : process.env.KS_AWS_SECRET_ACCESS_KEY) !== null && _ref2 !== void 0 ? _ref2 : '';
var DYNAMO_DB_AWS_REGION = (_ref3 = (_process$env$KS_DYNAM3 = process.env.KS_DYNAMO_DB_AWS_REGION) !== null && _process$env$KS_DYNAM3 !== void 0 ? _process$env$KS_DYNAM3 : process.env.KS_AWS_REGION) !== null && _ref3 !== void 0 ? _ref3 : 'us-east-1';
var defaultMarshallOptions = {
  convertEmptyValues: false,
  // Whether to automatically convert empty strings, blobs, and sets to `null`. false, by default. 
  removeUndefinedValues: true,
  // Whether to remove undefined values while marshalling. false, by default.
  convertClassInstanceToMap: false // Whether to convert typeof object to map attribute. false, by default.
};

var defaultUnmarshallOptions = {
  wrapNumbers: false // Whether to return numbers as a string instead of converting them to native JavaScript numbers. false, by default.
};
var DynamoDB = /*#__PURE__*/function () {
  function DynamoDB() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      marshallOptions = _ref4.marshallOptions,
      unmarshallOptions = _ref4.unmarshallOptions;
    _classCallCheck(this, DynamoDB);
    var DDBConfig = {
      region: DYNAMO_DB_AWS_REGION,
      credentials: {
        accessKeyId: DYNAMO_DB_AWS_ACCESS_KEY,
        secretAccessKey: DYNAMO_DB_AWS_SECRET_ACCESS_KEY
      }
    };
    var DDBDocConfig = {
      marshallOptions: marshallOptions !== null && marshallOptions !== void 0 ? marshallOptions : defaultMarshallOptions,
      unmarshallOptions: unmarshallOptions !== null && unmarshallOptions !== void 0 ? unmarshallOptions : defaultUnmarshallOptions
    };
    this.ddbClient = new _clientDynamodb.DynamoDBClient(DDBConfig);
    this.ddbDocClient = _libDynamodb.DynamoDBDocumentClient.from(this.ddbClient, DDBDocConfig);
  }

  // Create a table
  _createClass(DynamoDB, [{
    key: "createTable",
    value: function () {
      var _createTable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              command = new _clientDynamodb.CreateTableCommand(parameters);
              _context.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function createTable(_x) {
        return _createTable.apply(this, arguments);
      }
      return createTable;
    }() // Update a table
  }, {
    key: "updateTable",
    value: function () {
      var _updateTable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              command = new _clientDynamodb.UpdateTableCommand(parameters);
              _context2.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function updateTable(_x2) {
        return _updateTable.apply(this, arguments);
      }
      return updateTable;
    }() // Delete a table
  }, {
    key: "deleteTable",
    value: function () {
      var _deleteTable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              command = new _clientDynamodb.DeleteTableCommand(parameters);
              _context3.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context3.abrupt("return", _context3.sent);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function deleteTable(_x3) {
        return _deleteTable.apply(this, arguments);
      }
      return deleteTable;
    }() // List all tables 
  }, {
    key: "listTables",
    value: function () {
      var _listTables = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              command = new _clientDynamodb.ListTablesCommand(parameters);
              _context4.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function listTables(_x4) {
        return _listTables.apply(this, arguments);
      }
      return listTables;
    }() // Describe tables 
  }, {
    key: "describeTables",
    value: function () {
      var _describeTables = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              command = new _clientDynamodb.DescribeTableCommand(parameters);
              _context5.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context5.abrupt("return", _context5.sent);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function describeTables(_x5) {
        return _describeTables.apply(this, arguments);
      }
      return describeTables;
    }() // Insert an item
  }, {
    key: "insertItem",
    value: function () {
      var _insertItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              command = new _libDynamodb.PutCommand(parameters);
              _context6.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context6.abrupt("return", _context6.sent);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function insertItem(_x6) {
        return _insertItem.apply(this, arguments);
      }
      return insertItem;
    }() // Get an Item 
    // Must pass the correct keys
  }, {
    key: "readItem",
    value: function () {
      var _readItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              command = new _clientDynamodb.GetItemCommand(parameters);
              _context7.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context7.abrupt("return", _context7.sent);
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function readItem(_x7) {
        return _readItem.apply(this, arguments);
      }
      return readItem;
    }() // Gets all items 
  }, {
    key: "readAllItems",
    value: function () {
      var _readAllItems = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              command = new _clientDynamodb.ScanCommand(parameters);
              _context8.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context8.abrupt("return", _context8.sent);
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function readAllItems(_x8) {
        return _readAllItems.apply(this, arguments);
      }
      return readAllItems;
    }() // Updates an item
  }, {
    key: "updateItem",
    value: function () {
      var _updateItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              command = new _libDynamodb.UpdateCommand(parameters);
              _context9.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context9.abrupt("return", _context9.sent);
            case 4:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function updateItem(_x9) {
        return _updateItem.apply(this, arguments);
      }
      return updateItem;
    }() // Deletes an item
  }, {
    key: "deleteItem",
    value: function () {
      var _deleteItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              command = new _libDynamodb.DeleteCommand(parameters);
              _context10.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context10.abrupt("return", _context10.sent);
            case 4:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function deleteItem(_x10) {
        return _deleteItem.apply(this, arguments);
      }
      return deleteItem;
    }() // Insert multiple items
    // Delete multiple items
  }, {
    key: "batchWrite",
    value: function () {
      var _batchWrite = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              command = new _clientDynamodb.BatchWriteItemCommand(parameters);
              _context11.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context11.abrupt("return", _context11.sent);
            case 4:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function batchWrite(_x11) {
        return _batchWrite.apply(this, arguments);
      }
      return batchWrite;
    }() // Custom Query
  }, {
    key: "query",
    value: function () {
      var _query = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(parameters) {
        var command;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              command = new _clientDynamodb.QueryCommand(parameters);
              _context12.next = 3;
              return this.ddbDocClient.send(command);
            case 3:
              return _context12.abrupt("return", _context12.sent);
            case 4:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function query(_x12) {
        return _query.apply(this, arguments);
      }
      return query;
    }()
  }]);
  return DynamoDB;
}();
var _default = DynamoDB;
exports["default"] = _default;