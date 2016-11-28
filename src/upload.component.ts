/// <reference path="../typings/index.d.ts"/>
import * as angular from 'angular';
import 'ng-file-upload';

// noinspection TypeScriptCheckImport
import {Config, dirname} from 'decaf-common';
import './upload.component.css!';
import theoreticalYieldService, {TheoreticalYieldService} from './theoretical-yield.service';
import plotService, {PlotService} from './plot.service';



export const COMPONENT_NAME = 'upload';
const upload = angular.module(COMPONENT_NAME, [
	'ngFileUpload',
	theoreticalYieldService.name,
	plotService.name
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
	private $timeout: angular.ITimeoutService;
	theoreticalYieldService: TheoreticalYieldService;
	plotService: PlotService;
	isWaiting: boolean;
	experiments: any[];
	samples: any[];
	formConfig: any[];
	searchTexts: any;
	data: any;
	ngUpload: angular.angularFileUpload.IUploadService;

	constructor($timeout, TheoreticalYieldService: TheoreticalYieldService, PlotService: PlotService, Upload: angular.angularFileUpload.IUploadService) {
		console.log(Upload);
		this.ngUpload = Upload;
		this.$timeout = $timeout;
		this.theoreticalYieldService = TheoreticalYieldService;
		this.plotService = PlotService;
		this.experiments = [];
		this.samples = [];
		this.isWaiting = false;
		this.loadLists();
		this.formConfig = [
			{
				'title': 'Experiment',
				'attr': 'experiments',
				'list': () => this.experiments
			},
			{
				'title': 'Sample',
				'attr': 'samples',
				'list': () => this.samples[this.searchTexts.experiments]
			}
		];
		this.searchTexts = {};
		this.data = {};
	}


	querySearch (query, data) {
		return query ? data.filter( this.createFilterFor(query) ) : data;
	}

	createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(option) {
			return (angular.lowercase(option.display).indexOf(lowercaseQuery) !== -1);
		};
	}

	loadLists() {
		this.loadExperiments();
	}

	loadExperiments() {
		this.theoreticalYieldService.loadExperiments()
			.then((data: any) => {
				data.data.forEach((value) => {
					this.experiments.push({
						value: value.id,
						display: value.name
					})
				});
				this.loadSamples();
			})
	}

	loadSamples() {
		this.experiments.forEach((value) => {
			let experimentId = value.value;
			this.samples[experimentId] = [];
			this.theoreticalYieldService.loadSamples(experimentId)
				.then((data: any) => {
						data.data.forEach((sample) => {
							this.samples[experimentId].push({
								value: sample.id,
								display: sample.name
							})
						})
					}
				)
		});
	}

	hello(){
		console.info('hello ballo...?');
	}

	uploadFile(){
		console.info('hello upload...?');
		if(file) {
			file.upload = this.ngUpload.upload({
				// url: 'http://localhost:7000',
				data: {file: file}
			});
		}
	}

	submit() {
		let currentSample = this.searchTexts['samples'];
		this.isWaiting = true;
		this.theoreticalYieldService.sampleYields(currentSample)
			.then((data: any) =>
				{
					this.isWaiting = false;
					this.data[currentSample] = data.data;
					angular.forEach(this.data[currentSample], (phaseYields, phase) => {
						angular.forEach(phaseYields.metabolites, (metaboliteYield, metabolite) => {
							var id = 'plot_' + phase + '_' + metabolite;
							angular.element(document.getElementById(id)).ready(() => this.plotService.plotPhase(id, metabolite, phaseYields['growth-rate'], metaboliteYield));
						});
					});
				},
				// Error
				([status, dataResponse]) => {
					this.isWaiting = false;
				}
			);
	}
}

export default upload;
