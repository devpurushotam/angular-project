import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTestComponent } from './common-test.component';

describe('CommonTestComponent', () => {
  let component: CommonTestComponent;
  let fixture: ComponentFixture<CommonTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
