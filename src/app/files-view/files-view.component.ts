import { Component } from '@angular/core';
import { S3uploadService } from "../services/s3upload.service";

@Component({
  selector: 'app-files-view',
  templateUrl: './files-view.component.html',
  styleUrls: ['./files-view.component.css']
})
export class FilesViewComponent {

  importedFileName : any; 

  constructor(private s3upload: S3uploadService) {}

  onFileSelected(event: Event) {
    const file: File = ((event.target as HTMLInputElement).files?.item(0) as File);
    this.importedFileName = file.name;
    this.s3upload.uploadFile(file);
  }
}
