import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilentAuthComponent } from './silent-auth.component';

describe('SilentAuthComponent', () => {
  let component: SilentAuthComponent;
  let fixture: ComponentFixture<SilentAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SilentAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SilentAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
