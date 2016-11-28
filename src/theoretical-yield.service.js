"use strict";
var constants_1 = require('./constants');
var theoreticalYieldService = angular.module('theoreticalYield.service', []);
var TheoreticalYieldService = (function () {
    function TheoreticalYieldService($http) {
        this.$http = $http;
    }
    TheoreticalYieldService.prototype.loadExperiments = function () {
        return this.$http({
            method: 'GET',
            url: constants_1.API_ROOT_URL + "/experiments"
        });
    };
    TheoreticalYieldService.prototype.loadSamples = function (experimentId) {
        return this.$http({
            method: 'GET',
            url: constants_1.API_ROOT_URL + "/experiments/" + experimentId + "/samples"
        });
    };
    TheoreticalYieldService.prototype.sampleYields = function (sampleId) {
        return this.$http({
            method: 'GET',
            url: constants_1.API_ROOT_URL + "/samples/" + sampleId + "/maximum-yield"
        });
    };
    return TheoreticalYieldService;
}());
exports.TheoreticalYieldService = TheoreticalYieldService;
theoreticalYieldService.service('TheoreticalYieldService', TheoreticalYieldService);
exports.__esModule = true;
exports["default"] = theoreticalYieldService;
//# sourceMappingURL=theoretical-yield.service.js.map