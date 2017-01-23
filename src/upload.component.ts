// <reference path="../typings/index.d.ts"/>
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
	isWaiting:boolean;
	uploadService:UploadService;
	data:any;
	expectedFields:any[];
	projects:any[];
	selected_project:string;
	selected_upload:string;
	examples:any;
	private $mdDialog:angular.material.IDialogService;
	private $timeout:angular.ITimeoutService;
	private $sce:angular.ISCEService;

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
				order: ['sample_information', 'physiology']
			},
			screen: {
				files: {screen: ''}, status: 'na', what: 'screen', order: ['screen'],
			}
		};
		this.examples = {
			screen: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/screening.csv',
			sample_information: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/samples.csv',
			physiology: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/physiology.csv',
			strains: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/strains.csv',
			media: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/media.csv'

		};
		this.getProjects();
		this.selected_project = '';
		this.selected_upload = '';
	}

	selectedData() {
		return this.data[this.selected_upload];
	}

	selectedFile(inputFile) {
		return this.data[this.selected_upload].files[inputFile];
	}

	getSchema(inputFile) {
		this.expectedFields = [];
		this.uploadService.getSchema(inputFile)
			.then((data:any) => {
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
			// can't use html files as they are not moved to dist for main app
			template: `
<md-dialog aria-label="File specification for {{item}} upload">
    <form ng-cloak>
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2>File specification for {{inputFile}} upload</h2>
                <span flex></span>
            </div>
        </md-toolbar>

        <md-dialog-content>
            <div class="md-dialog-content">
                The input (<a href="{{example}}" target="_blank">example</a>) must be excel spreadsheets (xlsx/xls) or 
                plain text comma separated value (csv) file with columns listed below. All columns must be present but 
                their order does not matter and cells can be left empty unless marked as <i>required</i>. 
                <md-list>
                    <md-list-item ng-repeat="field in expectedFields">
                        <p><b>{{field.name}}</b>, {{field.type}}: {{field.title}}
                            <i ng-if="field.constraints.enum">must be one of: [<i
                                ng-repeat="item in field.constraints.enum">"{{item}}", </i>]</i>
                            <i ng-if="field.constraints.required">(required)</i>
                        </p>
                    </md-list-item>
                </md-list>
            </div>
        </md-dialog-content>

        <md-dialog-actions layout="row">
            <span flex></span>
            <md-button ng-click="close()">
                Close
            </md-button>
        </md-dialog-actions>
    </form>
</md-dialog>`,
			parent: angular.element(document.querySelector('#popupContainer')),
			clickOutsideToClose: true,
			locals: {
				expectedFields: this.expectedFields,
				inputFile: inputFile,
				example: this.examples[inputFile]
			},
			controller($scope, $mdDialog:ng.material.IDialogService, expectedFields, inputFile, example) {
				$scope.expectedFields = expectedFields;
				$scope.example = example;
				$scope.inputFile = inputFile;
				$scope.close = () => {
					$mdDialog.hide();
				};
			}
		});
	}

	setFile(file, which) {
		this.data[this.selected_upload].files[which] = file;
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
		if (this.selected_project != '') {
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
}

export default upload;
