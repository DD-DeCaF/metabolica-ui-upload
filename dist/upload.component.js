"use strict";
/// <reference path="../typings/index.d.ts"/>
var angular = require('angular');
require('angular-material');
//docs https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/angular-material/angular-material.d.ts#L30
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
    function UploadController($timeout, $sce, $mdDialog, UploadService) {
        this.uploadService = UploadService;
        this.$timeout = $timeout;
        this.$sce = $sce;
        this.$mdDialog = $mdDialog;
        this.isWaiting = false;
        this.expectedFields = [];
        this.projects = [];
        this.data = {
            media: {
                files: { media: '' }, status: 'na', what: 'media', order: ['media']
            },
            strains: {
                files: { strains: '' }, status: 'na', what: 'strains', order: ['strains']
            },
            fermentation: {
                files: { sample_information: '', physiology: '' },
                status: 'na',
                what: 'fermentation',
                order: ['sample_information', 'physiology'],
            },
            screen: {
                files: { screen: '' }, status: 'na', what: 'screen', order: ['screen']
            }
        };
        this.getProjects();
        this.selected_project = '';
    }
    UploadController.prototype.getSchema = function (inputFile) {
        var _this = this;
        this.expectedFields = [];
        this.uploadService.getSchema(inputFile)
            .then(function (data) {
            data.data.fields.forEach(function (value) {
                _this.expectedFields.push(value);
            });
        });
    };
    UploadController.prototype.getProjects = function () {
        var _this = this;
        this.uploadService.getProjects()
            .then(function (data) {
            data.data.forEach(function (value) {
                _this.projects.push(value);
            });
        });
    };
    UploadController.prototype.showHelpAlert = function (inputFile) {
        this.getSchema(inputFile);
        this.$mdDialog.show({
            // can't use html files as they are not moved to dist for main app
            template: "\n<md-dialog aria-label=\"File specification for {{item}} upload\">\n    <form ng-cloak>\n        <md-toolbar>\n            <div class=\"md-toolbar-tools\">\n                <h2>File specification for {{inputFile}} upload</h2>\n                <span flex></span>\n            </div>\n        </md-toolbar>\n\n        <md-dialog-content>\n            <div class=\"md-dialog-content\">\n                The input must be plain text comma separated value (csv) file with columns listed below. Columns must be\n                present in the indicated order but cells can be left empty unless required.\n                <md-list>\n                    <md-list-item ng-repeat=\"field in expectedFields\">\n                        <p><b>{{field.name}}</b>, {{field.type}}: {{field.title}}\n                            <i ng-if=\"field.constraints.enum\">must be one of: [<i\n                                ng-repeat=\"item in field.constraints.enum\">\"{{item}}\", </i>]</i>\n                            <i ng-if=\"field.constraints.required\">(required)</i>\n                        </p>\n                    </md-list-item>\n                </md-list>\n            </div>\n        </md-dialog-content>\n\n        <md-dialog-actions layout=\"row\">\n            <span flex></span>\n            <md-button ng-click=\"close()\">\n                Close\n            </md-button>\n        </md-dialog-actions>\n    </form>\n</md-dialog>",
            parent: angular.element(document.querySelector('#popupContainer')),
            clickOutsideToClose: true,
            locals: {
                expectedFields: this.expectedFields,
                inputFile: inputFile
            },
            controller: function ($scope, $mdDialog, expectedFields, inputFile) {
                $scope.expectedFields = expectedFields;
                $scope.inputFile = inputFile;
                $scope.close = function () {
                    $mdDialog.hide();
                };
            }
        });
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
                        this.data[what].status = 'na';
                    }
                }
            }
        }
        this.selected_project = '';
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
        if (this.selected_project != '') {
            for (var what in this.data) {
                if (this.data.hasOwnProperty(what)) {
                    var fileList = this.buildFileList(what);
                    if (fileList.length === this.data[what].order.length) {
                        this.isWaiting = true;
                        this.data[what].status = 'na';
                        var data = { file: fileList, what: what, project_id: this.selected_project };
                        this.uploadService.uploadFile(data)
                            .then(function (what, ref) {
                            return function (response) {
                                ref.isWaiting = false;
                                ref.data[what].response = response.data;
                                // console.log(response.data.valid);
                                if (response.data.valid) {
                                    ref.data[what].status = 'ok';
                                }
                                else {
                                    ref.data[what].status = 'ng';
                                }
                            };
                        }(what, this), 
                        // error
                        function (_a) {
                            var status = _a[0], dataResponse = _a[1];
                            // console.log(status);
                            // console.log(dataResponse);
                            _this.isWaiting = false;
                        });
                    }
                }
            }
        }
    };
    return UploadController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = upload;

//# sourceMappingURL=upload.component.js.map
