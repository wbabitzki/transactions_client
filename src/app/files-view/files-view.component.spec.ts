import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesViewComponent } from './files-view.component';

describe('FilesViewComponent', () => {
  let component: FilesViewComponent;
  let fixture: ComponentFixture<FilesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesViewComponent ]
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
  
});

