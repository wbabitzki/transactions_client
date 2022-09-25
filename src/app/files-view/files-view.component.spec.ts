import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { S3uploadService } from '../services/s3upload.service';

import { FilesViewComponent } from './files-view.component';

describe('FilesViewComponent', () => {
  let component: FilesViewComponent;
  let fixture: ComponentFixture<FilesViewComponent>;

  let stubS3UploadServce: Partial<S3uploadService>;
  stubS3UploadServce = {

  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesViewComponent ],
      providers: [{provide: S3uploadService, useValue: stubS3UploadServce}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('file change event should trigger onFileSelected methode', () => {
    const input = fixture.nativeElement.querySelector('#file');
    spyOn(component, 'onFileSelected');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.onFileSelected).toHaveBeenCalled();
  });
  
  it('should set importedFileName model', () => {

    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'))

    const inputDebugEl  = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.importedFileName).toBeTruthy()
    expect(component.importedFileName).toBe('test-file.pdf')
  });
});

