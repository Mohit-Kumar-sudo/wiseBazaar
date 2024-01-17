import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { FileService } from 'src/app/services/file.service';
import { StudentFileService } from 'src/app/services/student-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  permissionLetterFile: any;
  dataList: any = [];
  env: any;
  programs = [];
  collection_name: any;
  program: any;
  validateCheck: boolean = false;
  validate: boolean = false;

  constructor(
    private alert: AlertService,
    private fileService: FileService,
    private studentFileService: StudentFileService
  ) {
    this.env = environment;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.studentFileService.getList({}).subscribe((resp: any) => {
      if (resp.success) {
        this.dataList = resp.data;
      } else {
        this.alert.errorToast(resp.msg);
      }
    });
  }

  extractFileName(name: String) {
    return name.split('\\').pop();
  }

  selectFile(e: any) {
    if (e.target.files.length) {
      this.permissionLetterFile = e.target.files[0];
    } else {
      this.permissionLetterFile = null;
    }
  }

  submit(frm: NgForm) {
    if (frm.valid) {
      const fileLabel: any = document.getElementById('uploadProgress');
      this.fileService
        .uploadFile(this.permissionLetterFile)
        .subscribe((resp) => {
          if (resp.type == HttpEventType.UploadProgress) {
            // console.log(resp);
            fileLabel.style.width =
              Math.round((resp.loaded * 100) / resp.total) + '%';
          } else if (resp.type == HttpEventType.Response) {
            const body: any = resp.body;
            frm.value.path = body.file.path;
            frm.value.filename = frm.value.student_data_file;
            this.createStudentFile(frm);
          }
        });
    } else {
      this.alert.warningToast('Please fill all the fields properly!');
    }
  }

  createStudentFile(frm: any) {
    this.studentFileService.create(frm.value).subscribe((resp: any) => {
      if (resp.success) {
        this.alert.successToast('File Added!');
        frm.reset();
        this.getData();
      } else {
        this.alert.warningToast(resp.msg);
      }
    });
  }

  processData(id: any) {
    if (!this.collection_name) {
      return this.alert.warningToast('Select Collection Name!');
    }
    this.studentFileService
      .processDataById({ id, program: this.collection_name })
      .subscribe((resp: any) => {
        if (resp.success) {
          this.alert.successToast('Processed!');
        } else {
          this.alert.warningToast(resp.msg);
        }
      });
  }
}
