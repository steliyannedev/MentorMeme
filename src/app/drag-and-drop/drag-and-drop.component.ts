import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { DragAndDropService } from './drag-and-drop.service'

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit{
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  userForm: any;
  ready_for_upload: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private dragAndDropService: DragAndDropService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.createForm();
  }

  saveUser(){
    console.log('asd')
  }
  createForm() {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      base64: ['']
    });
  }
  onSubmit(){
    this.authService.auth$.subscribe(val => {
      let body = {
        "author_id": val.id,
        "author_name": val.username,
        "post_title": this.userForm.controls['title'].value,
        "img_url": this.userForm.controls['base64'].value,
        "sections": "new"
      }
      this.dragAndDropService.savePost(body)
    })
  }
  onFileDropped($event) {
    this.prepareFilesList($event);
    this.getBase64($event[0])
  }

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userForm.controls['base64'].value = reader.result      
      console.log(this.userForm.controls['base64'].value)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }


  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            this.ready_for_upload = true;
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
