/// <reference path="../typings/index.d.ts"/>
import * as angular from 'angular';

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
	currentHelp: string;
	private $timeout: angular.ITimeoutService;
	private $sce: angular.ISCEService;

	constructor($timeout, $sce, UploadService: UploadService) {
		this.uploadService = UploadService;
		this.$timeout = $timeout;
		this.$sce = $sce;
		this.isWaiting = false;
		this.data = {
			media: {
				files: {file: ''}, status: 'na', what: 'media', order: ['file'],
				description: `
<p>
<a href="https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/media.csv">Media file</a> 
lists one or more medium with  <a href="https://www.ebi.ac.uk/chebi">chebi</a> 
names of the ingredient and concentrations</li> 
</p>
`
			},
			strains: {
				files: {file: ''}, status: 'na', what: 'strains', order: ['file'],
				description: `
<p>
<a href="https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/strains.csv">
Strains file</a> lists one strain per row.
</p>
`
			},
			experiment: {
				files: {samples: '', physiology: ''},
				status: 'na',
				what: 'experiment',
				order: ['samples file', 'physiology file'],
				description: `
<p>
Uploading experiment details and physiological measurements is done with two files. 
<a href="https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/samples.csv">
Samples file</a> and the 
<a href="https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/physiology.csv">
physiology file</a>   
The first (samples file) should have one row per reactor (sample) and the following columns:
</p>

<p>
For every row in the samples file, there must furthermore be one additional column 
in the physiology file listing measurements for that sample. The name of that corresponding column must
be {experiment}_{reactor} e.g. foo_A1
</p>
`
			}
		};
	}

	help(what) {
		this.currentHelp = this.$sce.trustAsHtml(this.data[what].description);
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
					var data = {file: fileList, what: what, project_id: 'TST'};
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
