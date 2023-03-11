"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tellMeTheMeaningOfLife: true
};
exports.tellMeTheMeaningOfLife = void 0;
var _Discord = require("./lib/Discord");
Object.keys(_Discord).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Discord[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Discord[key];
    }
  });
});
var _Cloudwatch = require("./lib/Cloudwatch");
Object.keys(_Cloudwatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Cloudwatch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Cloudwatch[key];
    }
  });
});
var _SlackSay = require("./lib/SlackSay");
Object.keys(_SlackSay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SlackSay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SlackSay[key];
    }
  });
});
var tellMeTheMeaningOfLife = function tellMeTheMeaningOfLife() {
  console.log("Shiggidy Diggles");
  console.log("Oodle dooddle");
};
exports.tellMeTheMeaningOfLife = tellMeTheMeaningOfLife;