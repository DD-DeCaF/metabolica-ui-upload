"use strict";
/// <reference path="../typings/index.d.ts"/>
require('ng-file-upload');
var constants_1 = require('./constants');
var uploadService = angular.module('uploadService', ['ngFileUpload']);
// function fileNames(files) {
// 	return files.map(function(a) { return a.name} )
// }
var UploadService = (function () {
    function UploadService(Upload) {
        this.ngUpload = Upload;
    }
    UploadService.prototype.uploadFile = function (data) {
        return this.ngUpload.upload({
            url: constants_1.API_ROOT_URL + '/upload',
            data: data,
            method: 'POST'
        }).then(function (resp) {
            // console.log('Success ' + fileNames(resp.config.data.file) + ' uploaded. Response: ' + resp.data);
            return resp;
        }, function (resp) {
            // console.log('Error status: ' + resp.status);
            // console.log('Error data: ' + resp.message);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + fileNames(evt.config.data.file));
        });
    };
    return UploadService;
}());
exports.UploadService = UploadService;
uploadService.service('UploadService', UploadService);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = uploadService;

//# sourceMappingURL=upload.service.js.map
