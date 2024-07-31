import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleClassroomComponent } from './google-classroom.component';

describe('GoogleClassroomComponent', () => {
  let component: GoogleClassroomComponent;
  let fixture: ComponentFixture<GoogleClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
