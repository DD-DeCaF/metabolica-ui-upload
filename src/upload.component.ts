/// <reference path="../typings/index.d.ts"/>
import * as angular from 'angular';

// noinspection TypeScriptCheckImport
import {Config, dirname} from 'decaf-common';
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
		})
});

class UploadController {
	private $timeout:angular.ITimeoutService;
	private $sce:angular.ISCEService;
	isWaiting:boolean;
	uploadService:UploadService;
	data:any;
	currentHelp:string;

	constructor($timeout, $sce, UploadService:UploadService) {
		this.uploadService = UploadService;
		this.$timeout = $timeout;
		this.$sce = $sce;
		this.isWaiting = false;
		this.data = {
			media: {
				files: {file: ''}, status: 'na', what: 'media', order: ['file'],
				description: `
                <p>
			    Your media file can list one or more medium definitions using with following columns:
			    </p>
			    
			    <p>
			    <li><b>medium</b>: name of the medium</li>
			    <li><b>compound_name</b>: a <a href="https://www.ebi.ac.uk/chebi">chebi</a> name of the ingredient</li>
			    <li><b>pH</b>: the pH of the medium (repeated for each row)</li>
			    <li><b>concentration</b>: in g/L</li>
			    <li><b>comment</b>: arbitrary comment (can be empty)</li>
			    </p>
			    
			    <p>
			    <a href="https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/media.csv">
			    A minimal example</a>
			    </p>
			   `
			},
			strains: {
				files: {file: ''}, status: 'na', what: 'strains', order: ['file'],
				description: `
                <p>
			    Your strains file can list one or more strains using the following columns
			    </p>
			    
			    <p>
			    <li><b>pool</b>: name of the pre-defined strain pool (creating new pools currently not supported)</li>
			    <li><b>strain</b>: name of the strain</li>
			    <li><b>genotype</b>: a <a href="https://github.com/biosustain/gnomic-python">gnomic string</a> 
			       describing the genotype relative to the parent strain</li>
			    <li><b>parent</b>: name of the parent strain</li>
			    <li><b>reference</b>: True or False indicating if the strain is a reference strain</li>
			    <li><b>organism</b>: organism code, SCE or ECO</li>
			    </p>
			    
			    <p>
			    <a href="https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/strains.csv">
			    A minimal example</a>
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
				The first (samples file) should have one row per reactor (sample) and the following columns:
				</p>
				
                <p>
				<li><b>project</b>: project code for already existing iloop project</li>
			    <li><b>experiment</b>: experiment identifier</li>
			    <li><b>operation</b>: arbitrary string describing the main variable of interest, such as 
			    'carbon limitation' 
			    or 'high temperature'</li>
			    <li><b>feed_medium</b>: the name of the feed medium (see media upload)</li>
			    <li><b>batch_medium</b>: the name of the batch medium (see media upload)</li>
			    <li><b>strain</b>: name of the strain (see strains upload)</li>
			    <li><b>description</b>: description of this experiment (repeated for all samples)</li>
			    <li><b>date</b>: date the experiment was performed (YYYY-MM-DD)</li>
			    <li><b>do</b>: </li>
			    <li><b>gas</b>: used gas</li>
			    <li><b>gasflow</b>: used gasflow</li>
			    <li><b>ph_set</b>: the target pH</li>
			    <li><b>ph_correction</b>: the used pH correction reagent</li>
			    <li><b>stirrer</b>: the stirrer speed</li>
			    <li><b>temperature</b>: target fermentation temperature</li>
			    </p>
			    
			    <p>
			   	<a href="https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/samples.csv">
			    A minimal example</a>
			    </p>
			    
			    <p>The second file lists the actual measurement data and has the following columns</p>
			    
			    <p>
			    <li><b>phase_start</b>: when the phase for this measurement started</li>
			    <li><b>phase_end</b>: when the phase for this measurement ended</li>
			    <li><b>parameter</b>: the measured parameter one of yield, growth-rate, uptake-rate, production-rate, 
			    carbon-balance, electron-balance, concentration, carbon-yield.</li>
			    <li><b>numerator_compound_name</b>: the chebi name of the compound in the numerator</li>
			    <li><b>denominator_compound_name</b>: the chebi name of the compound in the denominator</li>
			    <li><b>unit</b>: the unit, one of mmol/(gCDW*h), Cmol/Cmol, g CDW/mol, mmol/gCDW etc.</li>
			    </p>
			    
			    <p>
			    For every row in the samples file, there must furthermore be one additional column 
			    in the physiology file listing measurements for that sample. The name of that corresponding column must
			    be {experiment}_{reactor} e.g. foo_A1
			    </p>
			    
			    <p>
			   	<a href="https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/physiology.csv">
			    A minimal example</a>
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
