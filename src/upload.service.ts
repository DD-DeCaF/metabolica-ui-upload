/// <reference path="../typings/index.d.ts"/>
import 'ng-file-upload';
import {API_ROOT_URL} from './constants';

const uploadService = angular.module('uploadService', ['ngFileUpload']);


export class UploadService {
	ngUpload: angular.angularFileUpload.IUploadService;
	private $http: angular.IHttpService;

	constructor(Upload: angular.angularFileUpload.IUploadService, $http) {
		this.ngUpload = Upload;
		this.$http = $http;
	}

	getSchema(what) {
		return this.$http({
			method: 'GET',
			url: `${API_ROOT_URL}/upload/schema/` + what
		});
	}

	getProjects() {
		return this.$http({
			method: 'GET',
			url: `${API_ROOT_URL}/upload/list_projects`
		});
	}

	uploadFile(data) {
		return this.ngUpload.upload({
			url: API_ROOT_URL + '/upload',
			data: data,
			method: 'POST'
		}).then(function (resp) {
				// console.log('Success ' + fileNames(resp.config.data.file) + ' uploaded. Response: ' + resp.data);
				return resp;
			},
			function (resp) {
				// console.log('Error status: ' + resp.status);
				// console.log('Error data: ' + resp.message);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				// console.log('progress: ' + progressPercentage + '% ' + fileNames(evt.config.data.file));
			});
	}
}

uploadService.service('UploadService', UploadService);
export default uploadService;
