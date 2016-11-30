"use strict";
/// <reference path="../typings/index.d.ts"/>
var angular = require('angular');
// noinspection TypeScriptCheckImport
var decaf_common_1 = require('decaf-common');
require('./upload.component.css!');
var upload_service_1 = require('./upload.service');
exports.COMPONENT_NAME = 'upload';
var upload = angular.module(exports.COMPONENT_NAME, [
    upload_service_1.default.name
]);
upload.config(function (platformProvider) {
    platformProvider
        .register(exports.COMPONENT_NAME)
        .state(exports.COMPONENT_NAME, {
        url: "/" + exports.COMPONENT_NAME,
        views: {
            'content@': {
                templateUrl: decaf_common_1.dirname(module.id) + "/upload.component.html",
                controller: UploadController,
                controllerAs: 'UploadController'
            }
        }
    });
});
var UploadController = (function () {
    function UploadController($timeout, $sce, UploadService) {
        this.uploadService = UploadService;
        this.$timeout = $timeout;
        this.$sce = $sce;
        this.isWaiting = false;
        this.data = {
            media: {
                files: { file: '' }, status: 'na', what: 'media', order: ['file'],
                description: "\n                <p>\n\t\t\t    Your media file can list one or more medium definitions using with following columns:\n\t\t\t    </p>\n\t\t\t    \n\t\t\t    <p>\n\t\t\t    <li><b>medium</b>: name of the medium</li>\n\t\t\t    <li><b>compound_name</b>: a <a href=\"https://www.ebi.ac.uk/chebi\">chebi</a> name of the ingredient</li>\n\t\t\t    <li><b>pH</b>: the pH of the medium (repeated for each row)</li>\n\t\t\t    <li><b>concentration</b>: in g/L</li>\n\t\t\t    <li><b>comment</b>: arbitrary comment (can be empty)</li>\n\t\t\t    </p>\n\t\t\t    \n\t\t\t    <p>\n\t\t\t    <a href=\"https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/media.csv\">\n\t\t\t    A minimal example</a>\n\t\t\t    </p>\n\t\t\t   "
            },
            strains: {
                files: { file: '' }, status: 'na', what: 'strains', order: ['file'],
                description: "\n                <p>\n\t\t\t    Your strains file can list one or more strains using the following columns\n\t\t\t    </p>\n\t\t\t    \n\t\t\t    <p>\n\t\t\t    <li><b>pool</b>: name of the pre-defined strain pool (creating new pools currently not supported)</li>\n\t\t\t    <li><b>strain</b>: name of the strain</li>\n\t\t\t    <li><b>genotype</b>: a <a href=\"https://github.com/biosustain/gnomic-python\">gnomic string</a> \n\t\t\t       describing the genotype relative to the parent strain</li>\n\t\t\t    <li><b>parent</b>: name of the parent strain</li>\n\t\t\t    <li><b>reference</b>: True or False indicating if the strain is a reference strain</li>\n\t\t\t    <li><b>organism</b>: organism code, SCE or ECO</li>\n\t\t\t    </p>\n\t\t\t    \n\t\t\t    <p>\n\t\t\t    <a href=\"https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/strains.csv\">\n\t\t\t    A minimal example</a>\n\t\t\t    </p>\n\t\t\t    "
            },
            experiment: {
                files: { samples: '', physiology: '' },
                status: 'na',
                what: 'experiment',
                order: ['samples file', 'physiology file'],
                description: "\n                <p>\n\t\t\t\tUploading experiment details and physiological measurements is done with two files. \n\t\t\t\tThe first (samples file) should have one row per reactor (sample) and the following columns:\n\t\t\t\t</p>\n\t\t\t\t\n                <p>\n\t\t\t\t<li><b>project</b>: project code for already existing iloop project</li>\n\t\t\t    <li><b>experiment</b>: experiment identifier</li>\n\t\t\t    <li><b>operation</b>: arbitrary string describing the main variable of interest, such as \n\t\t\t    'carbon limitation' \n\t\t\t    or 'high temperature'</li>\n\t\t\t    <li><b>feed_medium</b>: the name of the feed medium (see media upload)</li>\n\t\t\t    <li><b>batch_medium</b>: the name of the batch medium (see media upload)</li>\n\t\t\t    <li><b>strain</b>: name of the strain (see strains upload)</li>\n\t\t\t    <li><b>description</b>: description of this experiment (repeated for all samples)</li>\n\t\t\t    <li><b>date</b>: date the experiment was performed (YYYY-MM-DD)</li>\n\t\t\t    <li><b>do</b>: </li>\n\t\t\t    <li><b>gas</b>: used gas</li>\n\t\t\t    <li><b>gasflow</b>: used gasflow</li>\n\t\t\t    <li><b>ph_set</b>: the target pH</li>\n\t\t\t    <li><b>ph_correction</b>: the used pH correction reagent</li>\n\t\t\t    <li><b>stirrer</b>: the stirrer speed</li>\n\t\t\t    <li><b>temperature</b>: target fermentation temperature</li>\n\t\t\t    </p>\n\t\t\t    \n\t\t\t    <p>\n\t\t\t   \t<a href=\"https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/samples.csv\">\n\t\t\t    A minimal example</a>\n\t\t\t    </p>\n\t\t\t    \n\t\t\t    <p>The second file lists the actual measurement data and has the following columns</p>\n\t\t\t    \n\t\t\t    <p>\n\t\t\t    <li><b>phase_start</b>: when the phase for this measurement started</li>\n\t\t\t    <li><b>phase_end</b>: when the phase for this measurement ended</li>\n\t\t\t    <li><b>parameter</b>: the measured parameter one of yield, growth-rate, uptake-rate, production-rate, \n\t\t\t    carbon-balance, electron-balance, concentration, carbon-yield.</li>\n\t\t\t    <li><b>numerator_compound_name</b>: the chebi name of the compound in the numerator</li>\n\t\t\t    <li><b>denominator_compound_name</b>: the chebi name of the compound in the denominator</li>\n\t\t\t    <li><b>unit</b>: the unit, one of mmol/(gCDW*h), Cmol/Cmol, g CDW/mol, mmol/gCDW etc.</li>\n\t\t\t    </p>\n\t\t\t    \n\t\t\t    <p>\n\t\t\t    For every row in the samples file, there must furthermore be one additional column \n\t\t\t    in the physiology file listing measurements for that sample. The name of that corresponding column must\n\t\t\t    be {experiment}_{reactor} e.g. foo_A1\n\t\t\t    </p>\n\t\t\t    \n\t\t\t    <p>\n\t\t\t   \t<a href=\"https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/physiology.csv\">\n\t\t\t    A minimal example</a>\n\t\t\t    </p>\n\t\t\t    \n"
            }
        };
    }
    UploadController.prototype.help = function (what) {
        this.currentHelp = this.$sce.trustAsHtml(this.data[what].description);
    };
    UploadController.prototype.setFile = function (file, what, which) {
        this.data[what].files[which] = file;
    };
    UploadController.prototype.buildFileList = function (what) {
        var fileList = [];
        for (var i = 0; i < this.data[what].order.length; i++) {
            if (this.data[what].files[this.data[what].order[i]]) {
                fileList.push(this.data[what].files[this.data[what].order[i]]);
            }
        }
        return fileList;
    };
    UploadController.prototype.submit = function () {
        var _this = this;
        for (var what in this.data) {
            if (this.data.hasOwnProperty(what)) {
                var fileList = this.buildFileList(what);
                if (fileList.length == this.data[what].order.length) {
                    this.isWaiting = true;
                    this.data[what].status = 'na';
                    var data = { file: fileList, what: what, project_id: 'TST' };
                    this.uploadService.uploadFile(data)
                        .then(function (what, ref) {
                        return function (response) {
                            ref.isWaiting = false;
                            ref.data[what].response = response.data;
                            console.log(response.data.valid);
                            if (response.data.valid) {
                                ref.data[what].status = 'ok';
                            }
                            else {
                                ref.data[what].status = 'ng';
                            }
                        };
                    }(what, this), 
                    //error
                    function (_a) {
                        var status = _a[0], dataResponse = _a[1];
                        console.log(status);
                        console.log(dataResponse);
                        _this.isWaiting = false;
                    });
                }
            }
        }
    };
    return UploadController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = upload;

//# sourceMappingURL=upload.component.js.map
