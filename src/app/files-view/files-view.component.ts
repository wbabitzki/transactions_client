import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { S3uploadService } from "../services/s3upload.service";
import { StoredFilesService } from '../services/stored-files.service';
import { StoredFile } from '../shared/models/stored-files';

@Component({
  selector: 'app-files-view',
  templateUrl: './files-view.component.html',
  styleUrls: ['./files-view.component.css']
})
export class FilesViewComponent {

  importedFileName : any;
  storedFiles: StoredFile[];  
  displayedColumns: string[] = ['errors', 'name', 'countRecords', 'dateFrom', 'dateTo', 'dateImported', 'version'];

  constructor(private datePipe: DatePipe,
    private s3upload: S3uploadService,
    private storedFilesService: StoredFilesService) { }

  ngOnInit() {
    this.fetchStoredFiles();
  }

  fetchStoredFiles() {
      this.storedFilesService.getStoredFiles().subscribe( data => {
        console.log('fetchStoredFiles: ', data)
        this.storedFiles = data;        
      }
    ) 
  } 

  onFileSelected(event: Event) {
    const file: File = ((event.target as HTMLInputElement).files?.item(0) as File);
    this.importedFileName = file.name;
    this.s3upload.uploadFile(file);
  }

  formatDate(dateInput: Date) : string {
    return this.datePipe.transform(dateInput, 'dd.MM.yyyy') as string;
  }
}
