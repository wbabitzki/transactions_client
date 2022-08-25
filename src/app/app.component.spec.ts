import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('has toolbar', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
  });

  it('has side navigation', () => {
    expect(fixture.debugElement.query(By.css('mat-sidenav-container'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('mat-sidenav'))).toBeTruthy();
  });

});
