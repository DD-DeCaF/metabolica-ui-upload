"use strict";
// Turn of WS TS inspection for the 'decaf-common' import.
// noinspection TypeScriptCheckImport
var decaf_common_1 = require('decaf-common');
require('./theoretical-yield.component.css!');
var theoretical_yield_service_1 = require('./theoretical-yield.service');
var plot_service_1 = require('./plot.service');
exports.COMPONENT_NAME = 'theoretical-yield';
var theoreticalYield = angular.module(exports.COMPONENT_NAME, [
    theoretical_yield_service_1["default"].name,
    plot_service_1["default"].name
]);
theoreticalYield.config(function (platformProvider) {
    platformProvider
        .register(exports.COMPONENT_NAME)
        .state(exports.COMPONENT_NAME, {
        url: "/" + exports.COMPONENT_NAME,
        views: {
            'content@': {
                templateUrl: decaf_common_1.dirname(module.id) + "/theoretical-yield.component.html",
                controller: UploadController,
                controllerAs: 'UploadController'
            }
        }
    });
});
var UploadController = (function () {
    function UploadController($timeout, TheoreticalYieldService, PlotService) {
        var _this = this;
        this.$timeout = $timeout;
        this.theoreticalYieldService = TheoreticalYieldService;
        this.plotService = PlotService;
        this.experiments = [];
        this.samples = [];
        this.isWaiting = false;
        this.loadLists();
        this.formConfig = [
            {
                'title': 'Experiment',
                'attr': 'experiments',
                'list': function () { return _this.experiments; }
            },
            {
                'title': 'Sample',
                'attr': 'samples',
                'list': function () { return _this.samples[_this.searchTexts.experiments]; }
            }
        ];
        this.searchTexts = {};
        this.data = {};
    }
    UploadController.prototype.querySearch = function (query, data) {
        return query ? data.filter(this.createFilterFor(query)) : data;
    };
    UploadController.prototype.createFilterFor = function (query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(option) {
            return (angular.lowercase(option.display).indexOf(lowercaseQuery) !== -1);
        };
    };
    UploadController.prototype.loadLists = function () {
        this.loadExperiments();
    };
    UploadController.prototype.loadExperiments = function () {
        var _this = this;
        this.theoreticalYieldService.loadExperiments()
            .then(function (data) {
            data.data.forEach(function (value) {
                _this.experiments.push({
                    value: value.id,
                    display: value.name
                });
            });
            _this.loadSamples();
        });
    };
    UploadController.prototype.loadSamples = function () {
        var _this = this;
        this.experiments.forEach(function (value) {
            var experimentId = value.value;
            _this.samples[experimentId] = [];
            _this.theoreticalYieldService.loadSamples(experimentId)
                .then(function (data) {
                data.data.forEach(function (sample) {
                    _this.samples[experimentId].push({
                        value: sample.id,
                        display: sample.name
                    });
                });
            });
        });
    };
    UploadController.prototype.hello = function () {
        console.info('hello...?');
    };
    UploadController.prototype.submit = function () {
        var _this = this;
        var currentSample = this.searchTexts['samples'];
        this.isWaiting = true;
        this.theoreticalYieldService.sampleYields(currentSample)
            .then(function (data) {
            _this.isWaiting = false;
            _this.data[currentSample] = data.data;
            angular.forEach(_this.data[currentSample], function (phaseYields, phase) {
                angular.forEach(phaseYields.metabolites, function (metaboliteYield, metabolite) {
                    var id = 'plot_' + phase + '_' + metabolite;
                    angular.element(document.getElementById(id)).ready(function () { return _this.plotService.plotPhase(id, metabolite, phaseYields['growth-rate'], metaboliteYield); });
                });
            });
        }, 
        // Error
        function (_a) {
            var status = _a[0], dataResponse = _a[1];
            _this.isWaiting = false;
        });
    };
    return UploadController;
}());
exports.__esModule = true;
exports["default"] = theoreticalYield;
//# sourceMappingURL=upload.component.js.map