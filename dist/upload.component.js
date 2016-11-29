"use strict";
/// <reference path="../typings/index.d.ts"/>
var angular = require('angular');
// noinspection TypeScriptCheckImport
var decaf_common_1 = require('decaf-common');
require('./upload.component.css!');
var upload_service_1 = require('./upload.service');
exports.COMPONENT_NAME = 'upload';
var upload = angular.module(exports.COMPONENT_NAME, [
    upload_service_1.default.name,
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
    function UploadController($timeout, UploadService) {
        this.uploadService = UploadService;
        this.$timeout = $timeout;
        this.isWaiting = false;
        this.data = {
            media: { files: { file: '' }, status: 'na', what: 'media', order: ['file'] },
            strains: { files: { file: '' }, status: 'na', what: 'strains', order: ['file'] },
            experiment: {
                files: { samples: '', physiology: '' },
                status: 'na',
                what: 'experiment',
                order: ['samples file', 'physiology file'],
            }
        };
    }
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
