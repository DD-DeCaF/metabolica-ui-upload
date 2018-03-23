// Copyright 2018 Novo Nordisk Foundation Center for Biosustainability, DTU.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
    });
  });
