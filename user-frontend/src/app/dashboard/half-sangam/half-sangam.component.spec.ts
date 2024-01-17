import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfSangamComponent } from './half-sangam.component';

describe('HalfSangamComponent', () => {
  let component: HalfSangamComponent;
  let fixture: ComponentFixture<HalfSangamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalfSangamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfSangamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
