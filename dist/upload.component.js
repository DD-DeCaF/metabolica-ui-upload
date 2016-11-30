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
                description: "\n                <p>\n\t\t\t    <a href=\"https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/media.csv\">Media file</a> \n\t\t\t    lists one or more medium with  <a href=\"https://www.ebi.ac.uk/chebi\">chebi</a> \n\t\t\t    names of the ingredient and concentrations</li> \n\t\t\t    </p>\n\t\t\t   "
            },
            strains: {
                files: { file: '' }, status: 'na', what: 'strains', order: ['file'],
                description: "\n                <p>\n\t\t\t    <a href=\"https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/strains.csv\">\n\t\t\t    Strains file</a> lists one strain per row.\n\t\t\t    </p>\n\t\t\t    "
            },
            experiment: {
                files: { samples: '', physiology: '' },
                status: 'na',
                what: 'experiment',
                order: ['samples file', 'physiology file'],
                description: "\n                <p>\n\t\t\t\tUploading experiment details and physiological measurements is done with two files. \n\t\t        <a href=\"https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/samples.csv\">\n\t\t        Samples file</a> and the \n\t\t        <a href=\"https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/physiology.csv\">\n\t\t\t    physiology file</a>   \n\t\t\t\tThe first (samples file) should have one row per reactor (sample) and the following columns:\n\t\t\t\t</p>\n\t\t\t\t\n\t\t\t    <p>\n\t\t\t    For every row in the samples file, there must furthermore be one additional column \n\t\t\t    in the physiology file listing measurements for that sample. The name of that corresponding column must\n\t\t\t    be {experiment}_{reactor} e.g. foo_A1\n\t\t\t    </p>\n\t\t\t    \n"
            }
        };
    }
    UploadController.prototype.help = function (what) {
        this.currentHelp = this.$sce.trustAsHtml(this.data[what].description);
    };
    UploadController.prototype.setFile = function (file, what, which) {
        this.data[what].files[which] = file;
    };
    UploadController.prototype.clear = function () {
        for (var what in this.data) {
            if (this.data.hasOwnProperty(what)) {
                for (var key in this.data[what].files) {
                    if (this.data[what].files.hasOwnProperty(key)) {
                        this.data[what].files[key] = '';
                    }
                }
            }
        }
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
