import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { S3uploadService } from '../services/s3upload.service';
import { StoredFilesService } from '../services/stored-files.service';

import { FilesViewComponent } from './files-view.component';
import { StoredFile } from '../shared/models/stored-files';
import { DatePipe } from '@angular/common';

describe('FilesViewComponent', () => {
  let component: FilesViewComponent;
  let fixture: ComponentFixture<FilesViewComponent>;

  let stubS3UploadServce: S3uploadService;
  let stubStoredFilesService: jasmine.SpyObj<StoredFilesService>;
  
  beforeEach(async () => {

    stubS3UploadServce = {} as S3uploadService;  
    stubS3UploadServce.uploadFile = jasmine.createSpy().and.returnValue(of([]))  
    stubStoredFilesService = jasmine.createSpyObj('StoredFilesService', ['getStoredFiles']);
    
    await TestBed.configureTestingModule({
      declarations: [ FilesViewComponent ],
      imports: [ HttpClientTestingModule, MatTableModule],
      providers: [
        { provide: S3uploadService, useValue: stubS3UploadServce },
        { provide: StoredFilesService, useValue: stubStoredFilesService},
        DatePipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesViewComponent);
    component = fixture.componentInstance;    
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onFileSelect method when a file is selected', () => {
    const input = fixture.nativeElement.querySelector('#file');
    spyOn(component, 'onFileSelected');

    input.dispatchEvent(new Event('change'));
    
    expect(component.onFileSelected).toHaveBeenCalled();
  });
  
  it('should set the importedFileName property when a file is selected', () => {
    const inputDebugEl  = fixture.debugElement.query(By.css('input[type=file]'));
    initChosenFile(inputDebugEl.nativeElement, 'test-file.pdf');

    inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

    expect(component.importedFileName).toBeTruthy()
    expect(component.importedFileName).toBe('test-file.pdf')
  });

  it('should call the uploadFile method of the S3uploadService when a file is selected', () => {
    const input = fixture.nativeElement.querySelector('#file');
    initChosenFile(input, 'test-file.pdf');

    input.dispatchEvent(new Event('change'));
    
    expect(stubS3UploadServce.uploadFile).toHaveBeenCalled();
  });
  
  it('should call the getStoredFiles methode of StoredFilesService when the component is initialised', () => {
    stubStoredFilesService.getStoredFiles.and.returnValue(of([]));
    fixture.detectChanges();

    expect(stubStoredFilesService.getStoredFiles).toHaveBeenCalled();
  });
  
  function initChosenFile(input: any, fileName: string) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([''], fileName));
    input.files = dataTransfer.files;
  }  
  
  it('should fetch stored files from the backend', () => {
    const files: StoredFile[] = [
      {errors: [], name: 'file1', countRecords: 3, dateFrom: new Date(), lastModified: new Date(), dateTo: new Date(), versions: 1},
      {errors: [], name: 'file2', countRecords: 3, dateFrom: new Date(), lastModified: new Date(), dateTo: new Date(), versions: 1},
    ];
    stubStoredFilesService.getStoredFiles.and.returnValue(of(files));

    fixture.detectChanges();

    expect(component.storedFiles).toHaveSize(2);
    expect(component.storedFiles[0].name).toBe('file1');
    expect(component.storedFiles[1].name).toBe('file2');
  });
  
  it('should fill table items with elements', () => {
    const dateFrom = new Date('2022-01-01');
    const dateTo = new Date('2022-03-31');
    const files: StoredFile[] = [
      {errors: [], name: 'file1', countRecords: 3, dateFrom: dateFrom, dateTo: dateTo, lastModified: new Date(), versions: 1}
    ];
    stubStoredFilesService.getStoredFiles.and.returnValue(of(files));

    fixture.detectChanges();

    const name = fixture.debugElement.query(By.css('mat-table mat-row .mat-column-name'));
    expect(name.nativeNode.textContent).toBe('file1');

    const dateFromElement = fixture.debugElement.query(By.css('mat-table mat-row .mat-column-dateFrom'));
    expect(new Date(dateFromElement.nativeNode.textContent).getTime()).toEqual(dateFrom.getTime());

    const dateToElement = fixture.debugElement.query(By.css('mat-table mat-row .mat-column-dateTo'));
    expect(new Date(dateToElement.nativeNode.textContent).getTime()).toEqual(dateTo.getTime());

    const versionElement = fixture.debugElement.query(By.css('mat-table mat-row .mat-column-version'));
    expect(versionElement.nativeNode.textContent).toBe('1');
  });

  it('should not show the error sign when no error records were received', () => {
    const dateFrom = new Date('2022-01-01');
    const dateTo = new Date('2022-03-31');
    const files: StoredFile[] = [
      {errors: [], name: 'file1', countRecords: 3, dateFrom: dateFrom, dateTo: dateTo, lastModified: new Date(), versions: 1}
    ];
    stubStoredFilesService.getStoredFiles.and.returnValue(of(files));

    fixture.detectChanges()

    const errorsElement = fixture.debugElement.query(By.css('mat-table mat-row .error-sign'));
    expect(errorsElement).toBeNull();
  });

  it('should show the error sign when error records were received', () => {
    const dateFrom = new Date('2022-01-01');
    const dateTo = new Date('2022-03-31');
    const files: StoredFile[] = [
      {errors: ['error1', 'error2'], name: 'file1', countRecords: 3, dateFrom: dateFrom, dateTo: dateTo, lastModified: new Date(), versions: 1}
    ];
    stubStoredFilesService.getStoredFiles.and.returnValue(of(files));

    fixture.detectChanges()

    const errorsElement = fixture.debugElement.query(By.css('mat-table mat-row .error-sign'));
    expect(errorsElement.nativeElement.textContent).toBe('2');
  });
});


