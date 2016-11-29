/// <reference path="../typings/index.d.ts"/>
import * as angular from 'angular';

// noinspection TypeScriptCheckImport
import {Config, dirname} from 'decaf-common';
import './upload.component.css!';
import uploadService, {UploadService} from './upload.service';


export const COMPONENT_NAME = 'upload';
const upload = angular.module(COMPONENT_NAME, [
	uploadService.name,
]);

upload.config(function (platformProvider) {
	platformProvider
		.register(COMPONENT_NAME)
		.state(COMPONENT_NAME, {
			url: `/${COMPONENT_NAME}`,
			views: {
				'content@': {
					templateUrl: `${dirname(module.id)}/upload.component.html`,
					controller: UploadController,
					controllerAs: 'UploadController'
				}
			}
		})
});

class UploadController {
	private $timeout:angular.ITimeoutService;
	isWaiting:boolean;
	uploadService:UploadService;
	data:any;

	constructor($timeout, UploadService:UploadService) {
		this.uploadService = UploadService;
		this.$timeout = $timeout;
		this.isWaiting = false;
		this.data = {
			media: {files: {file: ''}, status: 'na', what: 'media', order: ['file']},
			strains: {files: {file: ''}, status: 'na', what: 'strains', order: ['file']},
			experiment: {
				files: {samples: '', physiology: ''},
				status: 'na',
				what: 'experiment',
				order: ['samples file', 'physiology file'],
			}
		};
	}

	setFile(file, what, which) {
		this.data[what].files[which] = file;
	}

	buildFileList(what) {
		var fileList = [];
		for (var i = 0; i < this.data[what].order.length; i++) {
			if (this.data[what].files[this.data[what].order[i]]) {
				fileList.push(this.data[what].files[this.data[what].order[i]]);
			}
		}
		return fileList;
	}

	submit() {
		for (var what in this.data) {
			if (this.data.hasOwnProperty(what)) {
				var fileList = this.buildFileList(what);
				if (fileList.length == this.data[what].order.length) {
					this.isWaiting = true;
					this.data[what].status = 'na';
					var data = {file: fileList, what: what, project_id: 'TST'};
					this.uploadService.uploadFile(data)
						.then(function (what, ref) {
								return function (response) {
									ref.isWaiting = false;
									ref.data[what].response = response.data;
									console.log(response.data.valid);
									if (response.data.valid) {
										ref.data[what].status = 'ok';
									} else {
										ref.data[what].status = 'ng';
									}
								}
							}(what, this),
							//error
							([status, dataResponse]) => {
								console.log(status);
								console.log(dataResponse);
								this.isWaiting = false;
							}
						);
				}
			}
		}
	}
}

export default upload;
