import * as angular from 'angular';
import 'ng-file-upload';
import {API_ROOT_URL} from './constants';


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
				return resp;
			},
			function (resp) {
			}, function (evt) {
				// var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			});
	}
}
