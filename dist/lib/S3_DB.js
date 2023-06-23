"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeToJsonFile = exports.triggerRateLimiter = exports.initializeS3dbBucketParams = exports.initializeS3dbBucket = exports.formatCurrentDate = void 0;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _SES = require("./SES2");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// Initializes the s3 bucket that will be used as database
// I've created a separate policy on AWS that can only 
// write, update and read contents on a specific bucket
var initializeS3dbBucket = function initializeS3dbBucket(region, accessKeyId, secretAccessKey) {
  var s3 = new _awsSdk["default"].S3({
    region: region !== null && region !== void 0 ? region : process.env.KS_S3_DB_REGION,
    accessKeyId: accessKeyId !== null && accessKeyId !== void 0 ? accessKeyId : process.env.KS_S3_DB_ACCESS_KEY_ID,
    secretAccessKey: secretAccessKey !== null && secretAccessKey !== void 0 ? secretAccessKey : process.env.KS_S3_DB_SECRET_ACCESS_KEY
  });
  return s3;
};

// Returns the required Bucket Parameters for the Rate Limiter
// You can change the query (Depending on what query you want to run)
// The default query is SELECT * FROM s3object s'
// This selects all entries from the JSON file found on the bucket
// Other query samples: SELECT s.sent_at FROM s3object s ORDER BY s.sent_at DESC LIMIT 1
exports.initializeS3dbBucket = initializeS3dbBucket;
var initializeS3dbBucketParams = function initializeS3dbBucketParams(s3Query, s3BucketName, s3ObjectKey) {
  var query = s3Query !== null && s3Query !== void 0 ? s3Query : 'SELECT * FROM s3object s';
  var bucketName = s3BucketName !== null && s3BucketName !== void 0 ? s3BucketName : process.env.KS_S3_DB_BUCKET;
  var key = s3ObjectKey !== null && s3ObjectKey !== void 0 ? s3ObjectKey : process.env.KS_S3_DB_OBJECT_KEY;
  var params = {
    Bucket: bucketName,
    Key: key,
    InputSerialization: {
      JSON: {
        Type: 'DOCUMENT'
      }
    },
    OutputSerialization: {
      JSON: {}
    },
    ExpressionType: 'SQL',
    Expression: query
  };
  return params;
};

// Function that updates the existing JSON File
// Data is the content to put in the file
exports.initializeS3dbBucketParams = initializeS3dbBucketParams;
var writeToJsonFile = function writeToJsonFile(data, key, bucketName, s3) {
  var jsonContent = JSON.stringify(data, null, 2);
  var params = {
    Bucket: bucketName,
    Key: key,
    Body: jsonContent
  };
  s3.putObject(params, function (err, data) {
    if (err) {
      throw new Error(err);
    }
  });
};

// Formats the sent_at date to 
// "2023-06-06T14:28:27.636"
exports.writeToJsonFile = writeToJsonFile;
var formatCurrentDate = function formatCurrentDate() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var day = String(currentDate.getDate()).padStart(2, '0');
  var hour = String(currentDate.getHours()).padStart(2, '0');
  var minute = String(currentDate.getMinutes()).padStart(2, '0');
  var second = String(currentDate.getSeconds()).padStart(2, '0');
  var millisecond = String(currentDate.getMilliseconds()).padStart(3, '0');
  var formattedDateTime = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(millisecond);
  return formattedDateTime;
};

// Function to trigger rate limiter 
exports.formatCurrentDate = formatCurrentDate;
var triggerRateLimiter = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(s3, params, res, data, subject, confirmationMessage) {
    var records, latestEntry, message, status, fileCreated, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          records = []; // gets all records
          latestEntry = null; // gets most recent entry
          message = ''; // message to be returned
          status = 200; // status
          // Create the file if it doesn't exist
          _context2.next = 7;
          return createFileIfNotExists(s3, params.Bucket, params.Key, [{
            sent_at: formatCurrentDate()
          }]);
        case 7:
          fileCreated = _context2.sent;
          if (fileCreated) {
            _context2.next = 16;
            break;
          }
          _context2.next = 11;
          return s3.selectObjectContent(params).promise();
        case 11:
          response = _context2.sent;
          // This is the part that reads the data
          // Converts the records into string
          // Then parses it to JSON
          // latestEntry is the most recent entry inserted in the file
          response.Payload.on('data', function (event) {
            if (event.Records) {
              if (event.Records.Payload) {
                var recordString = event.Records.Payload.toString();
                var record = JSON.parse(recordString)._1;
                latestEntry = record[record.length - 1];
                records = record;
              }
            }
          });

          // After reading the content of the file
          // This is where you can add conditions / logic 
          // On how you will use the data from the json file

          response.Payload.on('end', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var currentTime, sentAt, timeDifference, dataToWrite;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!latestEntry) {
                    _context.next = 21;
                    break;
                  }
                  currentTime = new Date();
                  sentAt = new Date(latestEntry.sent_at);
                  timeDifference = currentTime.getTime() - sentAt.getTime();
                  if (!(timeDifference < 60000)) {
                    _context.next = 9;
                    break;
                  }
                  // Less than 1 minute (60,000 milliseconds)
                  message = confirmationMessage.pending; // Pending message (If the user tried to send multiple times)
                  status = 500; // Status code
                  _context.next = 21;
                  break;
                case 9:
                  dataToWrite = [
                  // ...records // You can add this if you want to append the data
                  {
                    sent_at: formatCurrentDate()
                  }]; // Calls the function to update the content of JSON
                  writeToJsonFile(dataToWrite, params.Key, params.Bucket, s3);

                  // sends the email if the time interval is more than 1 minute
                  _context.prev = 11;
                  _context.next = 14;
                  return (0, _SES.sendEmail)(subject, data.html, data.email);
                case 14:
                  message = confirmationMessage.success; // Success message (If the user tried to send multiple times)
                  _context.next = 21;
                  break;
                case 17:
                  _context.prev = 17;
                  _context.t0 = _context["catch"](11);
                  message = confirmationMessage.error; // Error message (If the user tried to send multiple times)
                  status = 500;
                case 21:
                  res.status(status).json({
                    message: message
                  });
                case 22:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[11, 17]]);
          })));
          _context2.next = 17;
          break;
        case 16:
          res.status(status).json({
            message: confirmationMessage.success
          });
        case 17:
          _context2.next = 23;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: confirmationMessage.error
          });
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return function triggerRateLimiter(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
exports.triggerRateLimiter = triggerRateLimiter;
var createFileIfNotExists = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(s3, bucketName, key, content) {
    var headParams, putParams;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Checks if the file already exists
          headParams = {
            Bucket: bucketName,
            Key: key
          };
          _context3.next = 4;
          return s3.headObject(headParams).promise();
        case 4:
          return _context3.abrupt("return", false);
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          if (!(_context3.t0.code === 'NotFound')) {
            _context3.next = 16;
            break;
          }
          putParams = {
            Bucket: bucketName,
            Key: key,
            Body: JSON.stringify(content)
          };
          _context3.next = 13;
          return s3.putObject(putParams).promise();
        case 13:
          return _context3.abrupt("return", true);
        case 16:
          throw _context3.t0;
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function createFileIfNotExists(_x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();