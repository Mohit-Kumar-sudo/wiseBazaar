import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpinManagementComponent } from './mpin-management.component';

describe('MpinManagementComponent', () => {
  let component: MpinManagementComponent;
  let fixture: ComponentFixture<MpinManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpinManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpinManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
