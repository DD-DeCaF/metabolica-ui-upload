import * as angular from 'angular';
import 'ng-file-upload';

export class UploadService {
  ngUpload:angular.angularFileUpload.IUploadService;
  private $http:angular.IHttpService;
  private api:string;

  constructor(Upload:angular.angularFileUpload.IUploadService, $http, decafAPI) {
    this.ngUpload = Upload;
    this.$http = $http;
    this.api = decafAPI;
  }

  getSchema(what) {
    return this.$http({
      method: 'GET',
      url: `${this.api}/upload/schema/` + what
    });
  }

  getProjects() {
    return this.$http({
      method: 'GET',
      url: `${this.api}/upload/list_projects`
    });
  }

  uploadFile(data) {
    return this.ngUpload.upload({
      url: this.api + '/upload',
      data: data,
      method: 'POST'
    }).then(function (resp) {
      return resp;
    },
    function (resp) {
    }, function (evt) {
    // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    });
  }
}
