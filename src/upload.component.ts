/// <reference path="../typings/index.d.ts"/>
import * as angular from 'angular';
import 'angular-material';
//docs https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/angular-material/angular-material.d.ts#L30

// noinspection TypeScriptCheckImport
import {dirname} from 'decaf-common';
import './upload.component.css!';
import uploadService, {UploadService} from './upload.service';


export const COMPONENT_NAME = 'upload';
const upload = angular.module(COMPONENT_NAME, [
	uploadService.name
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
		});
});

class UploadController {
	isWaiting: boolean;
	uploadService: UploadService;
	data: any;
	expectedFields: any[];
	projects: any[];
	selected_project: string;
	private $mdDialog: angular.material.IDialogService;
	private $timeout: angular.ITimeoutService;
	private $sce: angular.ISCEService;

	constructor($timeout, $sce, $mdDialog, UploadService:UploadService) {
		this.uploadService = UploadService;
		this.$timeout = $timeout;
		this.$sce = $sce;
		this.$mdDialog = $mdDialog;
		this.isWaiting = false;
		this.expectedFields = [];
		this.projects = [];
		this.data = {
			media: {
				files: {media: ''}, status: 'na', what: 'media', order: ['media']
			},
			strains: {
				files: {strains: ''}, status: 'na', what: 'strains', order: ['strains']
			},
			fermentation: {
				files: {sample_information: '', physiology: ''},
				status: 'na',
				what: 'fermentation',
				order: ['sample_information', 'physiology'],
			},
			screen: {
				files: {screen: ''}, status: 'na', what: 'screen', order: ['screen']
			}
		};
		this.getProjects();
		this.selected_project = '';
	}

	getSchema(inputFile) {
		this.expectedFields = [];
		this.uploadService.getSchema(inputFile)
			.then((data: any) => {
				data.data.fields.forEach((value) => {
					this.expectedFields.push(value)
				});
			});
	}

	getProjects() {
		this.uploadService.getProjects()
			.then((data:any) => {
				data.data.forEach((value) => {
					this.projects.push(value)
				});
			});
	}

	showHelpAlert(inputFile) {
		this.getSchema(inputFile);
		this.$mdDialog.show({
			templateUrl: 'dialog-template.html',
			parent: angular.element(document.querySelector('#popupContainer')),
			clickOutsideToClose: true,
			locals: {
				expectedFields: this.expectedFields,
				inputFile: inputFile
			},
            controller($scope, $mdDialog: ng.material.IDialogService, expectedFields, inputFile) {
				$scope.expectedFields = expectedFields;
				$scope.inputFile = inputFile;
                $scope.close = () => {
                    $mdDialog.hide();
                };
            }
		});
	}

	setFile(file, what, which) {
		this.data[what].files[which] = file;
	}

	clear() {
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
				if (fileList.length === this.data[what].order.length) {
					this.isWaiting = true;
					this.data[what].status = 'na';
					var data = {file: fileList, what: what, project_id: this.selected_project};
					this.uploadService.uploadFile(data)
						.then(function (what, ref) {
								return function (response) {
									ref.isWaiting = false;
									ref.data[what].response = response.data;
									// console.log(response.data.valid);
									if (response.data.valid) {
										ref.data[what].status = 'ok';
									} else {
										ref.data[what].status = 'ng';
									}
								};
							}(what, this),
							// error
							([status, dataResponse]) => {
								// console.log(status);
								// console.log(dataResponse);
								this.isWaiting = false;
							}
						);
				}
			}
		}
	}
}

export default upload;
