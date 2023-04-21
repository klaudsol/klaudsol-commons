"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFilesToUrl = exports.uploadFileToUrl = exports.uploadFileToBucket = exports.updateFilesFromBucket = exports.initializeS3 = exports.getS3Param = exports.generateUniqueKey = exports.generateS3ParamsForDeletion = exports.generateS3ParamForDeletion = exports.generateS3KeyForDeletion = exports.generateResource = exports.generatePresignedUrls = exports.generatePresignedUrl = exports.generateEntry = exports.generateEntries = exports.formatS3Param = exports.deleteObjectsFromBucket = exports.deleteObjectFromBucket = exports.deleteFilesFromBucket = exports.addFilesToBucket = exports.addFileToBucket = void 0;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _Math = require("./Math");
var _Client = require("./Client");
var _ref, _process$env$KS_S3_AC, _ref2, _process$env$KS_S3_SE, _ref3, _process$env$KS_S3_RE;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var S3_ACCESS_KEY_ID = (_ref = (_process$env$KS_S3_AC = process.env.KS_S3_ACCESS_KEY_ID) !== null && _process$env$KS_S3_AC !== void 0 ? _process$env$KS_S3_AC : process.env.KS_AWS_ACCESS_KEY_ID) !== null && _ref !== void 0 ? _ref : process.env.AURORA_AWS_ACCESS_KEY_ID;
var S3_SECRET_ACCESS_KEY = (_ref2 = (_process$env$KS_S3_SE = process.env.KS_S3_SECRET_ACCESS_KEY) !== null && _process$env$KS_S3_SE !== void 0 ? _process$env$KS_S3_SE : process.env.KS_AWS_SECRET_ACCESS_KEY) !== null && _ref2 !== void 0 ? _ref2 : process.env.AURORA_AWS_SECRET_ACCESS_KEY;
//TODO: Deprecate AURORA_AWS_REGION on release V3.0.0
var REGION = (_ref3 = (_process$env$KS_S3_RE = process.env.KS_S3_REGION) !== null && _process$env$KS_S3_RE !== void 0 ? _process$env$KS_S3_RE : process.env.KS_AWS_REGION) !== null && _ref3 !== void 0 ? _ref3 : process.env.AURORA_AWS_REGION;
var S3_BUCKET = process.env.KS_S3_BUCKET;
var s3Config = {
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: REGION,
  signatureVersion: "v4"
};
var initializeS3 = function initializeS3() {
  var s3 = new _awsSdk["default"].S3(s3Config);
  return s3;
};
exports.initializeS3 = initializeS3;
var getS3Param = function getS3Param(file) {
  return {
    Bucket: S3_BUCKET,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
};
exports.getS3Param = getS3Param;
var generatePresignedUrl = function generatePresignedUrl(file) {
  var s3 = initializeS3();
  var params = {
    Bucket: S3_BUCKET,
    Key: file.key,
    Expires: 60,
    ContentType: file.type,
    ACL: "public-read"
  };
  var url = s3.getSignedUrl("putObject", params);
  return {
    url: url,
    originalName: file.originalName
  };
};
exports.generatePresignedUrl = generatePresignedUrl;
var generatePresignedUrls = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(fileNames) {
    var presignedUrls;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          presignedUrls = fileNames.map(generatePresignedUrl);
          return _context.abrupt("return", presignedUrls);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function generatePresignedUrls(_x) {
    return _ref4.apply(this, arguments);
  };
}();
exports.generatePresignedUrls = generatePresignedUrls;
var uploadFileToUrl = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(file, url) {
    var uploadParams;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          uploadParams = {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            body: file
          };
          _context2.next = 3;
          return (0, _Client.slsFetch)(url, uploadParams);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function uploadFileToUrl(_x2, _x3) {
    return _ref5.apply(this, arguments);
  };
}();
exports.uploadFileToUrl = uploadFileToUrl;
var uploadFilesToUrl = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(files, urls) {
    var promises;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return urls.map( /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
              var file;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    file = files.find(function (file) {
                      return file.name === item.originalName;
                    });
                    _context3.next = 3;
                    return uploadFileToUrl(file, item.url);
                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x6) {
              return _ref7.apply(this, arguments);
            };
          }());
        case 2:
          promises = _context4.sent;
          _context4.next = 5;
          return Promise.all(promises);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function uploadFilesToUrl(_x4, _x5) {
    return _ref6.apply(this, arguments);
  };
}();
exports.uploadFilesToUrl = uploadFilesToUrl;
var generateUniqueKey = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(key) {
    var randVal, formattedKey;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _Math.generateRandVals)(4);
        case 2:
          randVal = _context5.sent;
          formattedKey = "".concat(randVal, "_").concat(key);
          return _context5.abrupt("return", formattedKey);
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function generateUniqueKey(_x7) {
    return _ref8.apply(this, arguments);
  };
}();
exports.generateUniqueKey = generateUniqueKey;
var formatS3Param = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(param) {
    var uniqueKey, newParams;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return generateUniqueKey(param.Key);
        case 2:
          uniqueKey = _context6.sent;
          newParams = _objectSpread(_objectSpread({}, param), {}, {
            Key: uniqueKey
          });
          return _context6.abrupt("return", newParams);
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function formatS3Param(_x8) {
    return _ref9.apply(this, arguments);
  };
}();
exports.formatS3Param = formatS3Param;
var generateEntries = function generateEntries(resFromS3, files, body) {
  var newBody = _objectSpread({}, body);
  files.forEach(function (file, i) {
    return newBody[file.fieldname] = resFromS3[i].Key;
  });
  return newBody;
};
exports.generateEntries = generateEntries;
var generateEntry = function generateEntry(resFromS3, file) {
  var newBody = _defineProperty({}, file.fieldname, resFromS3.key);
  return newBody;
};
exports.generateEntry = generateEntry;
var generateResource = function generateResource(resFromS3, file) {
  var newBody = {
    key: file.fieldname,
    value: resFromS3.key
  };
  return newBody;
};
exports.generateResource = generateResource;
var uploadFileToBucket = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(param) {
    var s3, res;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          s3 = initializeS3();
          _context7.next = 3;
          return s3.upload(param).promise();
        case 3:
          res = _context7.sent;
          return _context7.abrupt("return", res);
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function uploadFileToBucket(_x9) {
    return _ref10.apply(this, arguments);
  };
}();
exports.uploadFileToBucket = uploadFileToBucket;
var generateS3KeyForDeletion = function generateS3KeyForDeletion(key) {
  return {
    Key: key
  };
};
exports.generateS3KeyForDeletion = generateS3KeyForDeletion;
var generateS3ParamsForDeletion = function generateS3ParamsForDeletion(keysRaw) {
  var keys = keysRaw.map(generateS3KeyForDeletion);
  var params = {
    Bucket: S3_BUCKET,
    Delete: {
      Objects: keys
    }
  };
  return params;
};
exports.generateS3ParamsForDeletion = generateS3ParamsForDeletion;
var generateS3ParamForDeletion = function generateS3ParamForDeletion(keyRaw) {
  var _generateS3KeyForDele = generateS3KeyForDeletion(keyRaw),
    Key = _generateS3KeyForDele.Key;
  var params = {
    Bucket: S3_BUCKET,
    Key: Key
  };
  return params;
};
exports.generateS3ParamForDeletion = generateS3ParamForDeletion;
var deleteObjectsFromBucket = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(params) {
    var s3, res;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          s3 = initializeS3();
          _context8.next = 3;
          return s3.deleteObjects(params).promise();
        case 3:
          res = _context8.sent;
          return _context8.abrupt("return", res);
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function deleteObjectsFromBucket(_x10) {
    return _ref11.apply(this, arguments);
  };
}();
exports.deleteObjectsFromBucket = deleteObjectsFromBucket;
var deleteObjectFromBucket = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(params) {
    var s3, res;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          s3 = initializeS3();
          _context9.next = 3;
          return s3.deleteObject(params).promise();
        case 3:
          res = _context9.sent;
          return _context9.abrupt("return", res);
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function deleteObjectFromBucket(_x11) {
    return _ref12.apply(this, arguments);
  };
}();
exports.deleteObjectFromBucket = deleteObjectFromBucket;
var deleteFilesFromBucket = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(toDelete) {
    var paramsForDeletion;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          paramsForDeletion = generateS3ParamsForDeletion(toDelete);
          _context10.next = 3;
          return deleteObjectsFromBucket(paramsForDeletion);
        case 3:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function deleteFilesFromBucket(_x12) {
    return _ref13.apply(this, arguments);
  };
}();
exports.deleteFilesFromBucket = deleteFilesFromBucket;
var addFileToBucket = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(file) {
    var paramsRaw, param, resFromS3;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          paramsRaw = getS3Param(file);
          _context11.next = 3;
          return formatS3Param(paramsRaw);
        case 3:
          param = _context11.sent;
          _context11.next = 6;
          return uploadFileToBucket(param);
        case 6:
          resFromS3 = _context11.sent;
          return _context11.abrupt("return", resFromS3);
        case 8:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function addFileToBucket(_x13) {
    return _ref14.apply(this, arguments);
  };
}();
exports.addFileToBucket = addFileToBucket;
var addFilesToBucket = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(files) {
    var promise, resFromS3;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return files.map(addFileToBucket);
        case 2:
          promise = _context12.sent;
          _context12.next = 5;
          return Promise.all(promise);
        case 5:
          resFromS3 = _context12.sent;
          return _context12.abrupt("return", resFromS3);
        case 7:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function addFilesToBucket(_x14) {
    return _ref15.apply(this, arguments);
  };
}();

// This function should only do one thing, but it does two things:
// Getting the params for deletion, and updating the files
// Need to refactor this to separate the uploading of the file
// And getting the params for deletion
// We also need a function to update one file. This function updates
// multiple files
exports.addFilesToBucket = addFilesToBucket;
var updateFilesFromBucket = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(file, body, toDelete) {
    var paramsForDeletion, uploadedFile;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (!(toDelete !== null && toDelete !== void 0 && toDelete.length)) {
            _context13.next = 4;
            break;
          }
          paramsForDeletion = generateS3ParamsForDeletion(toDelete);
          _context13.next = 4;
          return deleteObjectsFromBucket(paramsForDeletion);
        case 4:
          _context13.next = 6;
          return addFilesToBucket(file, body);
        case 6:
          uploadedFile = _context13.sent;
          return _context13.abrupt("return", uploadedFile);
        case 8:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function updateFilesFromBucket(_x15, _x16, _x17) {
    return _ref16.apply(this, arguments);
  };
}();
exports.updateFilesFromBucket = updateFilesFromBucket;