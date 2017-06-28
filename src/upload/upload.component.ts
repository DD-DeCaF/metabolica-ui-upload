import * as angular from 'angular';
import {UploadService} from './upload.service';
import * as template from './upload.component.html';
import * as dialog_template from './dialog-template.html';
import './upload.component.scss';


class UploadController {
    isWaiting: boolean;
    uploadService: UploadService;
    data: any;
    expectedFields: any[];
    projects: any[];
    selectedProject: string;
    selectedUpload: string;
    examples: any;
    extraInfo: any;
    private $mdDialog: angular.material.IDialogService;
    private $timeout: angular.ITimeoutService;
    private $sce: angular.ISCEService;

    constructor($timeout, $sce, $mdDialog, uploadService: UploadService) {
        this.uploadService = uploadService;
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
            },
            fluxes: {
                files: {fluxes: ''}, status: 'na', what: 'fluxes', order: ['fluxes'],
            },
            protein_abundances: {
                files: {protein_abundances: ''}, status: 'na', what: 'protein_abundances',
                order: ['protein_abundances'],
            }

        };
        this.examples = {
            screen: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/screening.csv',
            sample_information: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/samples.csv',
            physiology: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/physiology.csv',
            strains: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/strains.csv',
            media: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/media.csv',
            fluxes: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/fluxes.csv',
            protein_abundances: 'https://github.com/DD-DeCaF/upload/blob/master/upload/data/examples/protein_abundances.csv'
        };
        this.extraInfo = {
            media: '',
            strains: '',
            fermentation: 'Fermentation data should be provided in two files, one ' +
            'describing the samples and one providing the physiological data. Make sure that you have ' +
            'uploaded the strains and media definitions first, as you have to refer to these as indicated ' +
            'in file schema.',
            screen: 'Make sure that you have uploaded media and strain definitions first as you have to refer to ' +
            'these as indicated in the file schema.',
            fluxes: 'Make sure that you have uploaded media and strain definitions first as you have to refer to ' +
            'these as indicated in the file schema.',
            protein_abundances: 'Make sure that you have uploaded media and strain definitions first as you have ' +
            'to refer to these as indicated in the file schema.'
        };
        this.getProjects();
        this.selectedProject = '';
        this.selectedUpload = '';
    }

    selectedData() {
        return this.data[this.selectedUpload];
    }

    selectedFile(inputFile) {
        return this.data[this.selectedUpload].files[inputFile];
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
            .then((data: any) => {
                data.data.forEach((value) => {
                    this.projects.push(value)
                });
            });
    }

    showHelpAlert(inputFile) {
        this.getSchema(inputFile);
        this.$mdDialog.show({
            // can't use html files as they are not moved to dist for main app
            template: dialog_template.toString(),
            parent: angular.element(document.querySelector('#popupContainer')),
            clickOutsideToClose: true,
            locals: {
                expectedFields: this.expectedFields,
                inputFile: inputFile,
                example: this.examples[inputFile]
            },
            controller($scope, $mdDialog: ng.material.IDialogService, expectedFields, inputFile, example) {
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
        this.data[this.selectedUpload].files[which] = file;
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
        if (this.selectedProject != '') {
            for (var what in this.data) {
                if (this.data.hasOwnProperty(what)) {
                    var fileList = this.buildFileList(what);
                    if (fileList.length === this.data[what].order.length) {
                        this.isWaiting = true;
                        this.data[what].status = 'na';
                        var data = {file: fileList, what: what, project_id: this.selectedProject};
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
                                    this.isWaiting = false;
                                }
                            );
                    }
                }
            }
        }
    }
}


export const UploadComponent: angular.IComponentOptions = {
    controller: UploadController,
    controllerAs: 'UploadController',
    template: template.toString()
};
