import angular from 'angular';
import ngupload from 'ng-file-upload';
import {UploadService} from './upload.service';
import {UploadComponent} from './upload.component'
import FILEUPLOAD from '../../img/icons/file_upload.svg';
import {DecafAPIProvider} from './providers/decafapi.provider';


export const UploadModule = angular.module('upload', [
		ngupload
	])
	.provider('decafAPI', DecafAPIProvider)
	.service('uploadService', UploadService)
	.component('upload', UploadComponent)
	.config(function ($mdIconProvider, $stateProvider, appNavigationProvider) {
		$mdIconProvider.icon('file_upload', FILEUPLOAD, 24);

        appNavigationProvider.register('app.upload', {
            title: 'Upload data',
            icon: 'file_upload'
        });

        $stateProvider
            .state({
                name: 'app.upload',
                url: '/upload',
                component: 'upload',
                data: {
                    title: 'Upload data' // FIXME look up from app nagivation provider
                }
            })
    });
