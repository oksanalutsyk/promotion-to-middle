import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  imageSrc: any = '';

  addArticleForm: FormGroup;

  options: UploaderOptions;
  // formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  data:any= {};

  constructor(private formBuilder: FormBuilder) {
    this.addArticleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      image: ['', [Validators.required]],

    });

    this.dragOver = true;

    this.options = {
      concurrency: 0,
      maxUploads: 5,
      maxFileSize: 1000000000,
      allowedContentTypes: [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/zip',
        'text/plain',
        'application/vnd.ms-excel',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msexcel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ],
    };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit(): void {
  }

  onSubmitAddArticle() {
    console.log(this.addArticleForm.value);

  }

  onUploadOutput(output: UploadOutput ): void {
    this.data = output;
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        this.startUpload();
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          const index = this.files.findIndex(
            (file) =>
              typeof output.file !== 'undefined' && file.id === output.file.id
          );
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        this.files = this.files.filter(
          (file: UploadFile) => file !== output.file
        );
        break;
      case 'removedAll':
        this.files = [];
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        break;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://ngx-uploader.com/upload',
      method: 'POST',
      data: this.data,
    };

    this.uploadInput.emit(event);
    // console.log(event);
  }

  removeFile(): void {
    this.addArticleForm.get('image')?.setValue('');
    this.imageSrc = '';
  }

  previewImg(event:any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
}
