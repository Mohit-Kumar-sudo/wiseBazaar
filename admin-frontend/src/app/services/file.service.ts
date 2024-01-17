import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const fd = new FormData();
    // fd.append('docname', docname);
    // fd.append('mobile', mobile);
    fd.append('file', file, file.name);
    // console.log(fd);

    return this.http.post(environment.url + '/file/upload', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadS3File(file: File) {
    const fd = new FormData();
    fd.append('file', file, file.name);

    return this.http.post(environment.url + '/file/uploadS3File', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }


  uploadFilewoName(file: File, mobile: any) {
    const fd = new FormData();
    fd.append('docname', Date.now() + '_' + file.name);
    fd.append('mobile', mobile);
    fd.append('file', file, file.name);
    console.log(fd);

    return this.http.post(environment.url + '/file/upload', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  saveUploadedFile(data: any) {
    return this.http.post(`${environment.url}/fileSave/createFileRecord`, data);
  }

  getFilesList(data: any) {
    return this.http.post(`${environment.url}/fileSave/getFilesList`, data);
  }

  processLeadsFile(data: any) {
    console.log(data);
    return this.http.post(`${environment.url}/file/processLeadsFile`, data);
  }
}
