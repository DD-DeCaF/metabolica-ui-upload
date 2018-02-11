import angular from 'angular';
import {DevAppModule} from 'metabolica';
import {UploadModule} from './upload/upload.module';
export {UploadModule} from './upload/upload.module';

export const UploadAppModule = angular.module('UploadApp', [
  DevAppModule.name,
  UploadModule.name,
]);
