"use strict";
var Plotly = require('plotly.js/lib/core');
var plotService = angular.module('plot.service', []);
var PlotService = (function () {
    function PlotService() {
    }
    PlotService.prototype.plotPhase = function (domId, metabolite, growthRate, theoreticalYields) {
        var strains = { 'wild': 'rgb(22, 96, 167)', 'modified': 'rgb(205, 12, 24)' };
        var point = {
            x: growthRate,
            y: [theoreticalYields.flux],
            type: 'scatter',
            showlegend: false,
            line: { color: strains['modified'] },
            name: 'experiment data'
        };
        var data = [point];
        var currentKey = null;
        angular.forEach(strains, function (color, strainKey) {
            var points = theoreticalYields['phase-planes'][strainKey];
            angular.forEach(theoreticalYields['phase-planes'][strainKey], function (value, key) {
                if (key != 'objective_lower_bound' && key != 'objective_upper_bound') {
                    currentKey = key;
                }
            });
            var keys = ['objective_lower_bound', 'objective_upper_bound'];
            for (var ind in keys) {
                this.push({
                    x: points[keys[ind]],
                    y: points[currentKey],
                    type: 'line',
                    showlegend: false,
                    line: { color: color },
                    name: currentKey
                });
            }
            if (currentKey !== null) {
                function connect(index) {
                    return {
                        x: [points['objective_lower_bound'][index], points['objective_upper_bound'][index]],
                        y: [points[currentKey][index], points[currentKey][index]],
                        type: 'line',
                        showlegend: false,
                        line: { color: color },
                        name: currentKey
                    };
                }
                this.push(connect(0));
                this.push(connect(points['objective_upper_bound'].length - 1));
            }
        }, data);
        var layout = {
            autosize: false,
            width: 400,
            height: 300,
            title: metabolite,
            xaxis: { title: 'growth, 1/h' },
            yaxis: { title: currentKey },
            margin: {
                l: 60,
                r: 15,
                b: 45,
                t: 60,
                pad: 10
            }
        };
        Plotly.newPlot(domId, data, layout);
    };
    return PlotService;
}());
exports.PlotService = PlotService;
plotService.service('PlotService', PlotService);
exports.__esModule = true;
exports["default"] = plotService;
//# sourceMappingURL=plot.service.js.map