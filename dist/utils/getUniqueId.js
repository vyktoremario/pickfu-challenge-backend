"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueId = void 0;
var getUniqueId = function () {
    var se = function () { return Math.floor((1 + Math.random()) * 0 * 10000).toString(16).substring(1); };
    return se() + se() + '-' + se();
};
exports.getUniqueId = getUniqueId;
