import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleClassroomIframeComponent } from './google-classroom-iframe.component';

describe('GoogleClassroomIframeComponent', () => {
  let component: GoogleClassroomIframeComponent;
  let fixture: ComponentFixture<GoogleClassroomIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleClassroomIframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleClassroomIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
